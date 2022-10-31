import React, { useEffect, useState } from "react";
import axios from "axios";
import { SWRConfig } from "swr";
import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

import { AuthProvider, LanguageProvider, ThemeProvider } from "@contexts";
import { GlobalStyle } from "@styles";
import { Navbar } from "@components";

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SWRConfig
      value={{
        // errorRetryCount: 2
        // shouldRetryOnError: false
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (error.status === 404) return;
          // if (error.status === 403) return
          if (retryCount >= 1) return;
          setTimeout(() => revalidate({ retryCount }), 3000);
        },
      }}
    >
      <LanguageProvider>
        <ThemeProvider>
          <SessionProvider session={session}>
            <AuthProvider>
              <Navbar />
              <Component {...pageProps} />
            </AuthProvider>
          </SessionProvider>
          <GlobalStyle />
        </ThemeProvider>
      </LanguageProvider>
    </SWRConfig>
  );
};

export default App;
