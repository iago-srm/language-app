import React, { useEffect } from 'react';

import { Locales } from '@language-app/common';

import { LocalStorage } from '@utils';
import { setAxiosLanguage } from '@api';


type languageContext = {
  language: string,
  setLocale: (lang: string) => void;
}

const initialState = {
  language: 'pt',
  setLocale: () => {}
}

export const LanguageContext = React.createContext<languageContext>(initialState)

export function LanguageProvider({children}) {

  const [language, setLang] = React.useState(initialState.language);

  const setLocale = (locale: string) => {
    console.log(locale);
    if(Locales.includes(locale)) {
      new LocalStorage().setLocale(locale);
      setLang(locale.split('-')[0]);
    }
  }

  useEffect(() => {
    setLang(new LocalStorage().getLocale().split('-')[0])
  }, []);

  useEffect(() => {
    setAxiosLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}
