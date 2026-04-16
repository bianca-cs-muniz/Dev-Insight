'use client';

import { Tipografias } from '@shared/components/tipografias';
import { Star } from 'lucide-react';

interface Projeto {
  nome: string;
  stars: string;
  descricao: string;
  linguagem: string;
}

interface DevStats {
  username: string;
  projetosDestaque: Projeto[];
}

interface ProjetosDestaqueProps {
  dev1: DevStats;
  dev2: DevStats;
}

export const ProjetosDestaque = ({ dev1, dev2 }: ProjetosDestaqueProps) => {
  const renderProjects = (dev: DevStats, isDev1: boolean) => (
    <div className="flex flex-col gap-2 w-full !mt-4">
      <div className="flex items-center">
        <div className={`uppercase tracking-widest`}>
          <Tipografias.TextoPequeno className={`${isDev1 ? '!text-purple-700' : '!text-blue-600'}`} >Projetos de @{dev.username} </Tipografias.TextoPequeno>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {dev.projetosDestaque.map((project) => (
          <div 
            key={project.nome} 
            className="group !bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-slate-800 group-hover:text-purple-700 transition-colors uppercase text-sm tracking-tight">{project.nome}</h4>
              <div className="flex items-center gap-1 text-yellow-500 px-2 py-1">
                <Star size={12} fill="currentColor" />
                <Tipografias.TextoPequeno className={`!leading-none ${  isDev1 ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-600'}`}>{project.stars}</Tipografias.TextoPequeno>
              </div>
            </div>
            <div className="mb-4 line-clamp-2 leading-relaxed">
              <Tipografias.TextoPequenoSimples className="!leading-[18px]">{project.descricao}</Tipografias.TextoPequenoSimples>
              <Tipografias.TextoPequeno className={`!leading-[25px] !text-[12px] !uppercase !${isDev1 ? 'text-purple-700' : 'text-blue-600'}`}>{project.linguagem}</Tipografias.TextoPequeno>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
  <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
    <div className="flex flex-col">
      <Tipografias.TextoMedio className="!text-black !leading-none"> Projetos em Destaque </Tipografias.TextoMedio>
      <Tipografias.TextoPequenoSimples className="!text-[13px] !text-slate-600"> Principais contribuições e repositórios </Tipografias.TextoPequenoSimples>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        {renderProjects(dev1, true)}
        {renderProjects(dev2, false)}
      </div>
    </div>
  );
};
