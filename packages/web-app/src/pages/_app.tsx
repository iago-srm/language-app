import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SWRConfig } from 'swr'
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

import { LocalStorage } from '@utils';
import {
  AuthProvider,
  LanguageProvider,
  ThemeProvider
} from '@contexts';
import {
  GlobalStyle,
} from '@styles';
import {
  Navbar
} from '@components';

const localStorage = new LocalStorage();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  useEffect(() => {
    axios.defaults.headers.common['authorization'] = localStorage.getRefreshToken();
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
        <ThemeProvider>
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
