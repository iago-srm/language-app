import React, { useEffect, useContext } from 'react';

import { Languages } from '@language-app/common';

import { LocalStorage } from '@utils';

const initialState = {
  language: 'pt',
  setLanguage: (language: string) => {}
}

const localStorage = new LocalStorage();

const LanguageContext = React.createContext(initialState)

export function LanguageProvider({children}) {

  const [language, setLang] = React.useState<string>(initialState.language);

  const setLanguage = (language: string) => {
    if(Languages.includes(language)) {
      setLang(language);
      localStorage.setLanguage(language);
    }
  }

  useEffect(() => {
    const storedLanguage = localStorage.getLanguage();
    if(storedLanguage) setLang(storedLanguage);
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
