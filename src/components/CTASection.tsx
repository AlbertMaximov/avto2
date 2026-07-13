import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function CTASection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="cta-section" className="py-28 lg:py-36 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-display font-bold mb-6 tracking-tight text-slate-900 leading-[1.1]"
        >
          Готовы показать AI в работе
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 mb-12 font-sans font-light max-w-2xl mx-auto leading-relaxed"
        >
          Проведем персональную демонстрацию проектов и покажем, как искусственный интеллект может увеличить продажи и сократить издержки вашего дилерского центра.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 sm:p-10 rounded-3xl text-slate-900 grid md:grid-cols-2 gap-6 text-left shadow-[0_20px_50px_rgba(59,130,246,0.05)]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <input 
              type="text" 
              placeholder="Имя" 
              required 
              className="w-full p-4 rounded-xl border border-white/60 bg-white/40 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white/80 transition-all outline-none font-sans text-slate-800 placeholder:text-slate-400" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваше имя.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <input 
              type="tel" 
              placeholder="Телефон" 
              required 
              className="w-full p-4 rounded-xl border border-white/60 bg-white/40 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white/80 transition-all outline-none font-sans text-slate-800 placeholder:text-slate-400" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваш номер телефона.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <input 
              type="email" 
              placeholder="E-mail" 
              required 
              className="w-full p-4 rounded-xl border border-white/60 bg-white/40 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white/80 transition-all outline-none font-sans text-slate-800 placeholder:text-slate-400" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваш адрес электронной почты.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-display font-semibold text-lg transition-all duration-300 shadow-[0_12px_40px_-12px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.6)] border border-white/20 relative overflow-hidden group disabled:opacity-50 cursor-pointer text-center"
          >
            {/* Dynamic Sweep Light Effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            {status === 'submitting' ? 'Отправка...' : 'Записаться на демонстрацию'}
          </button>
          {status === 'success' && <p className="md:col-span-2 text-emerald-600 text-center font-medium">Спасибо! Мы скоро с вами свяжемся.</p>}
          {status === 'error' && <p className="md:col-span-2 text-red-500 text-center font-medium">Произошла ошибка. Попробуйте еще раз.</p>}
        </motion.form>
      </div>
    </section>
  );
}
