"""
Knowledge Base for Madhiyarasu AI RAG System.
Contains comprehensive, granular chunks extracted from Madhiyarasu R's verified portfolio.
"""

from typing import List, Dict

PORTFOLIO_DOCUMENTS: List[Dict[str, str]] = [
    {
        "id": "profile_overview",
        "title": "Profile & Biography of Madhiyarasu R",
        "category": "Profile",
        "content": (
            "Madhiyarasu R is an Artificial Intelligence and Data Science undergraduate student "
            "specializing in AI, Machine Learning, and Software Development. He is based in Tamil Nadu, India. "
            "He focuses on building practical AI-powered applications, machine learning workflows, and modern web applications. "
            "His core philosophy is translating theoretical AI concepts into robust, production-ready software solving real-world challenges."
        )
    },
    {
        "id": "contact_info",
        "title": "Contact Information & Social Links",
        "category": "Contact",
        "content": (
            "Contact Details for Madhiyarasu R:\n"
            "- Email: rmadhiyarasu0803@gmail.com\n"
            "- Phone: +91 9344955053\n"
            "- LinkedIn: https://linkedin.com/in/rmadhiyarasu\n"
            "- GitHub: https://github.com/rmadhiyarasu24\n"
            "- LeetCode: https://leetcode.com/u/MADHIYARASU08/\n"
            "- Location: Tamil Nadu, India.\n"
            "He is open to internships, AI research opportunities, and full-stack software development roles."
        )
    },
    {
        "id": "education_degree",
        "title": "Education & Academic Background",
        "category": "Education",
        "content": (
            "Education Details:\n"
            "- Degree: Bachelor of Technology (B.Tech) in Artificial Intelligence & Data Science\n"
            "- Institution: SNS College of Engineering, Tamil Nadu, India\n"
            "- Period: 2023 – Present\n"
            "- CGPA: 8.3\n"
            "His curriculum includes Artificial Intelligence, Machine Learning, Deep Learning, Data Science, "
            "Data Structures & Algorithms, Database Management Systems (DBMS), and Software Engineering."
        )
    },
    {
        "id": "skills_programming_languages",
        "title": "Programming Languages Skills",
        "category": "Skills",
        "content": (
            "Programming Languages mastered by Madhiyarasu R:\n"
            "- Python: Primary language for Machine Learning, Data Science, LLM pipelines, RAG, and backend development.\n"
            "- Java: Object-Oriented Programming and algorithmic problem solving.\n"
            "- C: Foundation of computer science, low-level memory concepts, and algorithmic foundations."
        )
    },
    {
        "id": "skills_web_frontend",
        "title": "Web Development & Frontend Skills",
        "category": "Skills",
        "content": (
            "Web Development & Frontend Expertise:\n"
            "- Technologies: React, TypeScript, JavaScript, HTML5, CSS3, Vite, Tailwind CSS.\n"
            "- Capabilities: Building responsive, component-driven user interfaces, state management, "
            "asynchronous API integration, mobile-first design, and interactive 3D WebGL user interfaces."
        )
    },
    {
        "id": "skills_ai_ml_rag",
        "title": "AI, Machine Learning & RAG Knowledge",
        "category": "Skills",
        "content": (
            "AI & Machine Learning Knowledge:\n"
            "- Generative AI & LLMs: Google Gemini API, LangChain framework, Large Language Models.\n"
            "- RAG (Retrieval-Augmented Generation): Building vector search retrieval pipelines, document chunking, "
            "and context augmentation using vector databases.\n"
            "- Vector Databases: ChromaDB, Supabase pgvector.\n"
            "- Natural Language Processing (NLP) & Computer Vision (OCR, image classification).\n"
            "- Machine Learning: Feature engineering, data preprocessing, classification models, Scikit-Learn."
        )
    },
    {
        "id": "skills_core_concepts_tools",
        "title": "Computer Science Core Concepts & Developer Tools",
        "category": "Skills",
        "content": (
            "Core Concepts & Developer Tooling:\n"
            "- Core CS Concepts: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), "
            "Database Management Systems (DBMS), Operating Systems, Exploratory Data Analysis (EDA).\n"
            "- Developer Tools & Platforms: Git, GitHub, Firebase (Auth & Firestore), Supabase, VS Code."
        )
    },
    {
        "id": "experience_six_o_four",
        "title": "AI & Machine Learning Internship at Six O Four Solutions",
        "category": "Experience",
        "content": (
            "Internship at Six O Four Solutions:\n"
            "- Role: AI & Machine Learning Intern\n"
            "- Company: Six O Four Solutions, Palani\n"
            "- Duration: 06/2026 – 07/2026\n"
            "- Highlights:\n"
            "  * Developed AI applications using LangChain, RAG (Retrieval-Augmented Generation), Vector Databases, and LLMs.\n"
            "  * Gained hands-on experience in production AI, Machine Learning, and Data Science architectures.\n"
            "  * Built intelligent AI workflows and solved concrete engineering problems in real-world environments."
        )
    },
    {
        "id": "experience_webgen",
        "title": "Web Development Internship at WebGen Technology",
        "category": "Experience",
        "content": (
            "Internship at WebGen Technology:\n"
            "- Role: Web Development Intern\n"
            "- Company: WebGen Technology (Online)\n"
            "- Duration: 06/2025 – 07/2025\n"
            "- Highlights:\n"
            "  * Developed modern responsive web interfaces using modern frontend stacks.\n"
            "  * Assisted in backend service integration and RESTful API handling.\n"
            "  * Collaborated with git version control in collaborative agile project workflows."
        )
    },
    {
        "id": "project_cybersecurity",
        "title": "Project: Real-Time Cybersecurity Anomaly Detection System",
        "category": "Projects",
        "content": (
            "Project: Real-Time Cybersecurity Anomaly Detection System\n"
            "- Category: AI & Machine Learning\n"
            "- Tech Stack: Machine Learning, Python, Data Preprocessing, Feature Engineering\n"
            "- Overview: Built an ML-driven anomaly detection architecture to monitor telemetry feature vectors "
            "and detect unusual network activities in real time with high accuracy.\n"
            "- Problem: Network traffic generates massive continuous packet streams where legacy rule-based tools "
            "suffer from severe false positives and miss novel zero-day vectors.\n"
            "- Solution: Statistical feature extraction and trained anomaly detection classifiers with optimized decision boundaries.\n"
            "- Key Features: Data preprocessing, feature engineering, real-time cyber threat detection, false-positive mitigation."
        )
    },
    {
        "id": "project_budget_buddy",
        "title": "Project: Budget Buddy – Travel Budget Web App",
        "category": "Projects",
        "content": (
            "Project: Budget Buddy – Travel Budget Web App\n"
            "- Category: Web Application\n"
            "- Tech Stack: React, Supabase, JavaScript, CSS\n"
            "- Overview: Responsive travel expense management web app that enables users to track trips, split expenditures, and monitor budget limits.\n"
            "- Problem: Tracking dynamic multi-day travel expenses and split expenditures across mobile devices is disorganized.\n"
            "- Solution: High-performance React app with Supabase cloud backend for real-time entries and instant balance recalculation.\n"
            "- Key Features: Real-time expense tracking, Supabase backend integration, dynamic responsive UI."
        )
    },
    {
        "id": "project_tailoring",
        "title": "Project: Tailoring Service Web Application",
        "category": "Projects",
        "content": (
            "Project: Tailoring Service Web Application\n"
            "- Category: Full-Stack Web App\n"
            "- Tech Stack: Firebase, React, JavaScript, CSS\n"
            "- Overview: Cloud-connected web platform for tailoring businesses to manage custom orders, customer measurements, and deliveries.\n"
            "- Problem: Custom tailoring shops lose track of physical paper measurement slips and order alteration requests.\n"
            "- Solution: End-to-end digital tailoring platform with Firebase Authentication and Firestore database for order tracking.\n"
            "- Key Features: Customer profile management, live order tracking, service catalogue, secure Firebase authentication."
        )
    },
    {
        "id": "project_doc_classification",
        "title": "Project: AI Document Classification System",
        "category": "Projects",
        "content": (
            "Project: AI Document Classification\n"
            "- Category: AI & Automation\n"
            "- Tech Stack: Python, Machine Learning, NLP, Computer Vision, OCR\n"
            "- Overview: Intelligent automated document processing system that extracts and classifies multi-format documents.\n"
            "- Problem: Manual review, sorting, and metadata entry from physical and scanned documents is slow and error-prone.\n"
            "- Solution: Integrated OCR and NLP pipelines to parse document layouts, extract high-signal text, and categorize records.\n"
            "- Key Features: OCR extraction, multi-class categorization, structured data output, layout classification."
        )
    },
    {
        "id": "project_medilu",
        "title": "Project: MediLu – AI-Powered Patient Healthcare Assistant",
        "category": "Projects",
        "content": (
            "Project: MediLu – AI-Powered Patient Healthcare Assistant\n"
            "- Category: AI & Healthcare\n"
            "- Tech Stack: React, FastAPI, Supabase, AI / LLM, RAG (Retrieval-Augmented Generation)\n"
            "- Overview: AI healthcare assistant that simplifies complex medical reports and diagnostic terminology for patients.\n"
            "- Problem: Patients experience severe anxiety and confusion when reading lab reports full of complex diagnostic terms.\n"
            "- Solution: Built an AI healthcare companion utilizing Retrieval-Augmented Generation (RAG) and LLMs to generate "
            "clear, patient-friendly summaries and post-consultation recovery plans.\n"
            "- Key Features: Medical report simplification, AI symptom checking, health tracking, medication reminders, "
            "appointment reminders, recovery planning, role-based portals, FastAPI endpoints, Supabase database.\n"
            "- Contribution: Architected React portal with role routing, engineered FastAPI and Supabase APIs, and integrated RAG pipelines."
        )
    },
    {
        "id": "certifications_bytexl",
        "title": "byteXL & SNS Institutions Certifications",
        "category": "Certifications",
        "content": (
            "byteXL & SNS Institutions Certifications:\n"
            "1. Python for Placement Readiness\n"
            "   - Provider: byteXL, SNS Institutions\n"
            "   - Date: Aug 2025\n"
            "   - Focus: Placement preparation, advanced Python syntax, algorithmic problem solving, and coding assessments.\n"
            "2. Basic Data Structures and Algorithms\n"
            "   - Provider: byteXL, SNS Institutions\n"
            "   - Date: Aug–Sep 2025\n"
            "   - Focus: Foundational data structures (arrays, linked lists, stacks, queues), time and space complexity, and problem solving.\n"
            "3. Digital Marketing & Social Media Strategies\n"
            "   - Provider: byteXL, SNS Institutions\n"
            "   - Date: Oct–Nov 2025\n"
            "   - Focus: Digital branding, content marketing, outreach strategies, and social media campaign optimization."
        )
    },
    {
        "id": "certifications_ibm_servicenow_csc",
        "title": "Industry Certifications from IBM, ServiceNow, and CSC",
        "category": "Certifications",
        "content": (
            "Industry Certifications:\n"
            "- ServiceNow Virtual Internship (ServiceNow) – Enterprise Workflows & Digital Operations\n"
            "- Enterprise Design Thinking Practitioner (IBM) – Human-Centered Problem Solving\n"
            "- Python 101 for Data Science (IBM SkillsBuild, 2025) – Data Structures & Analytical Libraries\n"
            "- Artificial Intelligence Fundamentals (IBM SkillsBuild) – Machine Learning & Neural Networks\n"
            "- Enterprise Design Thinking Co-Creator (IBM) – Collaborative Agile Synthesis\n"
            "- Diploma in Computer Applications / DCA (CSC Computer Education) – Core Computing & Software Applications\n"
            "- Building Trustworthy AI Enterprise Solutions (IBM SkillsBuild) – AI Governance, Ethics & Reliability\n"
            "- Machine Learning with Python (IBM SkillsBuild) – Predictive Modeling & Scikit-Learn\n"
            "- Python Programming (CSC Computer Education) – Algorithm Implementation & Software Logic"
        )
    },
    {
        "id": "achievements_problem_solving",
        "title": "Achievements & Problem Solving Track Record",
        "category": "Achievements",
        "content": (
            "Achievements of Madhiyarasu R:\n"
            "- Problem Solver on LeetCode: Consistently solves algorithmic challenges covering arrays, strings, two-pointers, "
            "hashing, and tree traversals. Profile: https://leetcode.com/u/MADHIYARASU08/\n"
            "- Real-World Project Implementer: Built and deployed 5 end-to-end projects spanning Cybersecurity AI, "
            "Healthcare RAG (MediLu), Travel Expense Web App (Budget Buddy), Tailoring Platform, and OCR Document Classification."
        )
    },
    {
        "id": "career_interests",
        "title": "Career Interests & Professional Goals",
        "category": "Career",
        "content": (
            "Career Interests & Future Direction:\n"
            "- Target Roles: AI Engineer, Machine Learning Engineer, Full-Stack AI Developer, Software Engineer.\n"
            "- Core Specializations: Retrieval-Augmented Generation (RAG) pipelines, Large Language Model (LLM) agents, "
            "vector search systems, intelligent full-stack web applications, and predictive machine learning models.\n"
            "- Aspirations: Designing reliable, ethical, and scalable AI solutions that create tangible human impact."
        )
    }
]
