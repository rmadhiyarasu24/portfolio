/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundParticles } from './components/3d/BackgroundParticles';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { PortfolioChatbot } from './components/PortfolioChatbot';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#04060a] text-slate-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Short futuristic loading screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Interactive desktop cursor */}
      <CustomCursor />

      {/* Subtle 3D background particles */}
      <BackgroundParticles />

      {/* Main Portfolio Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* RAG Portfolio Chatbot */}
      <PortfolioChatbot />
    </div>
  );
}
