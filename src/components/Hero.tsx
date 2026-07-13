import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Hero() {
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
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Avant-garde Technological & Showroom Background Asset */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src="/images/hero_bg.jpg" 
          alt="High-Tech AI Car Dealership Showroom Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 contrast-[1.25] saturate-110 brightness-[0.98] scale-[1.03] transition-transform duration-1000 ease-out"
        />
        {/* Subtle architectural gradient masks for seamless flow integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/5 via-zinc-100/30 to-zinc-100/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/50 via-transparent to-blue-50/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 mb-8 tracking-tight leading-[1.05]">
            AI-проекты для <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">автодилеров</span>
          </h1>
          <p className="text-lg text-slate-900 mb-10 leading-relaxed font-sans font-medium max-w-xl">
            Разрабатываем проекты и внедряем искусственный интеллект.
            Внедряем ИИ в продажи, сервис и клиентскую поддержку.
            Сокращаем затраты, повышаем качество обслуживания и увеличиваем продажи.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { text: 'AI-контроль качества звонков', id: 'call-quality' },
              { text: 'AI-продавец автомобилей 24/7', id: 'car-seller' },
              { text: 'AI-помощник по подбору автомобиля', id: 'car-finder' },
              { text: 'AI-ассистент сервисного отдела', id: 'service-assistant' }
            ].map((item, i) => (
              <motion.a 
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.75)', borderColor: 'rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center text-slate-800 font-medium bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.08)] transition-all duration-300 group/item cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mr-3 shrink-0 border border-blue-500/20 group-hover/item:bg-blue-600 group-hover/item:border-blue-600 transition-all duration-300">
                  <Check className="w-3.5 h-3.5 text-blue-600 group-hover/item:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-sans tracking-wide text-slate-700 group-hover/item:text-blue-600 transition-colors duration-300 font-semibold">{item.text}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative group lg:-mt-16 flex flex-col gap-6"
        >
          {/* Glass Card frame wrapper */}
          <div className="absolute -inset-5 rounded-[40px] bg-white/35 backdrop-blur-md border border-white/50 shadow-2xl shadow-blue-950/5 -z-10 transition-transform duration-500 group-hover:scale-[1.01]" />
          
          {/* Main Hero Image - set with a majestic aspect ratio for maximum presence */}
          <div className="rounded-[28px] overflow-hidden aspect-[16/11] bg-slate-100 border border-white/80 shadow-md">
            <img 
              src="/images/hero_image.jpg" 
              alt="AI in dealership" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
            />
          </div>

          {/* Elegant connection form right under the picture */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-6 sm:p-8 rounded-2xl shadow-[0_15px_45px_rgba(37,99,235,0.15)] border border-blue-500/30">
            <h3 className="text-sm font-display font-semibold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
              Запись на демонстрацию
            </h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <input 
                  type="text" 
                  placeholder="Имя" 
                  required 
                  className="w-full p-3 text-sm rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваше имя.')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <input 
                  type="tel" 
                  placeholder="Телефон" 
                  required 
                  className="w-full p-3 text-sm rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваш номер телефона.')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  required 
                  className="w-full p-3 text-sm rounded-xl border border-blue-400/30 bg-blue-950/45 focus:ring-4 focus:ring-blue-300/20 focus:border-blue-300 focus:bg-blue-950/60 transition-all outline-none font-sans text-white placeholder:text-blue-200/60" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите ваш адрес электронной почты.')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="sm:col-span-2 bg-white text-blue-700 hover:bg-blue-50 py-3.5 rounded-xl font-display font-semibold text-sm hover:shadow-[0_8px_25px_-8px_rgba(255,255,255,0.4)] hover:shadow-[0_15px_35px_-6px_rgba(255,255,255,0.3)] transition-all duration-300 border border-transparent relative overflow-hidden group disabled:opacity-50 cursor-pointer text-center"
              >
                {/* Dynamic Sweep Light Effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-600/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                {status === 'submitting' ? 'Отправка...' : 'Записаться на демонстрацию'}
              </button>
            </form>
            
            {status === 'success' && (
              <p className="text-xs text-emerald-300 mt-3 text-center font-medium transition-all">
                ✓ Спасибо! Мы скоро с вами свяжемся.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-rose-300 mt-3 text-center font-medium transition-all">
                ✕ Произошла ошибка. Попробуйте еще раз.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
