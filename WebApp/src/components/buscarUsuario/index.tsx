'use client';

import { Cabecalho } from '@components/buscarUsuario/cabecalho'
import { Buscar } from '@components/buscarUsuario/buscar'
import { CardsInformacao } from './cardsInformacao'

export const BuscarUsuario = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 px-4 py-16">
      <Cabecalho />
      <Buscar />
      <CardsInformacao />
    </div>
  )
}