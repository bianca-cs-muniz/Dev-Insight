'use client';

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
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold uppercase tracking-widest ${isDev1 ? 'text-purple-600' : 'text-blue-600'}`}>
          Projetos de @{dev.username}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {dev.projetosDestaque.map((project) => (
          <div 
            key={project.nome} 
            className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors uppercase text-sm tracking-tight">{project.nome}</h4>
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                <Star size={12} fill="currentColor" />
                {project.stars}
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed font-medium">
              {project.descricao}
            </p>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${isDev1 ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
              {project.linguagem}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-xl font-bold text-slate-800">Projetos em Destaque</h2>
        <p className="text-sm text-slate-500">Principais contribuições e repositórios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        {renderProjects(dev1, true)}
        {renderProjects(dev2, false)}
      </div>
    </div>
  );
};
