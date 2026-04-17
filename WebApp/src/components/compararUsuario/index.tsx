'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Cabecalho } from './cabecalho';
import { Comparar } from './comparar';
import { RelatorioComparacao } from '../relatorioComparacao';

export const CompararUsuarioContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user1 = searchParams.get('user1');
  const user2 = searchParams.get('user2');

  const handleCompare = (dev1: string, dev2: string) => {
    router.push(`?user1=${dev1}&user2=${dev2}`);
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col items-center bg-gradient-to-br from-[#f3e8ff] to-[#e0f2fe] selection:bg-purple-200">
      <Cabecalho />
      {user1 && user2 ? (
        <RelatorioComparacao user1={user1} user2={user2} />
      ) : (
        <Comparar onCompare={handleCompare} />
      )}
    </div>
  );
};

export const CompararUsuario = () => (
  <Suspense>
    <CompararUsuarioContent />
  </Suspense>
);