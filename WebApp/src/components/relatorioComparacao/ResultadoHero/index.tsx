'use client';

import { Trophy, Crown } from 'lucide-react';
import { alfa } from '@lib/fonts';
import { Tipografias } from '@shared/components/tipografias';

interface DevProps {
  nome: string;
  username: string;
  avatar: string;
  seguidores: number;
  repositorios: number;
  linguagemPrincipal: string;
  pontuacao: {
    atividade: number;
    popularidade: number;
    qualidade: number;
    consistencia: number;
    stack: number;
  };
}

interface ResultadoHeroProps {
  dev1: DevProps;
  dev2: DevProps;
}

export const ResultadoHero = ({ dev1, dev2 }: ResultadoHeroProps) => {
  const score1 = Math.round(
    (dev1.pontuacao.atividade +
      dev1.pontuacao.popularidade +
      dev1.pontuacao.qualidade +
      dev1.pontuacao.consistencia +
      dev1.pontuacao.stack) / 5
  );

  const score2 = Math.round(
    (dev2.pontuacao.atividade +
      dev2.pontuacao.popularidade +
      dev2.pontuacao.qualidade +
      dev2.pontuacao.consistencia +
      dev2.pontuacao.stack) / 5
  );

  const vencedor = score1 > score2 ? dev1 : dev2;
  const isDev1Winner = vencedor.username === dev1.username;

  return (
    <div className="w-full">
      <div className="w-full bg-[#f6f2ff] rounded-t-[20px]">
        <div className="max-w-6xl  bamx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-orange-400 text-white p-3 rounded-xl shadow-[0_0_12px_rgba(251,146,60,0.6)]">
              <Trophy size={25} />
            </div>

            <div>
              <h1 className={`${alfa.className} text-xl text-purple-600 flex items-center gap-2`}>
                🏆 @{vencedor.username} <p className="text-black">vence a comparação</p>
              </h1>
              <Tipografias.TextoPequeno> Venceu por maior consistência e impacto nos repositórios </Tipografias.TextoPequeno>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold border border-yellow-600 bg-yellow-100">
            <Crown size={14} className='text-yellow-600'/>
            <Tipografias.TextoPequeno className='!text-yellow-600'> 3/5 critérios </Tipografias.TextoPequeno>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <div className="w-full max-w-6xl bg-white rounded-b-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-6">

          <div className="flex justify-center items-center gap-8">
            <div className="text-center flex flex-col items-center">
                <Tipografias.Titulo className='!text-purple-600'>{score1}</Tipografias.Titulo>
                <Tipografias.TextoPequeno className='!text-[12px] !leading-[14px] '>PTS · A</Tipografias.TextoPequeno>
                <Tipografias.TextoPequeno className='!text-purple-600'> @{dev1.username}</Tipografias.TextoPequeno>
            </div>

            <Tipografias.TextoPequeno className='!text-[20px]'>vs</Tipografias.TextoPequeno>

             <div className="text-center flex flex-col items-center">
              <Tipografias.Titulo className='!text-blue-600'>{score2}</Tipografias.Titulo>
              <Tipografias.TextoPequeno className='!text-[12px] !leading-[14px] '>PTS · A</Tipografias.TextoPequeno>
              <Tipografias.TextoPequeno className='!text-blue-600'> @{dev2.username}</Tipografias.TextoPequeno>
            </div>
          </div>

          {/* PERFIS */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">

            {/* DEV 1 */}
            <div className="flex flex-col items-center text-center gap-4 w-full max-w-sm">
              <div className="relative">
                <img src={dev1.avatar} className="w-24 h-24 rounded-full border-4 border-purple-300"/>
                {isDev1Winner && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow">
                    <Crown size={16} className="text-white" />
                  </div>
                )}
              </div>

              <div>
                <Tipografias.TextoMedio className='!text-black'>{dev1.nome}</Tipografias.TextoMedio>             
                <div className=" w-full rounded-full border text-purple-600 border-purple-600 bg-purple-50">
                  <Tipografias.TextoPequeno className='!text-purple-600'> @{dev1.username}</Tipografias.TextoPequeno>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <Metric
                  label="Seguidores"
                  value={dev1.seguidores.toLocaleString()}
                  highlight={dev1.seguidores > dev2.seguidores}
                />
                <Metric
                  label="Repos"
                  value={dev1.repositorios}
                  highlight={dev1.repositorios > dev2.repositorios}
                />
                <Metric
                  label="Linguagem"
                  value={dev1.linguagemPrincipal}
                />
              </div>
            </div>

            {/* VS */}
            <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-purple-400 to-blue-500 shadow-md">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-slate-600">
                VS
              </div>
            </div>

            {/* DEV 2 */}
            <div className="flex flex-col items-center text-center gap-4 w-full max-w-sm">
              <div className="relative">
                <img src={dev2.avatar} className="w-24 h-24 rounded-full border-4 border-blue-300"/>
                {!isDev1Winner && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow">
                    <Crown size={14} className="text-white" />
                  </div>
                )}
              </div>

              <div>
                <Tipografias.TextoMedio className='!text-black'>{dev2.nome}</Tipografias.TextoMedio>             
                <div className="rounded-full border text-blue-600 border-blue-600 bg-blue-50">
                  <Tipografias.TextoPequeno className='!text-blue-600'> @{dev2.username}</Tipografias.TextoPequeno>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <Metric
                  label="Seguidores"
                  value={dev2.seguidores.toLocaleString()}
                  highlight={dev2.seguidores > dev1.seguidores}
                />
                <Metric
                  label="Repos"
                  value={dev2.repositorios}
                  highlight={dev2.repositorios > dev1.repositorios}
                />
                <Metric
                  label="Linguagem"
                  value={dev2.linguagemPrincipal}
                  highlight={undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

const Metric = ({ label, value, highlight } : MetricProps) => {
  return (
    <div
      className={`flex-1 rounded-xl border p-3 flex flex-col items-center justify-center gap-1 ${
        highlight ? 'bg-[#fefaf1] border-[#fde999]' : 'bg-white border-slate-200'
      }`}
    >
      {highlight && <Crown size={14} className="text-[#bb4d00]" />}
      <Tipografias.Titulo className={`!text-[18px] ${highlight ? '!text-[#bb4d00]' : '!text-slate-700'} !leading-[22px]`}>    {value} </Tipografias.Titulo>
      <Tipografias.TextoPequeno className='!text-[12px] !leading-[14px] '> {label}</Tipografias.TextoPequeno>
    </div>
  );
};