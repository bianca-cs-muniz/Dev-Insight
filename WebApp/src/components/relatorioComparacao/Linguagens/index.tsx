'use client';

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
  const renderDonut = (dev: DevStats, colorOffset: number) => (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-full h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dev.linguagens}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="porcentagem"
            >
              {dev.linguagens.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[(index + colorOffset) % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top 1</span>
          <span className="text-sm font-black text-slate-700">{dev.linguagens[0].nome}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 w-full max-w-[200px]">
        {dev.linguagens.map((lang, index) => (
          <div key={lang.nome} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: COLORS[(index + colorOffset) % COLORS.length] }} 
              />
              <span className="text-sm font-medium text-slate-600">{lang.nome}</span>
            </div>
            <span className="text-xs font-bold text-slate-400">{lang.porcentagem}%</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-slate-800">Linguagens</h2>
        <p className="text-sm text-slate-500">Distribuição tecnológica</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-bold text-purple-600 px-3 py-1 bg-purple-50 rounded-full border border-purple-100">
            @{dev1.username}
          </span>
          {renderDonut(dev1, 0)}
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
            @{dev2.username}
          </span>
          {renderDonut(dev2, 1)}
        </div>
      </div>
    </div>
  );
};
