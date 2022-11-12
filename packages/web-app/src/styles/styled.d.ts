import "styled-components";

import { Theme } from "../contexts/color-mode-theme/types";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
