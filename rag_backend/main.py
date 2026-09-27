"""
FastAPI Server for Madhiyarasu AI Portfolio Chatbot (RAG).
"""

import os
from typing import List, Dict, Optional, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from knowledge_base import PORTFOLIO_DOCUMENTS
from vector_store import get_vector_store
from llm_service import get_llm_provider

load_dotenv()

app = FastAPI(
    title="Madhiyarasu AI Portfolio RAG Service",
    description="Retrieval-Augmented Generation (RAG) backend for Madhiyarasu R's developer portfolio.",
    version="1.0.0"
)

# CORS Middleware to allow requests from Vite development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize vector store and LLM service
vector_store = get_vector_store()
llm_provider = get_llm_provider()

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = []

class SourceItem(BaseModel):
    title: str
    category: str
    score: float

class ChatResponse(BaseModel):
    reply: str
    sources: List[SourceItem]
    model: str

SUGGESTED_QUESTIONS = [
    "Tell me about Madhiyarasu",
    "Show me his AI projects",
    "What technologies does he use?",
    "Tell me about his internships",
    "Tell me about his MediLu project",
    "Does he have experience with RAG?",
    "What certifications does he have?",
    "How can I contact him?"
]

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Madhiyarasu AI RAG Service",
        "total_documents": len(PORTFOLIO_DOCUMENTS),
        "vector_store_type": vector_store.__class__.__name__,
        "llm_provider_type": llm_provider.__class__.__name__
    }

@app.get("/api/suggested")
def get_suggested_questions():
    return {"questions": SUGGESTED_QUESTIONS}

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    query = payload.message.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query message cannot be empty.")

    try:
        # Step 1 & 2 & 3: Embed query and vector search in portfolio ChromaDB
        retrieved_chunks = vector_store.similarity_search(query, k=4)

        # Step 4 & 5: Pass context to LLM with strict grounding instructions
        answer = llm_provider.generate_answer(
            query=query,
            context_chunks=retrieved_chunks,
            history=payload.history
        )

        sources = [
            SourceItem(
                title=c.get("title", "Portfolio Knowledge"),
                category=c.get("category", "General"),
                score=round(float(c.get("score", 0.0)), 3)
            )
            for c in retrieved_chunks
        ]

        return ChatResponse(
            reply=answer,
            sources=sources,
            model=llm_provider.__class__.__name__
        )
    except Exception as e:
        print(f"[ChatAPI Error] {e}")
        # Graceful fallback answering
        return ChatResponse(
            reply="I encountered an issue processing your query against the portfolio knowledge base. Please try again or reach out to Madhiyarasu directly at rmadhiyarasu0803@gmail.com.",
            sources=[],
            model="ErrorFallback"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
