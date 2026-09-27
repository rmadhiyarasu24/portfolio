import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { SkillConstellation } from './3d/SkillConstellation';
import { Sparkles, Terminal, Globe, Brain, Database, Wrench } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'Web & Frontend':
        return <Globe className="w-4 h-4 text-emerald-400" />;
      case 'AI & Machine Learning':
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 'Core Concepts':
        return <Database className="w-4 h-4 text-amber-400" />;
      case 'Tools & Platforms':
        return <Wrench className="w-4 h-4 text-pink-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Skills & Expertise Matrix
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Organized skill taxonomy spanning AI & ML frameworks, algorithms, programming languages, web stacks, and developer tools.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Skills
            </button>
            {PORTFOLIO_DATA.skillCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(selectedCategory === cat.category ? null : cat.category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.category
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Skill Constellation Visualizer */}
        <div className="mb-14 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4 relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>3D Interactive Skill Constellation</span>
            </span>
          </div>

          <SkillConstellation
            activeCategory={selectedCategory}
            onSelectSkill={(skill) => setHighlightedSkill(skill)}
          />
        </div>

        {/* Category Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skillCategories
            .filter((c) => !selectedCategory || c.category === selectedCategory)
            .map((cat) => (
              <div
                key={cat.category}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white font-display">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-slate-400">{cat.description}</p>
                  </div>
                </div>

                {/* Skills listing */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill) => {
                    const isHighlighted = highlightedSkill === skill;
                    return (
                      <span
                        key={skill}
                        onMouseEnter={() => setHighlightedSkill(skill)}
                        onMouseLeave={() => setHighlightedSkill(null)}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all cursor-pointer ${
                          isHighlighted
                            ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                            : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
};
