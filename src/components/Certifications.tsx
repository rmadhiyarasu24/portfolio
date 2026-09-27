import React, { useState } from 'react';
import { Award, CheckCircle, ShieldCheck, Cpu, Terminal, Compass, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA, CertificationItem } from '../data/portfolio';

export const Certifications: React.FC = () => {
  const [filterIssuer, setFilterIssuer] = useState<string | null>(null);

  const issuers = React.useMemo(() => {
    const list = new Set<string>();
    PORTFOLIO_DATA.certifications.forEach(c => list.add(c.issuer));
    return Array.from(list);
  }, []);

  const filteredCerts = filterIssuer
    ? PORTFOLIO_DATA.certifications.filter(c => c.issuer === filterIssuer)
    : PORTFOLIO_DATA.certifications;

  const getIssuerBadgeColor = (issuer: string) => {
    if (issuer.includes('IBM')) return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    if (issuer.includes('ServiceNow')) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (issuer.includes('byteXL')) return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <section id="certifications" className="py-24 relative border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Certifications & Industry Credentials
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Professional credentials completed across artificial intelligence, enterprise design thinking, machine learning, and computer applications.
            </p>
          </div>

          {/* Issuer Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterIssuer(null)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filterIssuer === null
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({PORTFOLIO_DATA.certifications.length})
            </button>
            {issuers.map((issuer) => (
              <button
                key={issuer}
                onClick={() => setFilterIssuer(filterIssuer === issuer ? null : issuer)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filterIssuer === issuer
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {issuer}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Horizontal / Responsive Grid Certification Wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:rotate-[0.5deg] transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.2)]"
            >
              <div className="space-y-4">
                {/* Header Icon + Issuer Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${getIssuerBadgeColor(cert.issuer)}`}>
                    {cert.issuer}
                  </span>
                </div>

                {/* Certification Title */}
                <div>
                  <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  {cert.year && (
                    <span className="text-xs font-mono text-cyan-400/90 block mt-1">
                      Conferred: {cert.year}
                    </span>
                  )}
                </div>

                {/* Focus description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  Focus: {cert.focus}
                </p>
              </div>

              {/* Bottom Verification Status */}
              <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Credential</span>
                </span>
                <span>Resume Truth</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
