import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Image, X, FileCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const assets = [
    {
      id: 'hero_bg',
      title: 'Фон первого экрана (Showroom Background)',
      path: '/images/hero_bg.jpg',
      aspect: '16:9',
      resolution: '1920x1080',
      description: 'Абстрактный премиальный фон автосалона в стиле high-tech.'
    },
    {
      id: 'hero_image',
      title: 'Главный баннер (Hero Showroom EV)',
      path: '/images/hero_image.jpg',
      aspect: '16:9',
      resolution: '1920x1080',
      description: 'Премиальный электромобиль будущего на подиуме с голографическим светом.'
    },
    {
      id: 'call_quality',
      title: 'Контроль качества (AI Call Quality)',
      path: '/images/call_quality.jpg',
      aspect: '4:3',
      resolution: '1024x768',
      description: 'Анализ телефонных разговоров нейросетью в реальном времени.'
    },
    {
      id: 'car_seller',
      title: 'AI-Продавец (AI 24/7 Car Seller)',
      path: '/images/car_seller.jpg',
      aspect: '4:3',
      resolution: '1024x768',
      description: 'Интерактивный терминал с виртуальным ИИ-консультантом.'
    },
    {
      id: 'car_finder',
      title: 'AI-Подборщик (AI Smart Finder)',
      path: '/images/car_finder.jpg',
      aspect: '4:3',
      resolution: '1024x768',
      description: 'Умный интерфейс сайта с подбором авто по свободному описанию.'
    },
    {
      id: 'service_assistant',
      title: 'AI-Ассистент сервиса (AI Service Assistant)',
      path: '/images/service_assistant.jpg',
      aspect: '4:3',
      resolution: '1024x768',
      description: 'Мастер-приемщик с планшетом ИИ-диагностики на СТО будущего.'
    }
  ];

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <footer className="py-12 bg-slate-900 text-slate-400 border-t border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <span className="font-display font-bold text-white text-base tracking-wide">
              AI-проекты для автодилеров
            </span>
            <span className="text-xs text-slate-500 font-sans font-light">
              Разработка и внедрение искусственного интеллекта нового поколения. © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            {/* Download Gallery Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white px-5 py-2.5 rounded-xl font-display font-semibold text-xs tracking-wide transition-all duration-300 border border-blue-500/20 shadow-sm hover:shadow-[0_8px_25px_-5px_rgba(37,99,235,0.3)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Скачать медиа-ресурсы сайта
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Overlay / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden relative z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Image className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg leading-tight">
                      Медиа-ресурсы сайта
                    </h3>
                    <p className="text-xs text-slate-400 font-sans font-light mt-0.5">
                      Скачайте оригинальные JPG-изображения высокого качества в один клик.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-rose-500/15 text-slate-400 hover:text-rose-400 border border-slate-700/60 flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid Content */}
              <div className="p-6 overflow-y-auto flex-1 bg-slate-900/50">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assets.map((asset) => (
                    <motion.div
                      key={asset.id}
                      whileHover={{ y: -4 }}
                      className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-4 group/card hover:border-slate-700 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Thumbnail wrapper */}
                      <div className="rounded-xl overflow-hidden bg-slate-900 aspect-[16/10] border border-slate-800 flex items-center justify-center relative shadow-inner">
                        <img
                          src={asset.path}
                          alt={asset.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        />
                        {/* Aspect / Resolution Badges */}
                        <div className="absolute bottom-2.5 left-2.5 flex gap-1.5">
                          <span className="px-2 py-0.5 bg-slate-950/75 backdrop-blur-md rounded-md text-[10px] font-mono font-medium text-slate-300 border border-white/5 uppercase">
                            {asset.aspect}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-950/75 backdrop-blur-md rounded-md text-[10px] font-mono font-medium text-blue-400 border border-blue-500/10">
                            {asset.resolution}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col gap-1">
                        <h4 className="font-display font-semibold text-white text-xs leading-tight tracking-wide line-clamp-1">
                          {asset.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-sans font-light leading-relaxed line-clamp-2">
                          {asset.description}
                        </p>
                      </div>

                      {/* Download Buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button
                          onClick={() => handleDownload(asset.path, `${asset.id}.jpg`)}
                          className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-display font-semibold transition-all duration-300 hover:shadow-[0_4px_15px_rgba(37,99,235,0.3)] cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          Скачать
                        </button>
                        <a
                          href={asset.path}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-display font-semibold border border-slate-700/60 transition-all duration-300 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Открыть
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[11px] text-slate-500 flex items-center gap-1.5 font-sans">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Все изображения сохранены локально в директории <code className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[10px] text-blue-400">/public/images/</code>
                </span>
                <span className="text-[11px] text-slate-500 font-sans">
                  Вы можете скачать весь проект в ZIP в меню настроек.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
