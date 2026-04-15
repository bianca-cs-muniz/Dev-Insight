'use client';

import { ResultadoHero } from './ResultadoHero';
import { AnalisePontuacao } from './AnalisePontuacao';
import { ComparacaoDireta } from './ComparacaoDireta';
import { Linguagens } from './Linguagens';
import { ProjetosDestaque } from './ProjetosDestaque';
import { Insights } from './Insights';
import { Badges } from './Badges';
import { dadosMocados } from './dadosMocados';

export const RelatorioComparacao = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#E8F2FF] to-[#F5FAFF] pb-20 pt-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <ResultadoHero dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnalisePontuacao dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
          <Insights insights={dadosMocados.insights} />
        </div>

        <ComparacaoDireta dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Linguagens dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
          <Badges badges={dadosMocados.badges} dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
        </div>

        <ProjetosDestaque dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
      </div>
    </div>
  );
};
