'use client';

import { Lightbulb, ChevronRight } from 'lucide-react';

interface Insight {
  texto: string;
}

interface InsightsProps {
  insights: Insight[];
}

export const Insights = ({ insights }: InsightsProps) => {
  return (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#7B61FF] p-3 rounded-full text-white shadow-lg shadow-purple-100">
          <Lightbulb size={24} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-800">Insights</h2>
          <p className="text-sm text-slate-500 font-medium">Análise automática baseada nos dados</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-[#EFF1F6] hover:border-purple-200 hover:shadow-sm transition-all cursor-default"
          >
            <div className="flex-shrink-0 text-[#A0A5B0] group-hover:text-purple-400 transition-colors">
              <ChevronRight size={20} />
            </div>
            <p className="text-sm md:text-[15px] font-medium text-[#1A1D1F] leading-relaxed">
              {insight.texto}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
