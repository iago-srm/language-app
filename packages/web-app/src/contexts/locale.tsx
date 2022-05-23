import React, { useEffect } from 'react';

import { Languages } from '@language-app/common';

import { LocalStorage } from '@utils';
import { setAxiosLanguage } from '@api';


type languageContext = {
  language: string,
  setLanguage: (lang: string) => void;
}

const initialState = {
  language: 'pt',
  setLanguage: () => {}
}

export const LanguageContext = React.createContext<languageContext>(initialState)

export function LanguageProvider({children}) {

  const [language, setLang] = React.useState(initialState.language);

  const setLanguage = (lang: string) => {
    if(Languages.includes(lang)) {
      new LocalStorage().setLocale(lang);
      setLang(lang);
    }
  }

  useEffect(() => {
    setLang(new LocalStorage().getLocale().split('-')[0])
  }, []);

  useEffect(() => {
    setAxiosLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
