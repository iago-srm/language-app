/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'

import { getTheme, Theme } from '../contexts/color-mode-theme/theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      highlightedText: string;
      highlight: string;
      text: string;
      primary: string;
      secondary: string;
      error: string;
    },
    inputBorderRadius: string;
  }
}
