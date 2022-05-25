import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SWRConfig } from 'swr'
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';

import { LocalStorage } from '@utils';
import { AuthProvider, LanguageProvider } from '@contexts';
import {
  GlobalStyle,
  getTheme,
  validateMode,
  Modes
} from '@styles';
import {
  Navbar
} from '@components';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  const [theme, setTheme] = useState<Modes>('dark');

  useEffect(() => {
    const localStorage = new LocalStorage();
    const refreshTokenLocalStorage = localStorage.getRefreshToken();
    const colorTheme = localStorage.getTheme(theme);
    if(validateMode(colorTheme)) setTheme(colorTheme as Modes);
    axios.defaults.headers.common['authorization'] = refreshTokenLocalStorage;
  }, []);

  return (
    <SWRConfig value={{
        // errorRetryCount: 2
        // shouldRetryOnError: false
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (error.status === 404) return
          if (error.status === 403) return
          if (retryCount >= 3) return
          setTimeout(() => revalidate({ retryCount }), 3000)
        }
      }
    }>
      <LanguageProvider>
        <ThemeProvider theme={getTheme(theme)}>
          <AuthProvider>
            <Navbar />
            <Component {...pageProps} />
          </AuthProvider>
          <GlobalStyle />
        </ThemeProvider>
      </LanguageProvider>
    </SWRConfig>
  )
}

export default MyApp
