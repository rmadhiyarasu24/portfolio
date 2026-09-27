import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Code2, Copy, Check, Send, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { TechCube3D } from './3d/TechCube3D';

export const Contact: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sentNotice, setSentNotice] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mailto link
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.contact.email}?subject=${subject}&body=${body}`;
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-slate-800/60 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Let's Build Something Together
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
            I'm always interested in learning, building, and exploring new opportunities in AI and software development.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Quick Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3D Beacon Visual */}
            <div className="glass-panel p-4 rounded-3xl border border-slate-800/80 relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute top-3 left-4 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Neural Beacon Node</span>
              </div>
              <TechCube3D variant="neural-core" />
              <p className="text-xs font-mono text-slate-400 -mt-2">
                Open to internships, AI research & full-stack roles
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3">
              {/* Email */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Email Address</span>
                    <a href={`mailto:${PORTFOLIO_DATA.personal.contact.email}`} className="text-xs sm:text-sm font-medium text-white hover:text-cyan-400 transition-colors">
                      {PORTFOLIO_DATA.personal.contact.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.contact.email, 'email')}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Copy email"
                >
                  {copiedItem === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Direct Telephone</span>
                    <a href={`tel:${PORTFOLIO_DATA.personal.contact.phone}`} className="text-xs sm:text-sm font-medium text-white hover:text-cyan-400 transition-colors font-mono">
                      +91 {PORTFOLIO_DATA.personal.contact.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.contact.phone, 'phone')}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Copy phone"
                >
                  {copiedItem === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.contact.email}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.contact.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>LeetCode</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Message Transmission Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Send Direct Message</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Launches your default mail client with prefilled parameters</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello Madhiyarasu, I came across your AI & Software portfolio..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Madhiyarasu</span>
                  </button>
                </div>

                {sentNotice && (
                  <p className="text-xs text-center text-emerald-400 font-mono mt-2 animate-pulse">
                    Opening your mail client... If not opened, click the "Email Me" button directly.
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
