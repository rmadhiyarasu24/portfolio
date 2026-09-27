import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolio';
import { ProjectVisualizer3D } from './3d/ProjectVisualizer3D';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Github, Sparkles, CheckCircle2 } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Interactive Project Showcase
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Practical AI applications, full-stack systems, and algorithmic solutions built with machine learning, modern web technologies, and cloud backends.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <div
              key={project.id}
              className={`glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_15px_40px_-15px_rgba(6,182,212,0.25)] relative ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* 3D Visualizer Simulation Box */}
                <div className={`w-full overflow-hidden rounded-2xl mb-6 relative border border-slate-800/80 group-hover:border-cyan-500/30 transition-colors ${
                  idx === 0 ? 'h-64 sm:h-80' : 'h-52 sm:h-60'
                }`}>
                  <ProjectVisualizer3D theme={project.theme3d} />
                </div>

                {/* Unboxed Metadata (Zero-Pill Discipline) */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                  <span className="text-cyan-400 font-semibold">{project.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{project.technologies.slice(0, 3).join(', ')}</span>
                </div>

                {/* Project Title & Short Description */}
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features Preview */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                  {project.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {project.features.length > 3 && (
                    <span className="text-[11px] font-mono text-cyan-400/80 block pt-1">
                      + {project.features.length - 3} more capabilities in detail view
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transform group-hover:translate-x-0.5"
                >
                  <span>Explore Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={PORTFOLIO_DATA.personal.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
