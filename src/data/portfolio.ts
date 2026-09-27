export interface Project {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  features: string[];
  problem: string;
  solution: string;
  contribution: string;
  theme3d: 'cyber' | 'travel' | 'tailoring' | 'document' | 'medilu';
  githubUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
  focus: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Madhiyarasu R",
    headline: "Artificial Intelligence & Data Science Student",
    primaryFocus: "AI / Machine Learning / Software Development",
    intro: "Building practical AI-powered applications and exploring the intersection of artificial intelligence, software development, and real-world problem solving.",
    heroBadge: "AI • ML • Software Development",
    heroPunchline: "Building intelligent solutions with AI, data, and software.",
    contact: {
      email: "rmadhiyarasu0803@gmail.com",
      phone: "9344955053",
      linkedin: "https://linkedin.com/in/rmadhiyarasu",
      github: "https://github.com/rmadhiyarasu24",
      leetcode: "https://leetcode.com/u/MADHIYARASU08/",
      location: "Namakkal, Tamil Nadu, India"
    },
    objective: "Motivated Artificial Intelligence & Data Science student with a strong foundation in programming, data structures, and web development. Seeking an internship opportunity to apply problem-solving skills and build scalable, real-world applications in software and AI-driven environments.",
    strengths: [
      "Strong analytical and problem-solving skills",
      "Quick learner with adaptability to new technologies",
      "Passion for building practical, user-focused applications"
    ]
  },
  education: {
    degree: "B.Tech – Artificial Intelligence & Data Science",
    institution: "SNS College of Engineering",
    location: "Tamil Nadu, India",
    period: "2024 – 2028",
    cgpa: "8.3"
  },
  aboutCards: [
    {
      title: "AI & Machine Learning",
      description: "Hands-on experience developing LLM pipelines, RAG systems, vector embeddings, and computer vision classification."
    },
    {
      title: "Web Development",
      description: "Building responsive, modern full-stack web applications with React, TypeScript, FastAPI, and cloud backends."
    },
    {
      title: "Data Structures & Algorithms",
      description: "Consistent problem solver practicing algorithmic challenges, data structures, and computational optimization."
    },
    {
      title: "Real-world Application Development",
      description: "Translating theoretical concepts into production-ready software solving concrete domain challenges."
    }
  ],
  experience: [
    {
      role: "AI & Machine Learning Intern",
      company: "Six O Four Solutions",
      duration: "06/2026 – 07/2026",
      location: "Palani",
      highlights: [
        "Developed AI applications using LangChain, RAG, Vector Databases, and LLMs.",
        "Gained hands-on experience in AI, Machine Learning, and Data Science concepts.",
        "Built intelligent AI workflows and enhanced practical problem-solving skills through real-world applications."
      ]
    },
    {
      role: "Web Development Intern",
      company: "WebGen Technology",
      duration: "06/2025 – 07/2025",
      location: "Online",
      highlights: [
        "Developed responsive web interfaces using modern frontend technologies.",
        "Assisted in backend integration and basic API handling.",
        "Used Git for version control and collaborative development.",
        "Gained practical experience in real-time project workflows and teamwork."
      ]
    }
  ] as ExperienceItem[],
  skillCategories: [
    {
      category: "Programming",
      description: "Core languages for systems, algorithms, and data modeling",
      skills: ["Java", "Python", "C"]
    },
    {
      category: "Web & Frontend",
      description: "Modern component-driven web interfaces & state architectures",
      skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Vite"]
    },
    {
      category: "AI & Machine Learning",
      description: "Generative AI, retrieval pipelines, language models & vision",
      skills: ["Google Gemini API", "LangChain", "RAG", "Vector Databases", "LLMs", "OCR", "NLP"]
    },
    {
      category: "Core Concepts",
      description: "Foundational computer science principles & data engineering",
      skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Machine Learning Basics", "Data Science & EDA"]
    },
    {
      category: "Tools & Platforms",
      description: "Version control, serverless cloud databases & developer tooling",
      skills: ["Git", "GitHub", "Firebase", "Supabase", "VS Code"]
    }
  ],
  projects: [
    {
      id: "cybersecurity-anomaly-detection",
      title: "Real-Time Cybersecurity Anomaly Detection System",
      category: "AI & Machine Learning",
      technologies: ["Machine Learning", "Python", "Data Preprocessing", "Feature Engineering"],
      description: "Built a machine learning-based system to detect unusual network activities in real time.",
      features: [
        "Data preprocessing",
        "Feature engineering",
        "Anomaly detection",
        "Cyber threat identification",
        "Reducing false positives"
      ],
      problem: "Modern computer networks generate massive continuous packet streams. Legacy rule-based systems struggle to catch novel intrusion vectors and suffer from excessive false-positive alert fatigue.",
      solution: "Engineered an ML-driven anomaly detection architecture that continuously monitors telemetry feature vectors, isolates high-probability intrusions, and maintains low false alarms.",
      contribution: "Designed preprocessing pipelines, engineered high-signal statistical network features, trained unsupervised & supervised anomaly models, and optimized decision boundaries for real-time latency.",
      theme3d: "cyber"
    },
    {
      id: "budget-buddy",
      title: "Budget Buddy – Travel Budget Web App",
      category: "Web Application",
      technologies: ["React", "Supabase", "JavaScript", "CSS"],
      description: "Developed a responsive web application to manage travel expenses efficiently.",
      features: [
        "Travel expense management",
        "Supabase backend",
        "Dynamic UI",
        "Expense tracking",
        "Performance-focused UI/UX"
      ],
      problem: "Tracking dynamic multi-day travel expenses, categorizing split expenditures, and monitoring trip limits on mobile devices is often messy and disorganized.",
      solution: "Constructed a high-performance web application powered by Supabase for real-time expense entries, category allocation charts, and instant trip balance recalculations.",
      contribution: "Built responsive client interface with React, implemented Supabase database schema and queries, and created fluid expense tracking workflows designed for mobile travel use.",
      theme3d: "travel"
    },
    {
      id: "tailoring-service-platform",
      title: "Tailoring Service Web Application",
      category: "Full-Stack Web App",
      technologies: ["Firebase", "React", "JavaScript", "CSS"],
      description: "Building a web platform for a tailoring business to manage customer orders.",
      features: [
        "Customer management",
        "Order tracking",
        "Service listing",
        "Firebase authentication",
        "Firebase database"
      ],
      problem: "Bespoke tailoring shops face constant friction tracking physical order slips, fabric measurements, customized alteration requests, and delivery timelines.",
      solution: "Created an end-to-end digital tailoring platform featuring secure client and administrator authentication, persistent measurement records, and transparent order lifecycle tracking.",
      contribution: "Implemented Firebase Authentication and Firestore database architecture, engineered modular React dashboards, and digitized customer measurement and order-status pipelines.",
      theme3d: "tailoring"
    },
    {
      id: "ai-document-classification",
      title: "AI Document Classification System",
      category: "AI / NLP & OCR",
      technologies: ["Python", "Flask", "Google Gemini API", "OCR", "NLP", "HTML", "CSS", "JavaScript"],
      description: "Developed an AI-powered web application to classify documents using OCR and Google Gemini.",
      features: [
        "Document upload",
        "Text extraction",
        "Automated classification",
        "PDF support",
        "DOCX support",
        "JPG support",
        "PNG support"
      ],
      problem: "Manual sorting and categorization of heterogeneous multi-format documents (PDFs, scans, photos, text documents) creates severe bottlenecks in document handling workflows.",
      solution: "Developed an automated intelligent ingestion engine combining OCR optical extraction with Google Gemini API reasoning to classify incoming files into structured categories instantly.",
      contribution: "Constructed Flask REST endpoints, incorporated OCR extraction filters across PDF, DOCX, JPG, and PNG formats, orchestrated Gemini API prompts, and created the interactive user dashboard.",
      theme3d: "document"
    },
    {
      id: "medilu-healthcare-assistant",
      title: "MediLu – AI-Powered Patient Healthcare Assistant",
      category: "AI & Healthcare",
      technologies: ["React", "FastAPI", "Supabase", "AI / LLM", "RAG"],
      description: "Developed an AI healthcare assistant that simplifies medical reports and terminology for patients.",
      features: [
        "Medical report simplification",
        "AI symptom checking",
        "Health tracking",
        "Medication reminders",
        "Appointment reminders",
        "Recovery planning",
        "Role-based portals",
        "Authentication",
        "APIs",
        "Database",
        "Notification services"
      ],
      problem: "Patients frequently experience stress and confusion when reading lab reports full of complex diagnostic terminology, while struggling to organize post-consultation medication schedules.",
      solution: "Built an AI-assisted healthcare companion application utilizing Retrieval-Augmented Generation (RAG) and LLMs to present clear, patient-friendly summaries alongside recovery planning schedules.",
      contribution: "Architected modern React user portal with role-based routing, engineered FastAPI and Supabase database endpoints, integrated RAG pipelines for contextual simplification, and set up reminder notification flows.",
      theme3d: "medilu"
    }
  ] as Project[],
  certifications: [
    {
      title: "ServiceNow Virtual Internship",
      issuer: "ServiceNow",
      focus: "Enterprise Workflows & Digital Operations"
    },
    {
      title: "Enterprise Design Thinking Practitioner",
      issuer: "IBM",
      focus: "Human-Centered Problem Solving"
    },
    {
      title: "Python 101 for Data Science",
      issuer: "IBM SkillsBuild",
      year: "2025",
      focus: "Data Structures & Analytical Libraries"
    },
    {
      title: "Artificial Intelligence Fundamentals",
      issuer: "IBM SkillsBuild",
      focus: "Machine Learning & Neural Networks"
    },
    {
      title: "Enterprise Design Thinking Co-Creator",
      issuer: "IBM",
      focus: "Collaborative Agile Synthesis"
    },
    {
      title: "Diploma in Computer Applications (DCA)",
      issuer: "CSC Computer Education",
      focus: "Core Computing & Software Applications"
    },
    {
      title: "Building Trustworthy AI Enterprise Solutions",
      issuer: "IBM SkillsBuild",
      focus: "AI Governance, Ethics & Reliability"
    },
    {
      title: "Machine Learning with Python",
      issuer: "IBM SkillsBuild",
      focus: "Predictive Modeling & Scikit-Learn"
    },
    {
      title: "Python Programming",
      issuer: "CSC Computer Education",
      focus: "Algorithm Implementation & Software Logic"
    },
    {
      title: "Python for Placement Readiness",
      issuer: "byteXL, SNS Institutions",
      year: "Aug 2025",
      focus: "Placement Preparation, Python Syntax & Problem Solving"
    },
    {
      title: "Basic Data Structures and Algorithms",
      issuer: "byteXL, SNS Institutions",
      year: "Aug–Sep 2025",
      focus: "Core Data Structures, Complexity Analysis & Algorithmic Problem Solving"
    },
    {
      title: "Digital Marketing & Social Media Strategies",
      issuer: "byteXL, SNS Institutions",
      year: "Oct–Nov 2025",
      focus: "Digital Marketing Principles, Brand Outreach & Social Media Campaigns"
    }
  ] as CertificationItem[],
  achievements: [
    {
      title: "Problem Solver, LeetCode",
      detail: "Active problem solver on LeetCode with consistent practice.",
      badgeText: "Algorithms & Logic",
      link: "https://leetcode.com/u/MADHIYARASU08/"
    },
    {
      title: "Project Development",
      detail: "Continuously building real-world projects to enhance development skills.",
      badgeText: "Hands-on Engineering"
    }
  ],
  strengths: [
    {
      title: "Strong Analytical & Problem-Solving Skills",
      description: "Rigorous algorithmic thinking and structural breakdown of complex software and data challenges."
    },
    {
      title: "Quick Learner with Adaptability",
      description: "Rapidly mastering emerging AI frameworks, cloud primitives, and developer toolchains."
    },
    {
      title: "Passion for Practical, User-Focused Applications",
      description: "Dedicated to building tangible software that delivers immediate, real-world utility and seamless UX."
    }
  ]
};
