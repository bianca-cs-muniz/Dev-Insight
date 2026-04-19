'use client';

import { useState, useEffect } from 'react';
import { Tipografias } from '@shared/components/tipografias';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Language {
  nome: string;
  porcentagem: number;
}

interface DevStats {
  username: string;
  linguagens: Language[];
}

interface LinguagensProps {
  dev1: DevStats;
  dev2: DevStats;
}

const COLORS = ['#7B61FF', '#3B82F6', '#6FDAA8', '#FFC542', '#FF8A4C', '#A0A5B0'];

export const Linguagens = ({ dev1, dev2 }: LinguagensProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderDonut = (dev: DevStats, colorOffset: number) => (
    <div className="flex items-center gap-6 w-full">
      
      {/* GRÁFICO */}
      <div className="w-[200px] h-[200px] relative shrink-0">
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dev.linguagens}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="porcentagem"
            >
              {dev.linguagens.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[(index + colorOffset) % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        )}

        {/* CENTRO */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <Tipografias.TextoPequeno>Top 1</Tipografias.TextoPequeno>
          <Tipografias.TextoPequeno16 className="!text-black !leading-[20px]">
            {dev.linguagens[0].nome}
          </Tipografias.TextoPequeno16>
        </div>
      </div>

      {/* LEGENDA */}
      <div className="flex flex-col gap-2 w-full max-w-[200px]">
        {dev.linguagens.map((lang, index) => (
          <div key={lang.nome} className="flex items-center justify-between">
            
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[(index + colorOffset) % COLORS.length],
                }}
              />
              <Tipografias.TextoPequeno className="!text-slate-600 !leading-[22px]">
                {lang.nome}
              </Tipografias.TextoPequeno>
            </div>

            <Tipografias.TextoPequeno className="!text-slate-600 !leading-[22px]">
              {lang.porcentagem}%
            </Tipografias.TextoPequeno>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Tipografias.TextoMedio className="!text-black !leading-none"> Linguagens </Tipografias.TextoMedio>
        <Tipografias.TextoPequenoSimples className="!text-[13px] !text-slate-600"> Distribuição tecnológica </Tipografias.TextoPequenoSimples>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-start gap-4">
          <div className="px-3 py-1 bg-purple-50 rounded-full border border-purple-700">
            <Tipografias.TextoPequeno className="!text-purple-700 !leading-none">@{dev1.username}</Tipografias.TextoPequeno>
          </div>
          {renderDonut(dev1, 0)}
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="px-3 py-1 bg-blue-50 rounded-full border border-blue-700">
            <Tipografias.TextoPequeno className="!text-blue-600 !leading-none">@{dev2.username}</Tipografias.TextoPequeno>
          </div>
          {renderDonut(dev2, 1)}
        </div>
      </div>
    </div>
  );
};
