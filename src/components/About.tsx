import React from 'react';
import { Brain, Code, Cpu, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { TechCube3D } from './3d/TechCube3D';

export const About: React.FC = () => {
  const cardIcons = [
    <Brain className="w-5 h-5 text-cyan-400" />,
    <Code className="w-5 h-5 text-emerald-400" />,
    <Cpu className="w-5 h-5 text-purple-400" />,
    <Layers className="w-5 h-5 text-amber-400" />
  ];

  return (
    <section id="about" className="py-24 relative border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Profile Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            About My Focus
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Undergraduate in Artificial Intelligence & Data Science with hands-on immersion in intelligent systems, machine learning engineering, and scalable web software.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 3D Visual Column */}
          <div className="lg:col-span-4 bg-slate-900/40 rounded-2xl border border-slate-800/80 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-3 left-4 text-[11px] font-mono text-slate-500">
              Interactive AI Geometry Core
            </div>
            <TechCube3D variant="neural-core" />
            <div className="mt-2 space-y-1">
              <span className="text-xs font-medium text-slate-200 block">AI & Data Science Architecture</span>
              <span className="text-[11px] text-slate-500 font-mono">B.Tech · SNS College of Engineering</span>
            </div>
          </div>

          {/* Core Focus Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.aboutCards.map((card, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                    {cardIcons[idx]}
                  </div>
                  <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                </div>
                <h3 className="text-base font-semibold text-white font-display">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
