import { Modes, Theme } from "./types";
import { Dark, Light } from "./palettes";

const responsiveBreakpoint = 550;

export const getTheme: (mode: Modes) => Theme = (mode: Modes) => {
  const colors = {
    dark: { ...Dark },
    light: { ...Light },
  };

  return {
    responsiveBreakpoint,
    colors: colors[mode],
  };
};
