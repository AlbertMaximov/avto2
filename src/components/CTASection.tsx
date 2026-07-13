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
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 sm:p-10 rounded-3xl grid md:grid-cols-2 gap-6 text-left shadow-[0_20px_50px_rgba(37,99,235,0.15)] border border-blue-500/30"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <input 
              type="text" 
              placeholder="Имя" 
              required 
              className="w-full p-4 rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
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
              className="w-full p-4 rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
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
              className="w-full p-4 rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваш адрес электронной почты.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'submitting'}
            className="md:col-span-2 bg-white text-blue-700 hover:bg-blue-50 py-4 rounded-2xl font-display font-semibold text-lg transition-all duration-300 hover:shadow-[0_8px_25px_-8px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_35px_-6px_rgba(255,255,255,0.3)] border border-transparent relative overflow-hidden group disabled:opacity-50 cursor-pointer text-center"
          >
            {/* Dynamic Sweep Light Effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-600/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            {status === 'submitting' ? 'Отправка...' : 'Записаться на демонстрацию'}
          </button>
          {status === 'success' && <p className="md:col-span-2 text-emerald-300 text-center font-medium">✓ Спасибо! Мы скоро с вами свяжемся.</p>}
          {status === 'error' && <p className="md:col-span-2 text-rose-300 text-center font-medium">✕ Произошла ошибка. Попробуйте еще раз.</p>}
        </motion.form>
      </div>
    </section>
  );
}
