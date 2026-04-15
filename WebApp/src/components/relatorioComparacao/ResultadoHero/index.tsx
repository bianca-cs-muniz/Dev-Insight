'use client';

import { Trophy } from 'lucide-react';
import { alfa } from '@lib/fonts';

interface DevProps {
  nome: string;
  username: string;
  avatar: string;
  seguidores: number;
  repositorios: number;
  linguagemPrincipal: string;
  pontuacao: {
    atividade: number;
    popularidade: number;
    qualidade: number;
    consistencia: number;
    stack: number;
  };
}

interface ResultadoHeroProps {
  dev1: DevProps;
  dev2: DevProps;
}

export const ResultadoHero = ({ dev1, dev2 }: ResultadoHeroProps) => {
  const score1 = Math.round((dev1.pontuacao.atividade + dev1.pontuacao.popularidade + dev1.pontuacao.qualidade + dev1.pontuacao.consistencia + dev1.pontuacao.stack) / 5);
  const score2 = Math.round((dev2.pontuacao.atividade + dev2.pontuacao.popularidade + dev2.pontuacao.qualidade + dev2.pontuacao.consistencia + dev2.pontuacao.stack) / 5);
  
  const vencedor = score1 > score2 ? dev1 : dev2;

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="bg-yellow-100 p-3 rounded-full text-yellow-600 shadow-sm border border-yellow-200">
          <Trophy size={32} fill="currentColor" />
        </div>
        <h1 className={`${alfa.className} text-3xl md:text-4xl text-slate-900`}>
          @{vencedor.username} vence a comparação
        </h1>
        <p className="text-slate-500 font-medium max-w-md">
          Venceu por maior consistência e impacto nos repositórios
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 w-full">
        {/* Dev 1 Card */}
        <div className={`relative group flex-1 w-full max-w-sm bg-white/60 backdrop-blur-md rounded-[20px] p-8 border ${score1 > score2 ? 'border-purple-400 shadow-[0_20px_40px_-15px_rgba(123,97,255,0.2)]' : 'border-white/40 shadow-xl'}`}>
          {score1 > score2 && (
            <div className="absolute -top-4 -right-4 bg-purple-600 text-white p-2 rounded-xl shadow-lg animate-bounce">
              <Trophy size={16} />
            </div>
          )}
          <div className="flex flex-col items-center text-center gap-4">
            <div className={`p-1 rounded-full border-2 ${score1 > score2 ? 'border-purple-500' : 'border-slate-200'}`}>
              <img src={dev1.avatar} alt={dev1.nome} className="w-24 h-24 rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{dev1.nome}</h3>
              <p className="text-purple-600 font-semibold">@{dev1.username}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <div className="text-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Followers</p>
                <p className="text-slate-800 font-bold">{dev1.seguidores.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Repos</p>
                <p className="text-slate-800 font-bold">{dev1.repositorios}</p>
              </div>
            </div>
            <div className="w-full h-px bg-slate-100 my-2" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-slate-400 text-xs font-bold uppercase">Main Language</p>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-bold border border-purple-100">
                {dev1.linguagemPrincipal}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-5xl font-black text-purple-600">{score1}</p>
              <p className="text-xs font-bold text-slate-400 tracking-widest">PTS</p>
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="z-10 bg-white shadow-2xl border-4 border-[#F5FAFF] w-16 h-16 rounded-full flex items-center justify-center -my-8 md:my-0 md:-mx-8">
          <span className={`${alfa.className} text-xl bg-gradient-to-br from-purple-600 to-blue-500 bg-clip-text text-transparent`}>VS</span>
        </div>

        {/* Dev 2 Card */}
        <div className={`relative group flex-1 w-full max-w-sm bg-white/60 backdrop-blur-md rounded-[20px] p-8 border ${score2 > score1 ? 'border-blue-400 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)]' : 'border-white/40 shadow-xl'}`}>
          {score2 > score1 && (
            <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-2 rounded-xl shadow-lg animate-bounce">
              <Trophy size={16} />
            </div>
          )}
          <div className="flex flex-col items-center text-center gap-4">
            <div className={`p-1 rounded-full border-2 ${score2 > score1 ? 'border-blue-500' : 'border-slate-200'}`}>
              <img src={dev2.avatar} alt={dev2.nome} className="w-24 h-24 rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{dev2.nome}</h3>
              <p className="text-blue-600 font-semibold">@{dev2.username}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <div className="text-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Followers</p>
                <p className="text-slate-800 font-bold">{dev2.seguidores.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Repos</p>
                <p className="text-slate-800 font-bold">{dev2.repositorios}</p>
              </div>
            </div>
            <div className="w-full h-px bg-slate-100 my-2" />
            <div className="flex flex-col items-center gap-1">
              <p className="text-slate-400 text-xs font-bold uppercase">Main Language</p>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100">
                {dev2.linguagemPrincipal}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-5xl font-black text-blue-600">{score2}</p>
              <p className="text-xs font-bold text-slate-400 tracking-widest">PTS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
