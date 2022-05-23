import React, { useEffect } from 'react';
import axios from 'axios';
import { SWRConfig } from 'swr'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { LocalStorage } from '@utils';
import { AuthProvider, LanguageProvider } from '@contexts';
import { GlobalStyle, getTheme } from '@styles';
import { Navbar, NavButton } from '@components';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  useEffect(() => {
    const refreshTokenLocalStorage = new LocalStorage().getRefreshToken();
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
        <ThemeProvider theme={getTheme('dark')}>
          <AuthProvider>
            <Navbar>
              <Navbar.LeftButtons>
                <NavButton>Home</NavButton>
              </Navbar.LeftButtons>
              <Navbar.RightButtons>
                <NavButton>Entrar</NavButton>
              </Navbar.RightButtons>
            </Navbar>
            <Component {...pageProps} />
          </AuthProvider>
          <GlobalStyle />
        </ThemeProvider>
      </LanguageProvider>
    </SWRConfig>
  )
}

export default MyApp
