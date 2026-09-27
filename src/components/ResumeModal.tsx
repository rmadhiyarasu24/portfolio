import React from 'react';
import { X, Printer, Download, Mail, Phone, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Modal Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="text-base font-semibold text-white font-display">Resume Document · Madhiyarasu R</h3>
          </div>
          
          <div className="flex items-center gap-2.5">
            {/* Direct Official PDF Download Button */}
            <a
              href="/Madhiyarasu_R_Resume.pdf"
              download="Madhiyarasu_R_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Print / Save PDF fallback */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Print / Save</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="bg-[#080c15] p-6 sm:p-9 rounded-2xl border border-slate-800/90 text-slate-200 space-y-6 print:bg-white print:text-black shadow-inner">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <p className="text-sm font-medium text-cyan-400 mt-1">
              {PORTFOLIO_DATA.personal.headline}
            </p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 mt-3 font-mono">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {PORTFOLIO_DATA.personal.contact.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                {PORTFOLIO_DATA.personal.contact.phone}
              </span>
              <span>·</span>
              <span>Namakkal, Tamil Nadu, India</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
              <a href={PORTFOLIO_DATA.personal.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline">linkedin.com/in/rmadhiyarasu</a>
              <span>·</span>
              <a href={PORTFOLIO_DATA.personal.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline">github.com/rmadhiyarasu24</a>
              <span>·</span>
              <a href={PORTFOLIO_DATA.personal.contact.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline">leetcode.com/u/MADHIYARASU08/</a>
            </div>
          </div>

          {/* Career Objective */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">Career Objective</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Motivated Artificial Intelligence & Data Science student with a strong foundation in programming, data
              structures, and web development. Seeking an internship opportunity to apply problem-solving skills and build
              scalable, real-world applications in software and AI-driven environments.
            </p>
          </div>

          {/* Internship Experience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 font-mono">Internship Experience</h4>
            <div className="space-y-4">
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-white">
                      {exp.role}, <span className="text-cyan-300">{exp.company}</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {exp.duration} ({exp.location})
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">Education</h4>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-white">
                B.Tech – Artificial Intelligence & Data Science, SNS College of Engineering
              </span>
              <span className="text-xs text-slate-400 font-mono">2024 – 2028</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-1 font-mono">
              <span>Tamil Nadu, India</span>
              <span className="text-cyan-300 font-semibold">CGPA: 8.3</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">Technical Skills</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-slate-200 block mb-1">Programming Languages</span>
                <span className="text-slate-400">Java, Python, C</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-slate-200 block mb-1">Web Technologies</span>
                <span className="text-slate-400">HTML, CSS, JavaScript, React (Vite + TypeScript)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-slate-200 block mb-1">Tools & Platforms</span>
                <span className="text-slate-400">Git, GitHub, Firebase, Supabase, VS Code</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-slate-200 block mb-1">Core Concepts</span>
                <span className="text-slate-400">Data Structures & Algorithms, OOP, DBMS, Operating Systems, Machine Learning Basics, Data Science & EDA</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 font-mono">Projects</h4>
            <div className="space-y-3.5">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="text-xs space-y-1 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-semibold text-white">{proj.title}</span>
                    <span className="text-cyan-400 font-mono text-[11px]">{proj.technologies.slice(0, 3).join(', ')}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{proj.description}</p>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5 pt-1">
                    {proj.features.slice(0, 3).map((f, fIdx) => (
                      <li key={fIdx}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">Certifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-slate-400">
              {PORTFOLIO_DATA.certifications.map((c, idx) => (
                <div key={idx} className="flex items-start gap-1.5 p-2 rounded-lg bg-slate-900/30 border border-slate-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                  <span className="leading-snug">{c.title} — <span className="text-slate-300">{c.issuer}</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Strengths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">Achievements & Activities</h4>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li><strong className="text-slate-200">Problem Solver, LeetCode:</strong> Active problem solver on LeetCode with consistent practice</li>
                <li><strong className="text-slate-200">Project Development:</strong> Continuously building real-world projects to enhance development skills</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">Strengths</h4>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                <li>Strong analytical and problem-solving skills</li>
                <li>Quick learner with adaptability to new technologies</li>
                <li>Passion for building practical, user-focused applications</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
