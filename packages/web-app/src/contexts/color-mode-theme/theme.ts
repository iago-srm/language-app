import {
  Modes,
  Theme
} from './types';

const theme = {
  inputBorderRadius: '3px'
};

export const getTheme: (mode: Modes) => Theme = (mode: Modes) => {

  const colors = {
    dark: {
      background: '#535353',
      highlightedText: 'white',
      highlight: '#a9a9a9',
      text: '#efefef',
      primary: '#111111',
      secondary: '#aa1212',
      error: '#ff6767'
    },
    light: {
      background: '#e1e1e1',
      highlightedText: 'black',
      highlight: '#a479f8',
      text: 'black',
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

