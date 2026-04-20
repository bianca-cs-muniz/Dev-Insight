'use client';

import { Tipografias } from '@shared/components/tipografias';
import { Zap, BookOpen } from 'lucide-react';

interface Props {
  repos: any[];
  atividadeScore: number;
}

export const CardEsforco = ({ repos, atividadeScore }: Props) => {
  const linguagensUnicas = new Set(repos.map(r => r.language).filter(Boolean)).size;
  const nivelEstudo = linguagensUnicas > 8 ? 'Explorador' : linguagensUnicas > 4 ? 'Focado' : 'Iniciante';

  return (
    <div className="rounded-2xl shadow-md bg-white/80 backdrop-blur-sm border border-purple-100 p-6 flex flex-col gap-4">
      <div className="flex flex-col">
        <Tipografias.TextoPequeno16 className='!text-black !leading-none'>Ritmo e Estudo</Tipografias.TextoPequeno16>
        <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>Análise de produtividade e aprendizado</Tipografias.TextoPequenoSimples>
      </div>

      <div className="flex flex-col gap-5 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Zap size={20} />
            </div>
            <div className="flex flex-col">
              <Tipografias.TextoPequenoSimples className="!text-[14px] !font-bold !text-slate-700">Ritmo de Trabalho</Tipografias.TextoPequenoSimples>
              <Tipografias.TextoPequenoSimples className="!text-[12px] !text-slate-500">Frequência diária de commits</Tipografias.TextoPequenoSimples>
            </div>
          </div>
          <Tipografias.TextoPequeno className="!text-lg !font-black !text-amber-600">{atividadeScore}%</Tipografias.TextoPequeno>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <BookOpen size={20} />
              </div>
              <div className="flex flex-col">
                <Tipografias.TextoPequenoSimples className="!text-[14px] !font-bold !text-slate-700">Diversidade de Estudo</Tipografias.TextoPequenoSimples>
                <Tipografias.TextoPequenoSimples className="!text-[12px] !text-slate-500">Tecnologias dominadas ({nivelEstudo})</Tipografias.TextoPequenoSimples>
              </div>
            </div>
            <Tipografias.TextoPequeno className="!text-lg !font-black !text-purple-700">{linguagensUnicas} Stacks</Tipografias.TextoPequeno>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(linguagensUnicas * 10, 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
