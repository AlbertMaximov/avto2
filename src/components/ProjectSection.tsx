import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { Check } from 'lucide-react';

interface ProjectSectionProps {
  project: Project;
  key?: string;
}

export default function ProjectSection({ project }: ProjectSectionProps) {
  return (
    <section id={project.id} className="py-12 lg:py-16 relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight leading-[1.1]">
              {project.title}
            </h2>
            <p className="text-base text-slate-600 mb-5 font-sans font-light leading-relaxed">{project.description}</p>
            
            <ul className="space-y-2 mb-6">
              {project.advantages.map((adv, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-4.5 h-4.5 rounded-full bg-blue-500/10 flex items-center justify-center mr-2.5 mt-0.5 shrink-0 border border-blue-500/20">
                    <Check className="w-2.5 h-2.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-sans font-normal text-slate-700 leading-relaxed">{adv}</span>
                </li>
              ))}
            </ul>

            {/* Task solved & what is created boxes - moved below the list and made more compact with premium medium-dark slate styling */}
            <div className="space-y-4 bg-gradient-to-br from-slate-700 to-slate-800/95 p-6 rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.1)] border border-slate-600/60 text-white relative overflow-hidden group">
              {/* Subtle light accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" />
              
              <div className="relative z-10">
                <h4 className="text-xs font-display font-bold text-blue-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  1. Какую задачу решает
                </h4>
                <p className="text-sm font-sans text-slate-200 font-normal leading-relaxed">{project.taskSolved}</p>
              </div>
              <div className="h-px bg-slate-600/50 relative z-10" />
              <div className="relative z-10">
                <h4 className="text-xs font-display font-bold text-blue-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  2. Что создаем
                </h4>
                <p className="text-sm font-sans text-slate-200 font-normal leading-relaxed">{project.whatWeCreate}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center w-full"
          >
            {/* Glass Card frame wrapper */}
            <div className="relative group w-full mb-6">
              <div className="absolute -inset-4 rounded-[36px] bg-white/30 backdrop-blur-md border border-white/40 shadow-xl shadow-blue-900/5 -z-10 transition-transform duration-500 group-hover:scale-[1.01]" />
              <div className="rounded-[28px] overflow-hidden aspect-[16/11] bg-slate-100 border border-white/80 shadow-md">
                <img 
                  src={project.imagePath} 
                  alt={project.title} 
                  className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out" 
                />
              </div>
            </div>

            {/* Book Demonstration button under the image */}
            <motion.a
              href="#cta-section"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderColor: 'rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/40 backdrop-blur-md border border-white/60 text-blue-600 hover:text-blue-700 px-6 py-3.5 rounded-xl font-display font-semibold text-sm transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.1)] group text-center"
            >
              Записаться на демонстрацию
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-sans">→</span>
            </motion.a>
          </motion.div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-display font-bold text-slate-900 mb-5 tracking-tight">Измеримый эффект</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {project.measuredEffects.map((effect, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group bg-gradient-to-br from-slate-700 to-slate-800/95 p-5.5 rounded-xl border border-slate-600/60 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)] hover:border-blue-400/40 transition-all duration-500 overflow-hidden"
              >
                {/* Premium corner glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700 ease-out" />
                
                <h4 className="text-base font-display font-semibold text-slate-100 mb-1.5 flex items-center gap-2 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform duration-300" />
                  {effect.title}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-sans font-light group-hover:text-slate-200 transition-colors duration-300 relative z-10">{effect.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
