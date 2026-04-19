'use client';

import { ResultadoHero } from './ResultadoHero';
import { AnalisePontuacao } from './AnalisePontuacao';
import { ComparacaoDireta } from './ComparacaoDireta';
import { Linguagens } from './Linguagens';
import { ProjetosDestaque } from './ProjetosDestaque';
import { Insights } from './Insights';
import { Badges } from './Badges';
import { useCompararDadosGitHub } from '../../hooks/CompararDadosGitHub';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface RelatorioComparacaoProps {
  user1: string;
  user2: string;
  onNovaComparacao?: () => void;
}

export const RelatorioComparacao = ({ user1, user2, onNovaComparacao }: RelatorioComparacaoProps) => {
  const { data, isLoading, error, refetch } = useCompararDadosGitHub(user1, user2);

  if (isLoading) return (
    <div className="min-h-[500px] w-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-700" />
    </div>
  );

  if (error) return (
    <div className="min-h-[500px] w-full flex justify-center items-center flex-col gap-4">
      <p className="text-red-500 font-medium">Erro ao carregar dados da comparação</p>
      <div className="flex gap-3">
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-200 transition text-sm font-medium"
        >
          <RefreshCw size={16} />
          Tentar novamente
        </button>
      </div>
    </div>
  );

  if (!data) return null;

  return (
    <div className="min-h-screen w-full py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-30 flex flex-col gap-5">
        <ResultadoHero dev1={data.dev1} dev2={data.dev2} />
        <AnalisePontuacao dev1={data.dev1} dev2={data.dev2} />
        <ComparacaoDireta dev1={data.dev1} dev2={data.dev2} />
        <Linguagens dev1={data.dev1} dev2={data.dev2} />
        <ProjetosDestaque dev1={data.dev1} dev2={data.dev2} />
        <Insights insights={data.insights} />
        <Badges badges={data.badges} dev1={data.dev1} dev2={data.dev2} />
      </div>
    </div>
  );
};
