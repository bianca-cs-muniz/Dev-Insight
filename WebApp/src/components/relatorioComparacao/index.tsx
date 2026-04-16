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
    <div className="min-h-screen w-full py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-30 flex flex-col gap-5">
        <ResultadoHero dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
        <AnalisePontuacao dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
        <ComparacaoDireta dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
        <Linguagens dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
        <ProjetosDestaque dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
        <Insights insights={dadosMocados.insights} />
        <Badges badges={dadosMocados.badges} dev1={dadosMocados.dev1} dev2={dadosMocados.dev2} />
      </div>
    </div>
  );
};
