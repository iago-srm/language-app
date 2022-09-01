import { DefaultTheme } from 'styled-components';

export type ColorModeContext = {
  theme: 'dark' | 'light',
  setTheme: (args?: string) => void
}

export type Modes = 'dark' | 'light';
export const validateMode = (mode: string) => mode === 'dark' || mode === 'light';

export interface Theme extends DefaultTheme {}
