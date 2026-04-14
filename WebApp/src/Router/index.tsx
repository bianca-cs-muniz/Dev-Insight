'use client';
import { Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { BuscarUsuario } from '@components/buscarUsuario';
import { RelatorioUsuario } from '@components/relatorioUsuario';
import { CompararUsuario } from '@components/compararUsuario';

const ROTAS_ESTATICAS: Record<string, React.ReactNode> = {
  '/comparar-perfis': <CompararUsuario />,
};

const resolverComponente = ( pathname: string, searchParams: URLSearchParams ): React.ReactNode =>
  ROTAS_ESTATICAS[pathname] ?? (searchParams.get('gitHub') ? <RelatorioUsuario /> : <BuscarUsuario />
);

export const Router = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <Suspense>
      {resolverComponente(pathname, searchParams)}
    </Suspense>
  );
};