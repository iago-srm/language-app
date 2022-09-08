import { DefaultTheme } from 'styled-components';

export type ColorModeContext = {
  mode: 'dark' | 'light',
  theme: DefaultTheme,
  setMode: (args?: string) => void
}

export type Modes = 'dark' | 'light';
export const validateMode = (mode: string) => mode === 'dark' || mode === 'light';

export interface Theme extends DefaultTheme {}
