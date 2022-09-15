/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'

import { Colors } from '../contexts/color-mode-theme/theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
  }
}
