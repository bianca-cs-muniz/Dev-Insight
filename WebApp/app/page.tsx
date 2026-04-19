'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BuscarUsuario } from '@components/buscar-usuario';
import { RelatorioUsuario } from '@components/relatorio-usuario';

function HomeContent() {
  const searchParams = useSearchParams();
  const hasGitHub = !!searchParams.get('gitHub');

  return hasGitHub ? <RelatorioUsuario /> : <BuscarUsuario />;
}

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
