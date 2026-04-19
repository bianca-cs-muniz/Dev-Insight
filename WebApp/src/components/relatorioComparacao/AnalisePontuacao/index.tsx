'use client';

import { Tipografias } from '@shared/components/tipografias';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

interface DevStats {
  username: string;
  pontuacao: {
    atividade: number;
    popularidade: number;
    qualidade: number;
    consistencia: number;
    stack: number;
  };
}

interface AnalisePontuacaoProps {
  dev1: DevStats;
  dev2: DevStats;
}

export const AnalisePontuacao = ({ dev1, dev2 }: AnalisePontuacaoProps) => {
  const metricas = [
    { subject: 'Atividade',    val1: dev1.pontuacao.atividade,    val2: dev2.pontuacao.atividade },
    { subject: 'Popularidade', val1: dev1.pontuacao.popularidade, val2: dev2.pontuacao.popularidade },
    { subject: 'Qualidade',    val1: dev1.pontuacao.qualidade,    val2: dev2.pontuacao.qualidade },
    { subject: 'Consistência', val1: dev1.pontuacao.consistencia, val2: dev2.pontuacao.consistencia },
    { subject: 'Stack',        val1: dev1.pontuacao.stack,        val2: dev2.pontuacao.stack },
  ];

  const radarData = metricas.map((m) => ({ subject: m.subject, A: m.val1, B: m.val2 }));

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <Tipografias.TextoMedio className="!text-black !leading-none">
            Análise de Pontuação
          </Tipografias.TextoMedio>
          <Tipografias.TextoPequenoSimples className="!text-[13px] !text-slate-600">
            Comparativo técnico detalhado
          </Tipografias.TextoPequenoSimples>
        </div>
        <div className="flex gap-4 text-sm font-semibold">
          <Tipografias.TextoPequeno className="!text-purple-700">@{dev1.username}</Tipografias.TextoPequeno>
          <Tipografias.TextoPequeno className="!text-blue-500">@{dev2.username}</Tipografias.TextoPequeno>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-10">
        
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Radar
                dataKey="A"
                stroke="#7B61FF"
                fill="#7B61FF"
                fillOpacity={0.5}
              />
              <Radar
                dataKey="B"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full flex flex-col gap-1">
          {metricas.map((m, i) => (
            <div key={m.subject} className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="uppercase tracking-wider">
                  <Tipografias.TextoPequeno className="!text-[12px]"> {m.subject}</Tipografias.TextoPequeno>
                </div>

                <div className="flex flex-col items-end leading-tight">
                  <div>
                    <Tipografias.TextoPequeno className="!text-[12px] !text-purple-700">{m.val1}</Tipografias.TextoPequeno>
                  </div>
                  <div>
                    <Tipografias.TextoPequeno className="!text-[12px] !text-blue-500">{m.val2}</Tipografias.TextoPequeno>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <div className="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${m.val1}%`, transitionDelay: `${i * 120}ms` }}
                  />
                </div>
                <div className="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${m.val2}%`, transitionDelay: `${i * 120 + 80}ms` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};