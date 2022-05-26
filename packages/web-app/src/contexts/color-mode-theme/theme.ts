import {
  Modes,
  Theme
} from './types';

const theme = {};

export const getTheme: (mode: Modes) => Theme = (mode: Modes) => {

  const colors = {
    dark: {
      background: '#535353',
      highlightedText: 'black',
      highlight: '#a9a9a9',
      text: '#efefef',
      primary: '#111111',
      secondary: '#aa1212',
      error: '#ff6767'
    },
    light: {
      background: '#e1e1e1',
      highlightedText: 'black',
      highlight: '#',
      text: 'white',
      primary: '#8257e6',
      secondary: '#aa1212',
      error: '#ff6767'
    }
  }

  return {
    ...theme,
    colors: colors[mode]
  }
}

