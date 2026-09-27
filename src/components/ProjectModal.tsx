import React from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, UserCheck, Layers, Github, ExternalLink } from 'lucide-react';
import { Project, PORTFOLIO_DATA } from '../data/portfolio';
import { ProjectVisualizer3D } from './3d/ProjectVisualizer3D';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>{project.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Visualizer Simulation Header */}
        <div className="my-6 h-56 sm:h-72 rounded-2xl overflow-hidden border border-slate-800/80 relative">
          <ProjectVisualizer3D theme={project.theme3d} />
        </div>

        {/* Project Detailed Sections */}
        <div className="space-y-6 text-slate-300">
          
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              System Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold font-mono">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold font-mono">
                <Sparkles className="w-4 h-4" />
                <span>The Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* My Contribution */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold font-mono">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>My Engineering Contribution</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.contribution}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Key Capabilities & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <a
              href={PORTFOLIO_DATA.personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>View GitHub Profile</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors"
            >
              Close Details
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
