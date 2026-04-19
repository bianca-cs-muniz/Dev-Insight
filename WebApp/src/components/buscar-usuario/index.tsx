'use client';

import { Cabecalho } from '@components/buscar-usuario/cabecalho'
import { Buscar } from '@components/buscar-usuario/buscar'
import { CardsInformacao } from './cardsInformacao'

export const BuscarUsuario = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 py-16">
      <Cabecalho />
      <Buscar />
      <CardsInformacao />
    </div>
  )
}
