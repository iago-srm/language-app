
type modes = 'dark' | 'light';

const theme = {
  padding: '5px'
}

export const getTheme = (mode: modes) => {

  const colors = {
    dark: {
      background: '#121214',
      text: '#e1e1e6',
      primary: '#eeeeee'
    },
    light: {
      background: '#e1e1e1',
      text: '#121214',
      primary: '#8257e6'
    }
  }

  return {
    ...theme,
    colors: colors[mode]
  }
}

