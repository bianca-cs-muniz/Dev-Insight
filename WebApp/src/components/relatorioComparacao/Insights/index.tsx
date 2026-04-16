'use client';

import { Tipografias } from '@shared/components/tipografias';
import { Lightbulb, ChevronRight } from 'lucide-react';

interface Insight {
  texto: string;
}

interface InsightsProps {
  insights: Insight[];
}

export const Insights = ({ insights }: InsightsProps) => {
  return (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <div className="flex items-center gap-4 !mb-5">
        <div className="bg-[#7B61FF] p-3 rounded-full text-white shadow-lg shadow-purple-100">
          <Lightbulb size={24} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <Tipografias.TextoMedio className="!text-black !leading-none"> Insights </Tipografias.TextoMedio>
          <Tipografias.TextoPequenoSimples className="!text-[13px] !text-slate-600"> Análise automática baseada nos dados </Tipografias.TextoPequenoSimples>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-[#EFF1F6] hover:bg-purple-50 transition-all cursor-default"
          >
            <div className="flex-shrink-0 text-[#A0A5B0] group-hover:text-purple-700 transition-colors">
              <ChevronRight size={20} />
            </div>
            <Tipografias.TextoPequenoSimples className="!text-slate-600 !leading-[22px] !text-[14px]">
              {insight.texto}
            </Tipografias.TextoPequenoSimples>
          </div>
        ))}
      </div>
    </div>
  );
};
