import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Keep loading short and intentional
    const timer = setTimeout(() => {
      setFading(true);
      const doneTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(doneTimer);
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#04060a] transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D Neural Ring Animation */}
      <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
        {/* Outer orbital rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '6s' }} />
        <div className="absolute inset-2 rounded-full border border-purple-500/25 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
        <div className="absolute inset-5 rounded-full border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '8s' }} />

        {/* Central glowing core */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-[0_0_24px_rgba(6,182,212,0.8)] animate-pulse flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>

        {/* Orbiting nodes */}
        <div className="absolute top-1 left-1/2 w-2 h-2 -ml-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        <div className="absolute bottom-2 left-1/4 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
        <div className="absolute right-2 top-1/3 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      </div>

      <div className="flex flex-col items-center text-center px-4">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-200 font-mono flex items-center gap-2">
          <span>Loading AI Portfolio</span>
          <span className="inline-flex">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
          </span>
        </h2>
        <p className="text-xs text-slate-500 mt-2 font-mono">
          Madhiyarasu R · Artificial Intelligence & Data Science
        </p>
      </div>
    </div>
  );
};
