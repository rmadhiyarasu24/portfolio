import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Formal undergraduate degree specialized in Artificial Intelligence and Data Science engineering.
          </p>
        </div>

        {/* Futuristic 3D Academic Card */}
        <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800/80 hover:border-cyan-500/40 shadow-2xl relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {PORTFOLIO_DATA.education.degree}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-300/90 mt-0.5">
                    {PORTFOLIO_DATA.education.institution}
                  </p>
                </div>
              </div>

              {/* CGPA Score Display */}
              <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-2xl">
                <Award className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Cumulative GPA</span>
                  <span className="text-lg font-bold font-mono text-white tabular-nums">{PORTFOLIO_DATA.education.cgpa} <span className="text-xs text-slate-500 font-normal">/ 10</span></span>
                </div>
              </div>
            </div>

            {/* Academic Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">Timeline: {PORTFOLIO_DATA.education.period}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{PORTFOLIO_DATA.education.location}</span>
              </div>
            </div>

            {/* Coursework Focus */}
            <div className="pt-4 border-t border-slate-800/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 font-mono mb-2">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Key Core Areas of Study</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Machine Learning, Data Science & Exploratory Data Analysis, Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Operating Systems.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
