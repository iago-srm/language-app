export type Modes = 'dark' | 'light';
export const validateMode = (mode: string) => mode === 'dark' || mode === 'light';

export interface Colors {
  primary: string; // 60%
  secondary: string; // 30%
  accent: string; // 10%,
  text: string;
  error?: string;
}

export interface Theme {
  colors: Colors,
  responsiveBreakpoint: number
}

