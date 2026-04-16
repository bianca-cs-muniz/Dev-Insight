'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Tipografias } from '../tipografias';

interface Props {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export const Snackbar = ({ message, onClose, duration = 5000 }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for fade-out animation
  };

  if (!message && !isVisible) return null;

  return (
    <div
      className={`
        fixed bottom-6 left-6 z-[110]
        flex items-center gap-3 px-5 py-3 
        bg-white/90 dark:bg-gray-900/90 backdrop-blur-md 
        border border-red-100 dark:border-red-900/30
        rounded-2xl shadow-2xl shadow-red-500/10
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
      `}
    >
      <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
        <AlertCircle className="w-5 h-5 text-red-500" />
      </div>

      <div className="flex flex-col pr-6">
        <Tipografias.TextoPequeno className="!text-red-600 !font-bold">
          Erro na Busca
        </Tipografias.TextoPequeno>
        <span className="text-xs text-slate-500 dark:text-slate-600 font-medium">
          {message}
        </span>
      </div>

      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
      >
        <X className="w-3.5 h-3.5 text-slate-600" />
      </button>
    </div>
  );
}
