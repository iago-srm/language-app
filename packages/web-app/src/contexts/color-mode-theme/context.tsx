import React, { useEffect, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  validateMode,
  Modes,
  Theme
} from './types';
import { getTheme } from './theme';
import { LocalStorage } from '@services/browser';

type ColorModeContextType = {
  mode: 'dark' | 'light',
  theme: Theme,
  setMode: (args?: string) => void
}

const ColorModeContext = React.createContext<ColorModeContextType>({
  mode: 'dark',
  theme: getTheme('dark'),
  setMode: () => {},
});

const localStorage = new LocalStorage();

export const ThemeProvider = ({ children }) => {
  const [mode, setModeState] = useState<Modes>('dark');

  const setMode = (args?: string) => {
    const colorMode = args || localStorage.getMode(mode);
    if(validateMode(colorMode)) {
      setModeState(colorMode as Modes);
      localStorage.setMode(colorMode)
    }

  }

  useEffect(() => {
    setMode()
  }, [])

  return (
    <StyledThemeProvider theme={getTheme(mode)}>
      <ColorModeContext.Provider value={{
        mode,
        theme: getTheme(mode),
        setMode,
      }}>
        {children}
      </ColorModeContext.Provider>
    </StyledThemeProvider>
  )
}

export const useColorTheme = () => useContext(ColorModeContext);
