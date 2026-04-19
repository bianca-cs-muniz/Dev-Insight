import React, { type FC } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@mui/material';

import { GlobalStyles as MUIGlobalStyles } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
import { ptBR as ptBRMaterial } from '@mui/material/locale';
import { ptBR as ptBRGrid } from '@mui/x-data-grid/locales';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }

  interface Palette {
    blue: Palette['primary'];
    bordaCinza: Palette['primary'];
  }

  interface PaletteOptions {
    blue?: PaletteOptions['primary'];
    bordaCinza?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Icon' {
  interface SvgIconPropsColorOverrides {
    blue: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    botaoSecundario: string
  }
}
interface IGlobals {
  children: React.ReactNode;
}

export const Globals: FC<IGlobals> = ({ children }) => {
  const theme = createTheme({

    palette: {
      primary: {
        main: '#432dd7',
      },
      secondary: {
        main: '#432dd7',
      },
      bordaCinza: {
        main: '#E6EEF6',
      },
    },
    typography: {
      allVariants: {
        textTransform: 'none',
        color: '#0B1220',
        fontFamily: '"Inter", sans-serif !important',
      },
    },
    breakpoints: {
      values: {
        xxs: 0,
        xs: 300,
        sm: 600,
        md: 800,
        lg: 1200,
        xl: 1500,
        xxl: 1800,
        mobile: 600,
        tablet: 800,
        laptop: 1000,
        desktop: 1536,
      },
    },
  }, ptBRMaterial,
    ptBRGrid);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <ConfirmProvider>
          <GlobalStyles />
          {children}
        </ConfirmProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const GlobalStyles = () => (
  <MUIGlobalStyles
    styles={() => ({
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      '*': {
        margin: 0,
      },

      a: {
        textDecoration: 'none',
        color: 'inherit',
        fontFamily: '"Inter", sans-serif !important',
      },
      p: {
        textDecoration: 'none',
        color: 'inherit',
        fontFamily: '"Inter", sans-serif !important',
      },
      span: {
        textDecoration: 'none',
        color: 'inherit',
        fontFamily: '"Inter", sans-serif !important',
      },
      '::placeholder': {
        fontFamily: '"Inter", sans-serif !important',
      },
      button: {
        fontFamily: '"Inter", sans-serif !important',
      },

      body: {
        lineHeight: 1.5,
        WebkitFontSmoothing: 'antialiased',
        fontFamily: '"Inter", sans-serif !important',
        overflowX: 'hidden',
      },

      'img, picture, video, canvas, svg': {
        display: 'block',
        maxWidth: '100%',
      },
      'input, button, textarea, select': {
        font: 'inherit',
      },
      'p, h1, h2, h3, h4, h5, h6': {
        overflowWrap: 'break-word',
      },
      '#root, #__next': {
        isolation: 'isolate',
      },

      '::-webkit-scrollbar': {
        width: '0.3em',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#432dd7',
        borderRadius: '10px',
      },
    })}
  />
);
