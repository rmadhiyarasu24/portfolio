import React from 'react';
import { Github, Linkedin, Code2, Mail, ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#030509] py-12 relative z-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Identity */}
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-lg font-bold font-display text-white">
              {PORTFOLIO_DATA.personal.name}
            </h3>
            <p className="text-xs font-medium text-cyan-400">
              {PORTFOLIO_DATA.personal.headline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={PORTFOLIO_DATA.personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={PORTFOLIO_DATA.personal.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={PORTFOLIO_DATA.personal.contact.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>LeetCode</span>
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.contact.email}`}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>© 2026 {PORTFOLIO_DATA.personal.name}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-white transition-colors"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
