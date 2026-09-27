# 🌌 Madhiyarasu R — Interactive 3D & AI Portfolio

<div align="center">

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-RAG_Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_Store-FF6B6B?style=for-the-badge&logo=databricks&logoColor=white)](https://www.trychroma.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-LLM-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

<p align="center">
  An immersive, futuristic portfolio blending interactive 3D WebGL experiences with a live RAG-powered AI agent.
</p>

[Featured Projects](#projects) • [3D Visuals](#threejs) • [Madhiyarasu AI (RAG)](#rag-agent) • [Run Locally](#getting-started) • [Contact](#contact)

</div>

---

## 👋 Hey there, I'm Madhiyarasu!

Welcome to my personal digital headquarters! 

I’m an Artificial Intelligence & Data Science student at SNS College of Engineering (Tamil Nadu, India) who loves building things that bridge the gap between theoretical machine learning and responsive, real-world software. 

Rather than building a standard static resume page, I designed this portfolio as an interactive playground:
- Spatial 3D Canvas: Interactive Three.js WebGL scenes that react to your mouse movement and screen size.
- Live RAG Conversational Agent: An in-browser AI agent ("Madhiyarasu AI") equipped with a semantic vector knowledge base to answer questions about my background, skills, and code in real time.
- Deep-Dive Case Studies: Clear breakdowns of the real engineering problems I’ve tackled across cybersecurity, healthcare, document parsing, and full-stack web development.

---

## What Makes This Portfolio Special?

### <a id="threejs"></a>🪐 1. Interactive 3D WebGL Visuals (Three.js)
- Neural Orbit 3D Engine: A dynamic 3D neural core wrapped in dual cosmic rings, pulsating nodes, and glowing particle dust in the hero section. Fully responsive with mathematical frustum distance calculations so it never squishes or clips on any display.
- Skill Constellation: A living 3D graph connecting languages, frameworks, AI libraries, and engineering tools in orbital harmony.
- Tech Cube 3D: An interactive geometric tech cube with dynamic lighting and interactive rotation.
- Zero Resource Leaks: Custom disposal hooks and WebGL context-loss handlers ensure 60 FPS performance without memory leaks.

### <a id="rag-agent"></a>🤖 2. Madhiyarasu AI — Full RAG Assistant
Tucked in the bottom right corner is Madhiyarasu AI, an intelligent portfolio guide:
- Backend Architecture: Built with FastAPI + ChromaDB + sentence-transformers + Google Gemini API.
- Accurate Grounding: Uses vector similarity search against my verified projects, education, internship experience, certifications, and resume data to generate helpful, hallucination-free answers.
- Graceful Resilience: If the Python backend is warming up, a smart client-side conversational fallback kicks in instantly so recruiters and visitors never see an error state.

### <a id="projects"></a>💼 3. Engineering Projects & Case Studies
Each project card features problem-solution breakdowns, technology chips, and live links:
- 🛡️ ML Network Intrusion Detection System: Preprocessing real-time network telemetry, engineering statistical features, and training anomaly detection models to mitigate cyber threats with minimal false alarms.
- 🏥 MediLu – AI Healthcare Assistant: A patient-first assistant leveraging FastAPI, Supabase, and RAG pipelines to translate complex medical reports and diagnostic terms into plain, comforting language.
- 📄 AI Document Classification Engine: End-to-end ingestion pipeline combining OCR extraction with Google Gemini reasoning to categorize heterogeneous PDFs, DOCX, and images automatically.
- ✈️ Budget Buddy Travel Platform: Real-time expense tracking web app with Supabase cloud database, dynamic split calculations, and mobile-first UX.
- ✂️ Tailoring Service Web Platform: Modern workflow automation with Firebase Authentication & Firestore, digitizing bespoke measurements and customer order lifecycles.

### 📜 4. Verified Certifications
Features validated credentials across modern development:
- byteXL & SNS Institutions:
  - Python for Placement Readiness (Aug 2025)
  - Basic Data Structures & Algorithms (Aug–Sep 2025)
  - Digital Marketing & Social Media Strategies (Oct–Nov 2025)
- Global Certifications:
  - Introduction to Generative AI (Google Cloud)
  - Machine Learning with Python (IBM)
  - Foundations of Data Science (Google)
  - Python for Data Science (IBM)

### 📄 5. Seamless PDF Resume Viewer
A built-in glassmorphic modal allows recruiters to view my full 2-page curriculum vitae directly within the web app or download it with one click.

---

## 🛠️ The Tech Stack

| Layer | Technologies |
| :--- | :--- |
| Frontend Framework | React 19, TypeScript, Vite 6 |
| Styling & Design | Tailwind CSS v4, Lucide Icons, Cyberpunk Glassmorphic Theme |
| 3D Graphics & Animations | Three.js (WebGL), Motion, Custom Shaders & Canvas Math |
| RAG Backend | Python 3.10+, FastAPI, Uvicorn |
| Vector Database & Embeddings | ChromaDB, Sentence-Transformers (`all-MiniLM-L6-v2`) |
| Generative LLM | Google Gemini API (`@google/genai` & `google-genai`) |
| Data & Cloud Services | Supabase, Firebase, GitHub Pages / Vercel |

---

## 📂 Project Architecture

```plaintext
portfolio-madhi/
├── public/                       # Static public assets
│   ├── profile.jpg               # Executive centered headshot
│   ├── Madhiyarasu_R_Resume.pdf  # Comprehensive 2-page CV
│   └── favicon.svg               # Cyber-styled cyan brand favicon
├── rag_backend/                  # Modular Python RAG microservice
│   ├── main.py                   # FastAPI application & /api/chat endpoints
│   ├── knowledge_base.py         # Curated semantic knowledge chunks
│   ├── vector_store.py           # ChromaDB collection & similarity search
│   ├── llm_service.py            # Gemini integration with fallback logic
│   └── requirements.txt          # Python dependencies
├── src/
│   ├── components/               # UI components
│   │   ├── 3d/                   # Three.js WebGL scenes
│   │   │   ├── HeroScene.tsx     # 3D Neural Orbit engine
│   │   │   ├── SkillConstellation.tsx # Interactive skill galaxy
│   │   │   └── TechCube3D.tsx    # 3D interactive tech cube
│   │   ├── Hero.tsx              # Hero header with avatar & typography
│   │   ├── About.tsx             # Background & engineering strengths
│   │   ├── Experience.tsx        # Internship timelines & impact
│   │   ├── Projects.tsx          # Case study cards & live filters
│   │   ├── Skills.tsx            # Categorized skills & 3D toggle
│   │   ├── Certifications.tsx    # Verified credentials & badges
│   │   ├── Contact.tsx           # Contact form & social channels
│   │   ├── PortfolioChatbot.tsx  # Floating RAG assistant widget
│   │   ├── ResumeModal.tsx       # Live PDF previewer & downloader
│   │   └── Navbar.tsx & Footer.tsx
│   ├── data/
│   │   └── portfolio.ts          # Centralized typed source of truth
│   ├── App.tsx                   # Main layout container
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Cyber-grid utilities & Tailwind setup
├── package.json                  # Frontend scripts & dependencies
└── vite.config.ts                # Vite dev server configuration
```

---

## <a id="getting-started"></a>🚀 Getting Started Locally

Running the project on your machine is straightforward:

### 1. Prerequisites
- Node.js (v18 or higher)
- Python (v3.10 or higher, for the RAG backend)
- Git

### 2. Clone the Repository
```bash
git clone https://github.com/rmadhiyarasu24/portfilio-madhi.git
cd portfilio-madhi
```

### 3. Setup the Frontend
```bash
# Install frontend dependencies
npm install

# (Optional) Create .env with your Gemini API key if using client-side AI direct calls
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Start the Vite development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser!

### 4. (Optional) Run the RAG Backend
If you want to run the full vector-search backend locally:
```bash
# Navigate to rag_backend
cd rag_backend

# Create and activate a virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI service
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI documentation will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

## 💡 Engineering Philosophy

> "Code is more than syntax; it's a vehicle for solving concrete human problems."

I believe the best software is built at the intersection of:
1. Algorithmic Rigor: Clean problem decomposition, efficient data structures, and optimized latency.
2. User Experience: Interfaces that feel alive, intuitive, and visually delightful rather than plain and utilitarian.
3. Continuous Curiosity: Always experimenting with what's next — from modern WebGL shaders to autonomous agent architectures.

---

## <a id="contact"></a>📬 Get in Touch

I'm always excited to collaborate on innovative software, explore internship opportunities, or just chat about AI and technology!

- 📧 Email: [rmadhiyarasu0803@gmail.com](mailto:rmadhiyarasu0803@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/rmadhiyarasu](https://linkedin.com/in/rmadhiyarasu)
- 🐙 GitHub: [github.com/rmadhiyarasu24](https://github.com/rmadhiyarasu24)
- ⚡ LeetCode: [leetcode.com/u/MADHIYARASU08](https://leetcode.com/u/MADHIYARASU08/)
- 📍 Location: Namakkal, Tamil Nadu, India

---

<div align="center">
  <sub>Crafted with passion, coffee, and clean code by Madhiyarasu R © 2025–2026.</sub>
</div>
