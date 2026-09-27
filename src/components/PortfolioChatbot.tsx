import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, X, RotateCcw, ChevronDown, User, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ title: string; category: string; score?: number }>;
  timestamp: string;
}

const DEFAULT_SUGGESTIONS = [
  "Tell me about Madhiyarasu",
  "Show me his AI projects",
  "What technologies does he use?",
  "Tell me about his internships",
  "Tell me about his MediLu project",
  "Does he have experience with RAG?",
  "What certifications does he have?",
  "How can I contact him?"
];

export const PortfolioChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I am **Madhiyarasu AI**, an intelligent conversational assistant powered by RAG (Retrieval-Augmented Generation).\n\nAsk me anything about Madhiyarasu's profile, education, technical skills, AI/ML engineering, internships, projects, certifications, or contact details!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  // Client-side grounded fallback if FastAPI backend is starting up
  const localRAGFallback = (query: string): { reply: string; sources: Array<{ title: string; category: string }> } => {
    const q = query.toLowerCase();

    if (q.includes('who is') || q.includes('about madhiyarasu') || q.includes('profile') || q.includes('bio')) {
      return {
        reply: "Madhiyarasu R is an Artificial Intelligence & Data Science student at SNS College of Engineering (CGPA 8.3) with expertise in AI, Machine Learning, and Software Development. He builds practical AI applications, LangChain/RAG pipelines, and full-stack software.",
        sources: [{ title: "Profile Overview", category: "Profile" }]
      };
    }

    if (q.includes('rag') || q.includes('retrieval')) {
      return {
        reply: "Yes! Madhiyarasu has practical hands-on experience with Retrieval-Augmented Generation (RAG). He developed RAG and vector database pipelines during his AI & ML Internship at Six O Four Solutions, and architected RAG simplification workflows in his 'MediLu Healthcare Assistant' project.",
        sources: [{ title: "AI & ML Internship (Six O Four Solutions)", category: "Experience" }, { title: "MediLu Healthcare Assistant", category: "Projects" }]
      };
    }

    if (q.includes('medilu') || q.includes('healthcare')) {
      return {
        reply: "MediLu is an AI-powered healthcare companion built with React, FastAPI, Supabase, and RAG. It simplifies complex diagnostic lab reports for patients, offers AI symptom checking, and coordinates recovery schedules with medication and appointment reminders.",
        sources: [{ title: "MediLu – Patient Healthcare Assistant", category: "Projects" }]
      };
    }

    if (q.includes('internship') || q.includes('work experience') || q.includes('experience')) {
      return {
        reply: "Madhiyarasu has completed two key internships:\n1. **AI & Machine Learning Intern** at Six O Four Solutions (06/2026 – 07/2026): Engineered AI applications with LangChain, RAG, Vector Databases, and LLMs.\n2. **Web Development Intern** at WebGen Technology (06/2025 – 07/2025): Developed modern responsive web interfaces and handled REST API integration.",
        sources: [{ title: "Work Experience Matrix", category: "Experience" }]
      };
    }

    if (q.includes('certif') || q.includes('bytexl')) {
      return {
        reply: "Madhiyarasu holds 12 verified certifications, including:\n• **byteXL & SNS Institutions**: Python for Placement Readiness, Basic Data Structures & Algorithms, Digital Marketing & Social Media Strategies (2025)\n• **IBM SkillsBuild**: AI Fundamentals, Python 101 for Data Science, Machine Learning with Python, Building Trustworthy AI\n• **IBM**: Enterprise Design Thinking Practitioner & Co-Creator\n• **ServiceNow**: Virtual Internship in Digital Operations\n• **CSC**: Diploma in Computer Applications (DCA) & Python Programming.",
        sources: [{ title: "Certifications & Industry Credentials", category: "Certifications" }]
      };
    }

    if (q.includes('project') || q.includes('build') || q.includes('built')) {
      return {
        reply: "Madhiyarasu has engineered 5 notable projects:\n1. **Real-Time Cybersecurity Anomaly Detection System** (ML & Python)\n2. **MediLu – AI Patient Healthcare Assistant** (React, FastAPI, Supabase, RAG)\n3. **Budget Buddy – Travel Budget Web App** (React, Supabase, JavaScript)\n4. **Tailoring Service Web Platform** (Firebase, React, Firestore)\n5. **AI Document Classification** (Python, NLP, Computer Vision, OCR).",
        sources: [{ title: "Interactive Project Showcase", category: "Projects" }]
      };
    }

    if (q.includes('skill') || q.includes('technolog') || q.includes('tech stack') || q.includes('language') || q.includes('python')) {
      return {
        reply: "Madhiyarasu's technical capabilities include:\n• **Languages**: Python, Java, C\n• **Frontend & Web**: React, TypeScript, JavaScript, HTML5, CSS3, Vite, Tailwind CSS\n• **AI / ML**: LangChain, RAG, Google Gemini API, Vector Databases (ChromaDB, pgvector), LLMs, OCR, NLP, Scikit-Learn\n• **Core CS**: Data Structures & Algorithms (LeetCode problem solver), DBMS, OOP, Operating Systems\n• **Tools**: Git, GitHub, Firebase, Supabase, VS Code.",
        sources: [{ title: "Skills & Expertise Matrix", category: "Skills" }]
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('github') || q.includes('linkedin')) {
      return {
        reply: "You can contact Madhiyarasu R directly:\n• **Email**: rmadhiyarasu0803@gmail.com\n• **Phone**: +91 9344955053\n• **LinkedIn**: https://linkedin.com/in/rmadhiyarasu\n• **GitHub**: https://github.com/rmadhiyarasu24\n• **Location**: Tamil Nadu, India.",
        sources: [{ title: "Contact Information", category: "Contact" }]
      };
    }

    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa')) {
      return {
        reply: "Madhiyarasu is pursuing a **B.Tech in Artificial Intelligence & Data Science** at SNS College of Engineering, Tamil Nadu, India (2023 – Present) with a CGPA of 8.3.",
        sources: [{ title: "Education & Academic Background", category: "Education" }]
      };
    }

    return {
      reply: "I don't have that information in Madhiyarasu's portfolio yet.",
      sources: []
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to FastAPI RAG backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      // Seamless local RAG fallback
      const fallbackResult = localRAGFallback(messageText);
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResult.reply,
        sources: fallbackResult.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome_reset',
        role: 'assistant',
        content: "Chat history cleared. What would you like to explore about Madhiyarasu's portfolio?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Madhiyarasu AI Chatbot"
            className="group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all duration-300 backdrop-blur-md transform hover:-translate-y-0.5 active:scale-95"
          >
            {/* Small Glowing 3D AI Orb */}
            <div className="relative w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute" />
              <Bot className="w-4 h-4 text-cyan-300 relative z-10" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                <span>Ask Madhiyarasu AI</span>
                <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">RAG Portfolio Agent</span>
            </div>

            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Online" />
          </button>
        )}
      </div>

      {/* Glassmorphism Chatbot Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Madhiyarasu AI Chatbot Window"
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[450px] h-[580px] max-h-[85vh] rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#05070f]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.2)] flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Miniature AI Orb */}
              <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Bot className="w-5 h-5 text-cyan-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                  <span>Madhiyarasu AI</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    RAG
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Ask me anything about my portfolio.</p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Clear Chat History"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-md ${
                    msg.role === 'user'
                      ? 'bg-cyan-500/20 text-cyan-50 border border-cyan-500/40 rounded-tr-sm'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800/90 rounded-tl-sm'
                  }`}
                >
                  {/* Message Content */}
                  <div className="whitespace-pre-wrap space-y-1">
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i}>
                        {line.startsWith('• ') ? (
                          <span className="flex items-start gap-1.5">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{line.replace('• ', '')}</span>
                          </span>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Retrieved Sources Badge */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <span className="text-cyan-400/90 font-semibold">Sources:</span>
                      {msg.sources.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300"
                        >
                          {s.title}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-slate-500 block text-right mt-1.5 font-mono">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-300 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Animation */}
            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl rounded-tl-sm p-3.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-mono text-cyan-400 ml-2">Searching knowledge base...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Chips */}
          <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/60 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            {DEFAULT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSendMessage(suggestion)}
                disabled={isLoading}
                className="whitespace-nowrap text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors disabled:opacity-50 shrink-0"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-900/80 border-t border-slate-800/80 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, projects, certifications..."
              disabled={isLoading}
              className="flex-1 bg-slate-950/90 border border-slate-800 focus:border-cyan-400/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 font-mono transition-all"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 transition-all font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:shadow-none shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
