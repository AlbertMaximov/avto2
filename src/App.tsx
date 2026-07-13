/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from './components/Hero';
import ProjectSection from './components/ProjectSection';
import ProcessSection from './components/ProcessSection';
import CTASection from './components/CTASection';
import { projects } from './data/projects';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-zinc-100 to-blue-50/70 relative overflow-hidden selection:bg-blue-500/10 selection:text-blue-600">
      {/* Avant-garde Ambient Orbs for Glassmorphic refraction */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-sky-200/40 to-blue-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-emerald-100/30 to-teal-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-100/30 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10">
        <Hero />
        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
        <ProcessSection />
        <CTASection />
      </div>
    </div>
  );
}

