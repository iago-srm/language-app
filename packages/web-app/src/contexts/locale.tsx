import React from 'react';
import { Languages } from '@language-app/common';

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
      setLang(lang);
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
