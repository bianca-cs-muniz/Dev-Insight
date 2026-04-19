'use client';

import { useState, useEffect } from 'react';
import { Tipografias } from '@shared/components/tipografias';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

interface Props {
  scoreData: {
    score: number;
    nivel: string;
    breakdown: Record<string, number>;
  };
}

export const Score = ({ scoreData }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const porcentagem = scoreData.score;

  const dadosGrafico = [
    { value: 100, fill: '#f3e8ff' },
    { value: porcentagem, fill: 'url(#scoreGradient)' },
  ];

  return (
    <div className="rounded-2xl shadow-md bg-white/80 backdrop-blur-sm border border-purple-100 p-6 flex flex-col">

      <div>
        <Tipografias.TextoPequeno16 className='!text-black !leading-none'>Dev Score</Tipografias.TextoPequeno16>
        <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>Pontuação baseada na atividade</Tipografias.TextoPequenoSimples>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-40 h-40">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="100%"
              startAngle={225}
              endAngle={-45}
              barSize={14}
              data={dadosGrafico }
            >
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <RadialBar background dataKey="value" cornerRadius={8} />
            </RadialBarChart>
          </ResponsiveContainer>
          )}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <Tipografias.Titulo className='!text-black !text-3xl !leading-none !font-black'>
            {scoreData.score}
          </Tipografias.Titulo>
          <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>/ 100</Tipografias.TextoPequenoSimples>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="flex flex-col items-center gap-1 ">
          <Tipografias.Titulo className='!text-transparent !bg-clip-text !bg-gradient-to-br !from-purple-500 !to-indigo-500 !text-2xl !leading-none !font-black'>
            {scoreData.nivel}
          </Tipografias.Titulo>
          <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>Classificação</Tipografias.TextoPequenoSimples>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-50 flex flex-col gap-2">
        <div className="flex justify-between text-xs text-slate-600">
          <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>Estrelas</Tipografias.TextoPequenoSimples>
          <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>{scoreData.breakdown.estrelas}%</Tipografias.TextoPequenoSimples>
        </div>
        
        <div className="h-1.5 rounded-full bg-purple-50 overflow-hidden">
          <div className="h-full rounded-full bg-purple-400" style={{ width: `${scoreData.breakdown.estrelas}%` }}/>
        </div>
        
        <div className="flex justify-between text-xs text-slate-600">
          <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>Seguidores</Tipografias.TextoPequenoSimples>
          <Tipografias.TextoPequenoSimples className='!text-[13px] !text-slate-600'>{scoreData.breakdown.seguidores}%</Tipografias.TextoPequenoSimples>
        </div>
        
        <div className="h-1.5 rounded-full bg-purple-50 overflow-hidden">
          <div className="h-full rounded-full bg-indigo-400" style={{ width: `${scoreData.breakdown.seguidores}%` }}/>
        </div>
      </div>
    </div>
  );
}

