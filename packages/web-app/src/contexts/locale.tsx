import React, { useEffect, useContext } from 'react';

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

const localStorage = new LocalStorage();

const LanguageContext = React.createContext<languageContext>(initialState)

export function LanguageProvider({children}) {

  const [language, setLang] = React.useState<string>(initialState.language);

  const setLanguage = (language: string) => {
    if(Languages.includes(language)) {
      setLang(language);
      localStorage.setLanguage(language);
      setAxiosLanguage(language);
    }
  }

  useEffect(() => {
    const storedLanguage = localStorage.getLanguage();
    if(storedLanguage) {
      console.log({storedLanguage})
      setLang(storedLanguage);
    }

  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  return useContext(LanguageContext);
}
