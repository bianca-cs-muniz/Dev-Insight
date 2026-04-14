'use client';

import { styled, Typography } from '@mui/material';

const Titulo = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 38px;
  color: #1e293b;
`;

const Legenda = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #62748e;
`;

const LegendaPequena = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #62748e;           
`;

const TextoPequeno = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #62748e;           
`;

const TextoPequeno16 = styled(Typography)`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #62748e;           
`;

const TextoPequenoSimples = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #62748e;           
`;

export const Tipografias = {
  Titulo,
  Legenda,
  LegendaPequena,
  TextoPequeno,
  TextoPequeno16,
  TextoPequenoSimples
};
