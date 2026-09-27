import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Experience: React.FC = () => {
  const [activeExp, setActiveExp] = useState<number>(0);

  return (
    <section id="experience" className="py-24 relative border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Internship Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Industry & Technical Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Practical engineering experience developing AI applications, LLM workflows, and modern web architectures.
          </p>
        </div>

        {/* 3D Vertical Interactive Timeline */}
        <div className="relative mt-8">
          {/* Central luminous spine line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-600 transform -translate-x-1/2 opacity-40" />

          <div className="space-y-12">
            {PORTFOLIO_DATA.experience.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isSelected = activeExp === index;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  onClick={() => setActiveExp(index)}
                >
                  {/* Timeline Central Node in Desktop */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10 items-center justify-center">
                    <div
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 bg-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.8)] scale-110'
                          : 'border-slate-700 bg-slate-900 hover:border-slate-500'
                      }`}
                    >
                      <Briefcase className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    </div>
                  </div>

                  {/* Card Half */}
                  <div className="w-full md:w-[46%]">
                    <div
                      className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 border ${
                        isSelected
                          ? 'bg-slate-900/90 border-cyan-500/40 shadow-[0_10px_35px_-10px_rgba(6,182,212,0.2)]'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      } cursor-pointer`}
                    >
                      {/* Unboxed Metadata (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                        <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.duration}</span>
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-300/90 mt-0.5">
                        {exp.company}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2.5">
                        {exp.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech focus indicator */}
                      <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/50">
                        <span>Internship Position</span>
                        <span className="flex items-center gap-1 text-cyan-400">
                          <span>Focus Area</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Empty side for layout balance */}
                  <div className="hidden md:block w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
