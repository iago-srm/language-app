import React, { useEffect, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  validateMode,
  Modes,
  ColorModeContext as ColorModeContextType
} from './types';
import { getTheme } from './theme';
import { LocalStorage } from '@services/browser';

const ColorModeContext = React.createContext<ColorModeContextType>({
  theme: 'dark',
  setTheme: () => {}
});

const localStorage = new LocalStorage();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState<Modes>('dark');

  const setTheme = (args?: string) => {
    const colorTheme = args || localStorage.getTheme(theme);
    if(validateMode(colorTheme)) {
      setThemeState(colorTheme as Modes);
      localStorage.setTheme(colorTheme)
    }

  }

  useEffect(() => {
    setTheme()
  }, [])

  return (
    <StyledThemeProvider theme={getTheme(theme)}>
      <ColorModeContext.Provider value={{
        theme,
        setTheme
      }}>
        {children}
      </ColorModeContext.Provider>
    </StyledThemeProvider>
  )
}

export const useColorTheme = () => useContext(ColorModeContext);
