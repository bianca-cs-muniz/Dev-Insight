'use client';

import { Flame, Star, Calendar, Trophy } from 'lucide-react';

interface DevStats {
  username: string;
  avatar: string;
}

interface BadgesProps {
  badges: {
    maisAtivo: string;
    maisInfluente: string;
    maisConsistente: string;
  };
  dev1: DevStats;
  dev2: DevStats;
}

export const Badges = ({ badges, dev1, dev2 }: BadgesProps) => {
  const getWinner = (username: string) => {
    if (username === dev1.username) return dev1;
    if (username === dev2.username) return dev2;
    return null;
  };

  const BadgeCard = ({ 
    icon: Icon, 
    color, 
    title, 
    subtitle, 
    winnerUsername 
  }: { 
    icon: any, 
    color: string, 
    title: string, 
    subtitle: string, 
    winnerUsername: string 
  }) => {
    const winner = getWinner(winnerUsername);
    const isEmpate = winnerUsername === 'empate';

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl text-white shadow-lg`} style={{ backgroundColor: color }}>
            <Icon size={24} fill="white" />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
            <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          {isEmpate ? (
            <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Empate
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img src={winner?.avatar} alt={winner?.username} className="w-6 h-6 rounded-full border border-slate-200" />
                <span className="text-xs font-bold text-slate-600">@{winner?.username}</span>
              </div>
              <Trophy size={14} className="text-yellow-500 fill-yellow-500" />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-slate-800">Badges</h2>
        <p className="text-sm text-slate-500 font-medium">Conquistas individuais por categoria</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-full">
        <BadgeCard 
          icon={Flame} 
          color="#FF8A4C" 
          title="Mais Ativo" 
          subtitle="Maior frequência de commits" 
          winnerUsername={badges.maisAtivo} 
        />
        <BadgeCard 
          icon={Star} 
          color="#FFC542" 
          title="Mais Influente" 
          subtitle="Maior número de stars" 
          winnerUsername={badges.maisInfluente} 
        />
        <BadgeCard 
          icon={Calendar} 
          color="#6FDAA8" 
          title="Mais Consistente" 
          subtitle="Maior número de repositórios" 
          winnerUsername={badges.maisConsistente} 
        />
      </div>
    </div>
  );
};
