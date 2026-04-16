'use client';

import { Tipografias } from '@shared/components/tipografias';
import { Flame, Star, Calendar, Trophy, Brain } from 'lucide-react';

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

  const BadgeCard = ({ icon: Icon, color, title, subtitle, winnerUsername, backgroundColor }: { icon: any, color: string, title: string, subtitle: string, winnerUsername: string, backgroundColor: string }) => {
    const winner = getWinner(winnerUsername);
    const isEmpate = winnerUsername === 'empate';

    return (
      <div className={`rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4 flex-1`} style={{ backgroundColor: backgroundColor, borderColor: color }}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl text-white shadow-lg`} style={{ backgroundColor: color }}>
            <Icon size={24} fill="white" />
          </div>
          <div className="flex flex-col">
            <Tipografias.TextoMedio className="!text-black !leading-none !text-[18px]">{title}</Tipografias.TextoMedio>
            <Tipografias.TextoPequenoSimples className="!leading-[18px]">{subtitle}</Tipografias.TextoPequenoSimples>
          </div>
        </div>

        <div className="px-2 py-1 bg-white rounded-full flex items-center justify-between w-full">
          {isEmpate ? (
            <div className="px-2 py-1 uppercase">
              <Tipografias.TextoPequeno className="!leading-[18px]">
                Empate
              </Tipografias.TextoPequeno>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 px-2 py-1">
                <img
                  src={winner?.avatar}
                  alt={winner?.username}
                  className="w-6 h-6 rounded-full border border-slate-200"
                />
                <Tipografias.TextoPequeno className="!leading-[18px]">
                  @{winner?.username}
                </Tipografias.TextoPequeno>
              </div>

              <Trophy size={14} className="text-yellow-500 fill-yellow-500 shrink-0" />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex flex-col">
        <Tipografias.TextoMedio className="!text-black !leading-none"> Badges </Tipografias.TextoMedio>
        <Tipografias.TextoPequenoSimples className="!text-[13px] !text-slate-600"> Conquistas individuais por categoria </Tipografias.TextoPequenoSimples>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-full">
        <BadgeCard 
          icon={Flame} 
          color="#FF8A4C"
          backgroundColor='#f6f5f3'
          title="Mais Ativo" 
          subtitle="Maior frequência de commits" 
          winnerUsername={badges.maisAtivo} 
        />
        <BadgeCard 
          icon={Star} 
          color="#FFC542" 
          backgroundColor='#f0f7f0'
          title="Mais Influente" 
          subtitle="Maior número de stars" 
          winnerUsername={badges.maisInfluente} 
        />
        <BadgeCard 
          icon={Brain} 
          color="#6FDAA8" 
          backgroundColor='#e5f9f8'
          title="Mais Consistente" 
          subtitle="Maior número de repositórios" 
          winnerUsername={badges.maisConsistente} 
        />
      </div>
    </div>
  );
};
