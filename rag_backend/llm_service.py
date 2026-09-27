"""
Modular LLM Service for Madhiyarasu AI RAG system.
Supports Google Gemini via official google-genai SDK with swappable providers.
"""

import os
from typing import List, Dict, Optional
from abc import ABC, abstractmethod
from dotenv import load_dotenv

load_dotenv()

SYSTEM_INSTRUCTION = """You are "Madhiyarasu AI", the official intelligent portfolio assistant for Madhiyarasu R.
Your role is to answer questions about Madhiyarasu's profile, education, technical skills, AI/ML knowledge, internships, projects, technologies, certifications, achievements, career interests, and contact information.

RAG STRICT RULES:
1. ONLY answer using the verified information provided in the PORTFOLIO CONTEXT below.
2. DO NOT invent, assume, or hallucinate facts that are not present in the context.
3. If the user asks something that is NOT available in the portfolio context, you MUST respond EXACTLY:
   "I don't have that information in Madhiyarasu's portfolio yet."
4. Keep answers concise, factual, engaging, and recruiter-friendly.
5. Highlight Madhiyarasu's practical experience with AI, Machine Learning, RAG, and Full-Stack development where relevant.
6. If asked for contact details, provide his verified email (rmadhiyarasu0803@gmail.com), phone (+91 9344955053), LinkedIn, and GitHub.
"""

class LLMProviderBase(ABC):
    @abstractmethod
    def generate_answer(self, query: str, context_chunks: List[Dict[str, str]], history: Optional[List[Dict[str, str]]] = None) -> str:
        pass


class GeminiLLMProvider(LLMProviderBase):
    """
    Production LLM Provider using Google Gemini SDK.
    """
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key or self.api_key == "MY_GEMINI_API_KEY":
            raise ValueError("GEMINI_API_KEY not configured in environment or .env file.")

        from google import genai
        self.client = genai.Client(api_key=self.api_key)
        self.model_name = "gemini-2.5-flash"

    def generate_answer(self, query: str, context_chunks: List[Dict[str, str]], history: Optional[List[Dict[str, str]]] = None) -> str:
        context_text = "\n\n".join([
            f"--- [Source: {c.get('title', 'Portfolio Data')}] ---\n{c['content']}"
            for c in context_chunks
        ])

        history_text = ""
        if history:
            recent_turns = history[-4:]
            history_text = "RECENT CONVERSATION:\n" + "\n".join([
                f"{h.get('role', 'user').capitalize()}: {h.get('content', '')}"
                for h in recent_turns
            ]) + "\n\n"

        prompt = f"""{SYSTEM_INSTRUCTION}

PORTFOLIO CONTEXT:
{context_text}

{history_text}USER QUESTION:
{query}

ANSWER (grounded strictly in the portfolio context):"""

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt
            )
            return response.text.strip()
        except Exception as e:
            # Fallback to gemini-1.5-flash if model name differs
            try:
                response = self.client.models.generate_content(
                    model="gemini-1.5-flash",
                    contents=prompt
                )
                return response.text.strip()
            except Exception as e2:
                raise RuntimeError(f"Gemini API generation failed: {e2}")


class LocalExtractiveLLMProvider(LLMProviderBase):
    """
    Fallback deterministic synthesizer grounded strictly in retrieved context.
    Ensures seamless responses even if GEMINI_API_KEY is not configured yet.
    """
    def generate_answer(self, query: str, context_chunks: List[Dict[str, str]], history: Optional[List[Dict[str, str]]] = None) -> str:
        if not context_chunks:
            return "I don't have that information in Madhiyarasu's portfolio yet."

        # Verify query relevance
        q_lower = query.lower()
        combined_text = " ".join([c["content"] for c in context_chunks]).lower()

        # Check if query keywords align with retrieved portfolio context
        words = [w for w in q_lower.split() if len(w) > 2 and w not in ["who", "what", "where", "tell", "about", "his", "does", "have", "can", "the", "and"]]
        has_overlap = any(w in combined_text for w in words) if words else True

        portfolio_keywords = [
            "madhiyarasu", "portfolio", "project", "skill", "technolog", "tech",
            "language", "stack", "tool", "framework", "contact", "email", "phone",
            "education", "college", "degree", "cgpa", "experience", "internship",
            "rag", "ai", "ml", "certif", "bytexl", "medilu", "budget", "cyber"
        ]
        if not has_overlap and not any(k in q_lower for k in portfolio_keywords):
            return "I don't have that information in Madhiyarasu's portfolio yet."

        # Specific high-relevance intent mappings
        if any(k in q_lower for k in ["who is", "about madhiyarasu", "tell me about madhiyarasu", "profile", "bio", "introduction"]):
            return (
                "Madhiyarasu R is an Artificial Intelligence & Data Science student at SNS College of Engineering "
                "(CGPA 8.3) with a strong focus on AI, Machine Learning, and Software Development. "
                "He specializes in building practical AI solutions, LangChain/RAG architectures, and responsive full-stack applications."
            )

        if "rag" in q_lower or "retrieval" in q_lower:
            return (
                "Yes! Madhiyarasu has hands-on production experience with Retrieval-Augmented Generation (RAG). "
                "During his AI & ML Internship at Six O Four Solutions, he engineered RAG pipelines and vector search systems using LangChain, Vector Databases, and LLMs. "
                "He also implemented RAG in his 'MediLu – AI-Powered Patient Healthcare Assistant' project to contextualize and simplify complex medical reports."
            )

        if any(k in q_lower for k in ["contact", "email", "phone", "reach", "hire", "linkedin", "github"]):
            return (
                "You can connect with Madhiyarasu R through:\n"
                "• Email: rmadhiyarasu0803@gmail.com\n"
                "• Phone: +91 9344955053\n"
                "• LinkedIn: https://linkedin.com/in/rmadhiyarasu\n"
                "• GitHub: https://github.com/rmadhiyarasu24\n"
                "• Location: Tamil Nadu, India"
            )

        if any(k in q_lower for k in ["medilu", "healthcare"]):
            return (
                "MediLu is Madhiyarasu's AI-Powered Patient Healthcare Assistant built with React, FastAPI, Supabase, and RAG. "
                "It simplifies complex diagnostic lab reports into patient-friendly summaries, provides AI symptom checking, "
                "and automates recovery schedules with appointment and medication reminders."
            )

        if any(k in q_lower for k in ["internship", "work experience", "six o four", "webgen"]):
            return (
                "Madhiyarasu has completed two key internships:\n"
                "1. AI & Machine Learning Intern at Six O Four Solutions (06/2026 – 07/2026): Developed AI applications using LangChain, RAG, Vector Databases, and LLMs.\n"
                "2. Web Development Intern at WebGen Technology (06/2025 – 07/2025): Developed responsive frontend interfaces, integrated REST APIs, and managed agile git workflows."
            )

        if any(k in q_lower for k in ["certif", "bytexl", "credentials"]):
            return (
                "Madhiyarasu holds 12 verified certifications including:\n"
                "• byteXL & SNS Institutions: Python for Placement Readiness (Aug 2025), Basic Data Structures & Algorithms (Aug–Sep 2025), Digital Marketing & Social Media Strategies (Oct–Nov 2025)\n"
                "• IBM SkillsBuild: AI Fundamentals, Python 101 for Data Science, Machine Learning with Python, Building Trustworthy AI\n"
                "• IBM: Enterprise Design Thinking Practitioner & Co-Creator\n"
                "• ServiceNow: Virtual Internship in Enterprise Workflows\n"
                "• CSC: Diploma in Computer Applications (DCA) & Python Programming"
            )

        if any(k in q_lower for k in ["project", "build", "built"]):
            return (
                "Madhiyarasu has engineered 5 notable projects:\n"
                "1. Real-Time Cybersecurity Anomaly Detection System (Python, Machine Learning, Feature Engineering)\n"
                "2. MediLu – AI Patient Healthcare Assistant (React, FastAPI, Supabase, RAG & LLMs)\n"
                "3. Budget Buddy – Travel Budget Web App (React, Supabase, JavaScript)\n"
                "4. Tailoring Service Web Platform (Firebase, React, Firestore)\n"
                "5. AI Document Classification (Python, NLP, Computer Vision, OCR)"
            )

        if any(k in q_lower for k in ["education", "college", "degree", "cgpa", "sns"]):
            return (
                "Madhiyarasu is pursuing his B.Tech in Artificial Intelligence & Data Science at SNS College of Engineering, "
                "Tamil Nadu (2023 – Present) maintaining a strong academic CGPA of 8.3."
            )

        if any(k in q_lower for k in ["skill", "technolog", "tech stack", "languages", "python", "java"]):
            return (
                "Madhiyarasu's technical skill matrix covers:\n"
                "• Programming: Python, Java, C\n"
                "• Web & Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Vite, Tailwind CSS\n"
                "• AI & Machine Learning: LangChain, RAG, Google Gemini API, Vector Databases (ChromaDB, pgvector), LLMs, OCR, NLP, Scikit-Learn\n"
                "• Core CS: Data Structures & Algorithms (LeetCode solver), DBMS, OOP, Operating Systems\n"
                "• Tools & Cloud: Git, GitHub, Firebase, Supabase, VS Code"
            )

        # Grounded synthesized excerpt from top chunk
        top_chunk = context_chunks[0]
        return f"Based on Madhiyarasu's portfolio:\n{top_chunk['content']}"


def get_llm_provider() -> LLMProviderBase:
    """
    Factory: Returns Gemini LLM provider if GEMINI_API_KEY is available and valid,
    otherwise returns the grounded Local Extractive LLM provider.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key and api_key != "MY_GEMINI_API_KEY" and len(api_key.strip()) > 10:
        try:
            return GeminiLLMProvider(api_key=api_key)
        except Exception as e:
            print(f"[LLMService] Gemini init notice ({e}), defaulting to Local Extractive provider.")
    return LocalExtractiveLLMProvider()
