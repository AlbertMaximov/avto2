import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-slate-900 text-slate-400 border-t border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Info */}
        <div className="flex flex-col gap-1.5 text-center md:text-left">
          <span className="font-display font-bold text-white text-base tracking-wide">
            AI-проекты для автодилеров
          </span>
          <span className="text-xs text-slate-500 font-sans font-light">
            Разработка и внедрение искусственного интеллекта нового поколения. © {new Date().getFullYear()}
          </span>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-slate-400 font-sans">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span>Москва, Россия</span>
          </div>
          <a href="tel:+79373828282" className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors">
            <Phone className="w-3.5 h-3.5 text-blue-500" />
            <span>+7 937 3828282</span>
          </a>
          <a href="mailto:info@aimaks.ru" className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <span>info@aimaks.ru</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
