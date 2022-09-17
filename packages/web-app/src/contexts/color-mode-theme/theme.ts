import {
  Modes,
  Theme
} from './types';
import { DarkNavyBlue, LightGreyBlue } from './palettes';

const responsiveBreakpoint = 550;

export const getTheme: (mode: Modes) => Theme = (mode: Modes) => {

  const colors = {
    dark: {...DarkNavyBlue},
    light: {...LightGreyBlue}
  }

  return {
    responsiveBreakpoint,
    colors: colors[mode]
  }
}

