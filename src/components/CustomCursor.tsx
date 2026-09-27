import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if touch device / mobile
    const checkMobile = () => {
      return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    };

    setIsMobile(checkMobile());

    if (checkMobile()) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest('button, a, input, textarea, [role="button"], canvas, .cursor-pointer, .interactive-card');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer subtle glow aura */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-cyan-400/40 transition-transform duration-150 ease-out will-change-transform ${
          isHovering
            ? 'w-10 h-10 -ml-5 -mt-5 bg-cyan-500/10 scale-125 border-cyan-300'
            : 'w-6 h-6 -ml-3 -mt-3 bg-transparent scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`
        }}
      />
      {/* Inner precise dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] pointer-events-none transition-transform duration-75 will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`
        }}
      />
    </div>
  );
};
