'use client';

import { Tipografias } from '@shared/components/tipografias';
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
      <div className="flex flex-col">
        <Tipografias.TextoMedio className="!text-black !leading-none"> Comparação Direta </Tipografias.TextoMedio>
        <Tipografias.TextoPequenoSimples className="!text-[13px] !text-slate-600"> Métricas frente a frente </Tipografias.TextoPequenoSimples>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left !pt-8 pb-4 uppercase tracking-widest">
                <Tipografias.TextoPequeno className="!text-slate-600 !leading-none">Métricas</Tipografias.TextoPequeno>
              </th>
              <th className="text-center pb-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-0.5 rounded-full border border-purple-200">
                    <img src={dev1.avatar} alt={dev1.username} className="w-8 h-8 rounded-full" />
                  </div>
                  <Tipografias.TextoPequeno className="!text-purple-700 !leading-none">@{dev1.username}</Tipografias.TextoPequeno>
                </div>
              </th>
              <th className="text-center pb-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-0.5 rounded-full border border-blue-200">
                    <img src={dev2.avatar} alt={dev2.username} className="w-8 h-8 rounded-full" />
                  </div>
                  <Tipografias.TextoPequeno className="!text-blue-600 !leading-none">@{dev2.username}</Tipografias.TextoPequeno>
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
                  <td className="py-5 text-sm font-medium text-slate-600">
                    <Tipografias.TextoPequeno className="!text-slate-600 !leading-none">{row.label}</Tipografias.TextoPequeno>
                  </td>
                  <td className="py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div>
                        <Tipografias.TextoPequeno className={`!${win1 ? 'text-purple-700' : 'text-slate-600'}`}>{row.val1}</Tipografias.TextoPequeno>
                      </div>
                      {win1 && <Crown size={14} className="text-yellow-500 fill-yellow-500" />}
                    </div>
                  </td>
                  <td className="py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div>
                        <Tipografias.TextoPequeno className={`!${win2 ? 'text-blue-600' : 'text-slate-600'}`}>{row.val2}</Tipografias.TextoPequeno>
                      </div>
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
