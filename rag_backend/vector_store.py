"""
Modular Vector Store for Madhiyarasu AI RAG system.
Supports ChromaDB with swappable embeddings and vector backend.
"""

import os
import math
import re
from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod
from knowledge_base import PORTFOLIO_DOCUMENTS

class VectorStoreBase(ABC):
    @abstractmethod
    def initialize(self, documents: List[Dict[str, str]]):
        pass

    @abstractmethod
    def similarity_search(self, query: str, k: int = 4) -> List[Dict[str, Any]]:
        pass


class ChromaVectorStore(VectorStoreBase):
    """
    Production ChromaDB Vector Store implementation.
    Persists vectors to local directory.
    """
    def __init__(self, persist_dir: str = "./rag_backend/chroma_db"):
        self.persist_dir = persist_dir
        self.client = None
        self.collection = None
        self.collection_name = "madhiyarasu_portfolio"

    def initialize(self, documents: List[Dict[str, str]]):
        import chromadb
        from chromadb.config import Settings

        os.makedirs(self.persist_dir, exist_ok=True)
        self.client = chromadb.PersistentClient(path=self.persist_dir)

        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={"description": "Madhiyarasu R Portfolio Knowledge Base"}
        )

        # Populate if empty or update
        existing = self.collection.get()
        existing_ids = set(existing.get("ids", []))

        docs_to_add = []
        ids_to_add = []
        metadatas_to_add = []

        for doc in documents:
            doc_id = doc["id"]
            if doc_id not in existing_ids:
                docs_to_add.append(doc["content"])
                ids_to_add.append(doc_id)
                metadatas_to_add.append({
                    "title": doc.get("title", ""),
                    "category": doc.get("category", "")
                })

        if docs_to_add:
            self.collection.add(
                documents=docs_to_add,
                ids=ids_to_add,
                metadatas=metadatas_to_add
            )
            print(f"[ChromaVectorStore] Indexed {len(docs_to_add)} portfolio knowledge chunks into ChromaDB.")
        else:
            print(f"[ChromaVectorStore] ChromaDB collection '{self.collection_name}' is already up-to-date ({len(existing_ids)} chunks).")

    def similarity_search(self, query: str, k: int = 4) -> List[Dict[str, Any]]:
        if not self.collection:
            raise RuntimeError("ChromaDB collection is not initialized.")

        results = self.collection.query(
            query_texts=[query],
            n_results=min(k, self.collection.count())
        )

        hits: List[Dict[str, Any]] = []
        docs = results.get("documents", [[]])[0]
        ids = results.get("ids", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]
        distances = results.get("distances", [[]])[0] if "distances" in results and results["distances"] else [0.0] * len(docs)

        for doc, doc_id, meta, dist in zip(docs, ids, metadatas, distances):
            hits.append({
                "id": doc_id,
                "content": doc,
                "title": meta.get("title", ""),
                "category": meta.get("category", ""),
                "score": 1.0 - (dist if dist is not None else 0.5)
            })

        return hits


class DenseFallbackVectorStore(VectorStoreBase):
    """
    Lightweight fallback vector store using TF-IDF/BM25 & cosine similarity.
    Ensures zero downtime if ChromaDB native bindings or models are unavailable.
    """
    def __init__(self):
        self.documents: List[Dict[str, str]] = []
        self.vocab: Dict[str, int] = {}
        self.doc_vectors: List[List[float]] = []

    def _tokenize(self, text: str) -> List[str]:
        return [w.lower() for w in re.findall(r'\b[a-zA-Z0-9_\-\.]{2,}\b', text)]

    def initialize(self, documents: List[Dict[str, str]]):
        self.documents = documents
        df: Dict[str, int] = {}
        tokenized_docs = []

        for doc in documents:
            text = f"{doc.get('title', '')} {doc.get('category', '')} {doc['content']}"
            tokens = set(self._tokenize(text))
            tokenized_docs.append(self._tokenize(text))
            for t in tokens:
                df[t] = df.get(t, 0) + 1

        total_docs = len(documents)
        # Select vocab with idf
        self.idf = {t: math.log((total_docs + 1) / (count + 1)) + 1.0 for t, count in df.items()}
        self.vocab = {t: idx for idx, t in enumerate(self.idf.keys())}

        self.doc_vectors = []
        for tokens in tokenized_docs:
            vec = [0.0] * len(self.vocab)
            tf: Dict[str, int] = {}
            for t in tokens:
                tf[t] = tf.get(t, 0) + 1
            for t, count in tf.items():
                if t in self.vocab:
                    vec[self.vocab[t]] = (count / len(tokens)) * self.idf[t]
            norm = math.sqrt(sum(v * v for v in vec)) or 1.0
            self.doc_vectors.append([v / norm for v in vec])

        print(f"[DenseFallbackVectorStore] Initialized {len(documents)} documents.")

    def similarity_search(self, query: str, k: int = 4) -> List[Dict[str, Any]]:
        tokens = self._tokenize(query)
        q_vec = [0.0] * len(self.vocab)
        tf: Dict[str, int] = {}
        for t in tokens:
            tf[t] = tf.get(t, 0) + 1
        for t, count in tf.items():
            if t in self.vocab:
                q_vec[self.vocab[t]] = (count / len(tokens)) * self.idf[t]
        q_norm = math.sqrt(sum(v * v for v in q_vec)) or 1.0
        q_vec = [v / q_norm for v in q_vec]

        scores = []
        for idx, d_vec in enumerate(self.doc_vectors):
            dot = sum(q * d for q, d in zip(q_vec, d_vec))
            scores.append((dot, self.documents[idx]))

        scores.sort(key=lambda x: x[0], reverse=True)
        results = []
        for score, doc in scores[:k]:
            results.append({
                "id": doc["id"],
                "content": doc["content"],
                "title": doc.get("title", ""),
                "category": doc.get("category", ""),
                "score": float(score)
            })
        return results


def get_vector_store() -> VectorStoreBase:
    """
    Factory: Returns ChromaDB Vector Store if available, else Fallback Vector Store.
    """
    try:
        store = ChromaVectorStore()
        store.initialize(PORTFOLIO_DOCUMENTS)
        return store
    except Exception as e:
        print(f"[VectorStore] Notice: ChromaDB init ({e}), using dense vector store.")
        fallback = DenseFallbackVectorStore()
        fallback.initialize(PORTFOLIO_DOCUMENTS)
        return fallback
