'use client';

import { Tipografias } from "../tipografias";

type Props = {
  loading: boolean;
  label?: string;
};

export const CarregandoProcesso = ({ loading, label }: Props) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="animate-pulse">
       <Tipografias.Titulo className='!text-white !text-2xl'> {label || 'Carregando...'}</Tipografias.Titulo>
      </div>
    </div>
  );
}
