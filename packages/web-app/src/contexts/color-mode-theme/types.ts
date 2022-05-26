export type ColorModeContext = {
  theme: 'dark' | 'light',
  setTheme: (args?: string) => void
}

export type Modes = 'dark' | 'light';
export const validateMode = (mode: string) => mode === 'dark' || mode === 'light';

export type Theme = {
  colors: {
    background: string;
    highlightedText: string;
    highlight: string;
    text: string;
    primary: string;
    secondary: string;
    error: string;
  },
}
