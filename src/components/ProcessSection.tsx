import { motion } from 'motion/react';

const steps = [
  { 
    number: '01', 
    title: 'Аналитика и стратегия', 
    duration: '1-2 недели', 
    description: 'Погружаемся в бизнес-процессы, определяем участки, которые решит ИИ. Формируем техническое задание, подбираем оптимальные модели (LLM, CV и др.) и утверждаем архитектуру.' 
  },
  { 
    number: '02', 
    title: 'Прототипирование (MVP)', 
    duration: '1-2 недели', 
    description: 'Создаем базовую версию системы для проверки гипотез. Обучаем или дообучаем (fine-tuning) модели на ваших данных, настраиваем промпты и базовый интерфейс.' 
  },
  { 
    number: '03', 
    title: 'Разработка и интеграция', 
    duration: '2-4 недели', 
    description: 'Полноценная разработка продукта. Интегрируем ИИ-ядро с вашими текущими CRM/ERP системами, настраиваем безопасность данных и масштабируемую инфраструктуру (MLOps).' 
  },
  { 
    number: '04', 
    title: 'Тестирование и запуск', 
    duration: '1-2 недели', 
    description: 'Нагрузочное тестирование, проверка безопасности (red teaming) и устранение галлюцинаций моделей. Плавный релиз и обучение вашей команды работе с новой системой.' 
  }
];

export default function ProcessSection() {
  return (
    <section className="py-28 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">Процесс разработки</h2>
          <p className="text-lg text-slate-600 max-w-2xl font-sans font-light leading-relaxed">Прозрачный процесс, предсказуемые сроки и фиксированный бюджет для вашего спокойствия.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/60 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] hover:border-white/80 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Средний бюджет</p>
              <p className="text-3xl font-bold font-display text-slate-900">от 100 000 до 300 000 ₽</p>
            </div>
            <p className="text-slate-500 text-sm mt-4 font-sans font-light">Зависит от сложности ИИ-моделей и интеграций</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/60 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] hover:border-white/80 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Сроки реализации</p>
              <p className="text-3xl font-bold font-display text-slate-900">1 — 3 месяца</p>
            </div>
            <p className="text-slate-500 text-sm mt-4 font-sans font-light">От первой встречи до запуска MVP</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 hover:bg-white/60 p-8 rounded-2xl flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] hover:border-white/80 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="text-4xl font-display font-bold text-blue-600/20 group-hover:text-blue-600/40 transition-colors duration-300 mb-6">{step.number}</div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-xs font-semibold text-blue-600 mb-4 uppercase tracking-wider">{step.duration}</p>
              <p className="text-slate-600 text-sm leading-relaxed font-sans font-light flex-grow">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
