import React from 'react';
import { Languages } from '@language-app/common';
import { LocalStorage } from '@helpers';
import { useEffect } from 'react';

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
      new LocalStorage().setLanguage(lang);
      setLang(lang);
    }
  }

  useEffect(() => {
    setLang(new LocalStorage().getLanguage())
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
