'use client';

import { Crown } from 'lucide-react';

interface DevStats {
  username: string;
  avatar: string;
  starsTotais: number;
  forksTotais: number;
  seguidores: number;
  repositorios: number;
  commitsRecentes: number;
  linguagemPrincipal: string;
}

interface ComparacaoDiretaProps {
  dev1: DevStats;
  dev2: DevStats;
}

export const ComparacaoDireta = ({ dev1, dev2 }: ComparacaoDiretaProps) => {
  const rows = [
    { label: 'Stars Totais', val1: dev1.starsTotais, val2: dev2.starsTotais, format: (v: number) => v.toLocaleString() },
    { label: 'Forks Totais', val1: dev1.forksTotais, val2: dev2.forksTotais, format: (v: number) => v.toLocaleString() },
    { label: 'Seguidores', val1: dev1.seguidores, val2: dev2.seguidores, format: (v: number) => v.toLocaleString() },
    { label: 'Repositórios', val1: dev1.repositorios, val2: dev2.repositorios, format: (v: number) => v },
    { label: 'Commits Recentes', val1: dev1.commitsRecentes, val2: dev2.commitsRecentes, format: (v: number) => v },
    { label: 'Linguagem Principal', val1: dev1.linguagemPrincipal, val2: dev2.linguagemPrincipal, format: (v: string) => v, isString: true },
  ];

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <div className="flex flex-col gap-1 !mb-8">
        <h2 className="text-xl font-bold text-slate-800">Comparação Direta</h2>
        <p className="text-sm text-slate-500">Métricas frente a frente</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Métrica</th>
              <th className="text-center pb-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-0.5 rounded-full border border-purple-200">
                    <img src={dev1.avatar} alt={dev1.username} className="w-8 h-8 rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-purple-600">@{dev1.username}</span>
                </div>
              </th>
              <th className="text-center pb-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-0.5 rounded-full border border-blue-200">
                    <img src={dev2.avatar} alt={dev2.username} className="w-8 h-8 rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-blue-600">@{dev2.username}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((row) => {
              const win1 = !row.isString && (row.val1 as number) > (row.val2 as number);
              const win2 = !row.isString && (row.val2 as number) > (row.val1 as number);
              
              return (
                <tr key={row.label} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 text-sm font-medium text-slate-600">{row.label}</td>
                  <td className="py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-sm font-bold ${win1 ? 'text-purple-600' : 'text-slate-400'}`}>
                        {row.format(row.val1 as any)}
                      </span>
                      {win1 && <Crown size={14} className="text-yellow-500 fill-yellow-500" />}
                    </div>
                  </td>
                  <td className="py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-sm font-bold ${win2 ? 'text-blue-600' : 'text-slate-400'}`}>
                        {row.format(row.val2 as any)}
                      </span>
                      {win2 && <Crown size={14} className="text-yellow-500 fill-yellow-500" />}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
