/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'

import { getTheme, Theme } from '../contexts/color-mode-theme/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
