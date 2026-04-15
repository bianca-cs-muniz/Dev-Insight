'use client';

import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

interface DevStats {
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
  const data = [
    { subject: 'Atividade', A: dev1.pontuacao.atividade, B: dev2.pontuacao.atividade, fullMark: 100 },
    { subject: 'Popularidade', A: dev1.pontuacao.popularidade, B: dev2.pontuacao.popularidade, fullMark: 100 },
    { subject: 'Qualidade', A: dev1.pontuacao.qualidade, B: dev2.pontuacao.qualidade, fullMark: 100 },
    { subject: 'Consistência', A: dev1.pontuacao.consistencia, B: dev2.pontuacao.consistencia, fullMark: 100 },
    { subject: 'Stack', A: dev1.pontuacao.stack, B: dev2.pontuacao.stack, fullMark: 100 },
  ];

  const metrics = [
    { label: 'Atividade', val1: dev1.pontuacao.atividade, val2: dev2.pontuacao.atividade },
    { label: 'Popularidade', val1: dev1.pontuacao.popularidade, val2: dev2.pontuacao.popularidade },
    { label: 'Qualidade', val1: dev1.pontuacao.qualidade, val2: dev2.pontuacao.qualidade },
    { label: 'Consistência', val1: dev1.pontuacao.consistencia, val2: dev2.pontuacao.consistencia },
    { label: 'Stack', val1: dev1.pontuacao.stack, val2: dev2.pontuacao.stack },
  ];

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-slate-800">Análise de Pontuação</h2>
        <p className="text-sm text-slate-500">Comparativo técnico detalhado</p>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-8">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
              <Radar
                name="Dev 1"
                dataKey="A"
                stroke="#7B61FF"
                fill="#7B61FF"
                fillOpacity={0.6}
              />
              <Radar
                name="Dev 2"
                dataKey="B"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full flex flex-col gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>{m.label}</span>
                <div className="flex gap-4">
                  <span className="text-purple-600">{m.val1}</span>
                  <span className="text-blue-600">{m.val2}</span>
                </div>
              </div>
              <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-purple-500 rounded-l-full transition-all duration-1000" 
                  style={{ width: `${(m.val1 / (m.val1 + m.val2)) * 100}%` }}
                />
                <div 
                  className="h-full bg-blue-500 rounded-r-full transition-all duration-1000" 
                  style={{ width: `${(m.val2 / (m.val1 + m.val2)) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-xs font-bold text-slate-600">Dev 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs font-bold text-slate-600">Dev 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
