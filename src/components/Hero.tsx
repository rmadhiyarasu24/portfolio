import React, { useState } from 'react';
import { ArrowDown, FileText, Mail, Github, Linkedin, Code2, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { HeroScene } from './3d/HeroScene';
import { ResumeModal } from './ResumeModal';

export const Hero: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden cyber-grid-bg">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Hero Content with Top Avatar Row */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-left">
            
            {/* Top Row: Profile Photo + Name Header */}
            <div className="flex items-center gap-5 sm:gap-6">
              
              {/* Profile Photo Frame */}
              <div className="relative group shrink-0 select-none">
                {/* Subtle Cyan/Blue Futuristic Glow Aura */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-purple-600/40 blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500 pointer-events-none" />

                {/* Glassmorphic Cyber Ring Container */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full p-1.5 bg-slate-900/70 backdrop-blur-xl border border-cyan-500/40 group-hover:border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.45)] transition-all duration-500 transform group-hover:scale-105">
                  {/* Inner Image Container with Clean Face Framing */}
                  <div className="w-full h-full rounded-full overflow-hidden border border-slate-800/90 relative bg-slate-950">
                    <img
                      src="/profile.jpg"
                      alt={PORTFOLIO_DATA.personal.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle glass reflection sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Top Badge + Name */}
              <div className="space-y-2 min-w-0">
                {/* Floating Top Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[11px] sm:text-xs font-medium text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{PORTFOLIO_DATA.personal.heroBadge}</span>
                </div>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
                  Hi, I'm <br />
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap inline-block">
                    {PORTFOLIO_DATA.personal.name}
                  </span>
                </h1>
              </div>

            </div>

            {/* Headline */}
            <p className="text-lg sm:text-xl font-medium text-cyan-400 font-display">
              {PORTFOLIO_DATA.personal.headline}
            </p>

            {/* Introduction prose */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {PORTFOLIO_DATA.personal.intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/40 rounded-xl transition-all transform hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links & Meta */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-all transform hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-all transform hover:scale-105"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.contact.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode Profile"
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-all transform hover:scale-105"
                >
                  <Code2 className="w-4 h-4" />
                </a>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_DATA.education.location}</span>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-400">Available for Opportunities</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive AI Scene */}
          <div className="lg:col-span-5 xl:col-span-5 relative w-full flex items-center justify-center">
            <HeroScene />
          </div>
        </div>
      </div>

      {/* Resume Document Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};
