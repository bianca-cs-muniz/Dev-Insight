'use client';

import { Cabecalho } from './cabecalho';
import { Comparar } from './comparar';

export const CompararUsuario = () => {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col items-center bg-gradient-to-br from-[#f3e8ff] to-[#e0f2fe] selection:bg-purple-200">
      <Cabecalho />
      <Comparar />
    </div>
  );
};