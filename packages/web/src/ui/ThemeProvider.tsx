import React, { useRef } from 'react';
import {
  createTheme,
  css,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { DEVTOOLS_Z_INDEX } from '../constants';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { getRoot } from './tools/getRoot';

let theme = createTheme({
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    htmlFontSize: 0,
  },
  palette: {
    primary: {
      main: '#822B55',
    },
    secondary: {
      main: '#2B5582',
    },
    text: {
      secondary: '#808080',
    },
    background: {
      default: 'rgb(255, 255, 255)',
    },
  },
  zIndex: {
    modal: DEVTOOLS_Z_INDEX,
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
          borderRadius: '11px',
          color: 'black',
          backgroundColor: 'white',
        },
      },
    },
  },
});

const globalStyles = css`
  :host > * {
    all: initial;
  }
`;

export function ThemeProvider({ children }: React.PropsWithChildren) {
  const cache = useRef(
    createCache({
      key: 'css',
      prepend: true,
      container: getRoot(),
    })
  );

  return (
    <CacheProvider value={cache.current!}>
      <GlobalStyles styles={globalStyles} />
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
}
