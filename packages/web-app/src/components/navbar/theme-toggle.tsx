import DarkModeToggle from "react-dark-mode-toggle";

export const ThemeToggle = ({ theme, setTheme }) => (
  <DarkModeToggle
    onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    checked={theme === 'dark'}
    size={80}
  />
)
