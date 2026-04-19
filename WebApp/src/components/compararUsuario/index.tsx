'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Cabecalho } from './cabecalho';
import { Comparar } from './comparar';
import { RelatorioComparacao } from '../relatorioComparacao';

export const CompararUsuarioContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user1 = searchParams.get('user1')?.trim() || '';
  const user2 = searchParams.get('user2')?.trim() || '';

  const hasParams = !!user1 && !!user2;

  const handleCompare = (dev1: string, dev2: string) => {
    const u1 = dev1.trim().replace('@', '');
    const u2 = dev2.trim().replace('@', '');
    if (!u1 || !u2) return;
    router.push(`/comparar-perfis?user1=${u1}&user2=${u2}`);
  };

  const handleNovaComparacao = () => {
    router.push('/comparar-perfis');
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex flex-col items-center bg-gradient-to-br from-[#f3e8ff] to-[#e0f2fe] selection:bg-purple-200">
      <Cabecalho />
      {hasParams ? (
        <RelatorioComparacao
          user1={user1}
          user2={user2}
          onNovaComparacao={handleNovaComparacao}
        />
      ) : (
        <Comparar key="comparar-form" onCompare={handleCompare} />
      )}
    </div>
  );
};

export const CompararUsuario = () => (
  <Suspense>
    <CompararUsuarioContent />
  </Suspense>
);