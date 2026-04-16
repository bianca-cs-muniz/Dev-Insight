'use client';

import { useState } from 'react';
import { alfa } from '@lib/fonts';
import { Tipografias } from '@shared/components/tipografias';
import { AtSign, GitCompare, Shuffle } from 'lucide-react';

export const Comparar = ({ onCompare }: { onCompare: () => void }) => {
  const [dev1, setDev1] = useState('');
  const [dev2, setDev2] = useState('');

  return (
  <div className="flex flex-col items-center w-full !mt-5 max-w-6xl px-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="w-full bg-white/70 backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/40 relative overflow-hidden">      
        <div className="flex items-center gap-4 !mb-5">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7927fd] to-[#6432f9] rounded-2xl blur-xl opacity-40 animate-pulse" />
            <div className="relative bg-gradient-to-br from-[#7927fd] to-[#6432f9] p-3 rounded-2xl shadow-2xl">
              <GitCompare className=" text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className={`${alfa.className} text-4xl md:text-1xl lg:text-2xl text-slate-900 tracking-tight`}>
            Comparar Perfis
            </p>
            <Tipografias.TextoPequeno className="!text-slate-500 !leading-none">
            Insira dois usernames do GitHub para comparar
            </Tipografias.TextoPequeno>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4 relative z-10">
          <div className="flex-1 w-full flex flex-col gap-2 !mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <label className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                DESENVOLVEDOR 1
              </label>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                <AtSign size={18} />
              </div>
              <input
                type="text"
                placeholder="Primeiro Usuario..."
                value={dev1}
                onChange={(e) => setDev1(e.target.value)}
                className="w-full pl-10 pr-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-purple-400 outline-none transition-all text-slate-700 placeholder:text-slate-300 font-medium"
              />
            </div>
          </div>

          <button className="group !mt-5 flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center hover:shadow-purple-100 transition-all active:scale-95">
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <linearGradient id="shuffle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <Shuffle size={18} stroke="url(#shuffle-gradient)" />
          </button> 

          <div className="flex-1 w-full flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <label className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                DESENVOLVEDOR 2
              </label>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
                <AtSign size={18} />
              </div>
              <input
                type="text"
                placeholder="Segundo Usuario..."
                value={dev2}
                onChange={(e) => setDev2(e.target.value)}
                className="w-full pl-10 pr-6 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-300 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="!mt-9 flex justify-center">
          <button 
            onClick={onCompare}
            className="group relative w-full md:w-auto min-w-[340px] cursor-pointer"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative px-8 py-5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl text-white font-bold text-lg shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 group-hover:brightness-90 transition-all">
              <GitCompare size={20}/>
              Comparar Agora
            </div>
          </button>
        </div>
    </div>
  </div>
  );
};
