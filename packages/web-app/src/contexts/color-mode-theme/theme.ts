import {
  Modes,
  Theme
} from './types';
import { DarkNavyBlue, LightGreyBlue } from './palettes';


export const getTheme: (mode: Modes) => Theme = (mode: Modes) => {

  const colors = {
    dark: {...DarkNavyBlue},
    light: {...LightGreyBlue}
  }

  return {
    colors: colors[mode]
  }
}

