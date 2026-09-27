import React from 'react';
import { Code2, Hammer, Zap, Lightbulb, Compass, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { TechCube3D } from './3d/TechCube3D';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Activities & Key Attributes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Achievements & Core Strengths
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Algorithmic problem-solving commitment, practical project construction, and core professional competencies.
          </p>
        </div>

        {/* Top Split: Achievements Cards + 3D Coding Object */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Achievements Cards (LeetCode Problem Solver & Project Development) */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Continuous Activities
            </h3>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white font-display">Problem Solver, LeetCode</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Algorithms
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Active problem solver on LeetCode with consistent practice.
                  </p>
                </div>
              </div>

              <a
                href={PORTFOLIO_DATA.personal.contact.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors whitespace-nowrap self-start sm:self-center"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400">
                <Hammer className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white font-display">Project Development</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    Hands-on
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Continuously building real-world projects to enhance development skills.
                </p>
              </div>
            </div>
          </div>

          {/* 3D Coding Themed Visualizer */}
          <div className="lg:col-span-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-3 left-4 text-[11px] font-mono text-slate-500">
              3D Algorithmic Polyhedron
            </div>
            <TechCube3D variant="code-polyhedron" />
            <span className="text-xs font-mono text-slate-400 mt-2">
              Computational Logic Engine
            </span>
          </div>

        </div>

        {/* Strengths Section: Three Clean Interactive Cards */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">
            Professional Strengths
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.strengths.map((str, idx) => {
              const icons = [
                <Zap className="w-5 h-5 text-cyan-400" />,
                <Lightbulb className="w-5 h-5 text-amber-400" />,
                <Compass className="w-5 h-5 text-purple-400" />
              ];

              return (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800/80 space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      {icons[idx]}
                    </div>
                    <span className="text-xs font-mono text-slate-600">0{idx + 1}</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                    {str.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {str.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
