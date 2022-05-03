/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'

import { getTheme } from './theme'

export type Theme = ReturnType<getTheme>

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
