'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BuscarUsuario } from '@components/buscarUsuario';
import { RelatorioUsuario } from '@components/relatorioUsuario';

export const Router = () => {
  const gitHub = useSearchParams().get('gitHub');

  return (
    <Suspense>
      {gitHub ? <RelatorioUsuario /> : <BuscarUsuario />}
    </Suspense>
  );
};