'use client';

import { useState } from 'react';
import { Cabecalho } from './cabecalho';
import { Comparar } from './comparar';
import { RelatorioComparacao } from '../relatorioComparacao';

export const CompararUsuario = () => {
  const [exibirRelatorio, setExibirRelatorio] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col items-center bg-gradient-to-br from-[#f3e8ff] to-[#e0f2fe] selection:bg-purple-200">
      <Cabecalho />
      {exibirRelatorio ? (
        <RelatorioComparacao />
      ) : (
        <Comparar onCompare={() => setExibirRelatorio(true)} />
      )}
    </div>
  );
};