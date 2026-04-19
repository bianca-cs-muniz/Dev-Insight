'use client';

import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Titulo = ({ children, className, id }: TypographyProps) => (
  <h1 id={id} className={`font-semibold text-[36px] leading-[38px] text-[#1e293b] ${className || ''}`}>
    {children}
  </h1>
);

const Legenda = ({ children, className, id }: TypographyProps) => (
  <p id={id} className={`font-normal text-[18px] leading-[24px] text-[#62748e] ${className || ''}`}>
    {children}
  </p>
);

const LegendaPequena = ({ children, className, id }: TypographyProps) => (
  <p id={id} className={`font-semibold text-[18px] leading-[24px] text-[#62748e] ${className || ''}`}>
    {children}
  </p>
);

const TextoMedio = ({ children, className, id }: TypographyProps) => (
  <p id={id} className={`font-semibold text-[20px] leading-[24px] text-[#62748e] ${className || ''}`}>
    {children}
  </p>
);

const TextoPequeno = ({ children, className, id }: TypographyProps) => (
  <p id={id} className={`font-semibold text-[14px] leading-[24px] text-[#62748e] ${className || ''}`}>
    {children}
  </p>
);

const TextoPequeno16 = ({ children, className, id }: TypographyProps) => (
  <p id={id} className={`font-semibold text-[16px] leading-[24px] text-[#62748e] ${className || ''}`}>
    {children}
  </p>
);

const TextoPequenoSimples = ({ children, className, id }: TypographyProps) => (
  <p id={id} className={`font-normal text-[14px] leading-[24px] text-[#62748e] ${className || ''}`}>
    {children}
  </p>
);

export const Tipografias = {
  Titulo,
  Legenda,
  LegendaPequena,
  TextoMedio,
  TextoPequeno,
  TextoPequeno16,
  TextoPequenoSimples
};
