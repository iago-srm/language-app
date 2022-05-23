
export type Modes = 'dark' | 'light';
export type Theme = {
  padding: string,
  colors: {
    background: string;
    highlightedText: string;
    text: string;
    primary: string;
    secondary: string;
  }
}

const theme = {
  padding: '5px'
}

export const validateMode = (mode: string) => mode === 'dark' || mode === 'light';
export const getTheme: (mode: Modes) => Theme = (mode: Modes) => {

  const colors = {
    dark: {
      background: 'grey',
      highlightedText: 'black',
      text: '#e1e1e6',
      primary: 'black',
      secondary: 'red'
    },
    light: {
      background: '#e1e1e1',
      highlightedText: 'black',
      text: 'white',
      primary: '#8257e6',
      secondary: 'red'
    }
  }

  return {
    ...theme,
    colors: colors[mode]
  }
}

