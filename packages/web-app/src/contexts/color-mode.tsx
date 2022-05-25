import React, { useEffect } from 'react';

type colorModeContext = {
  theme: 'dark' | 'light',
  setTheme: (args?: string) => void
}

export const ColorModeContext = React.createContext<colorModeContext>({
  theme: 'dark',
  setTheme: () => {}
});
