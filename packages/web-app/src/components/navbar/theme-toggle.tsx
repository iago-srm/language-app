import DarkModeToggle from "react-dark-mode-toggle";

export const ThemeToggle = ({ mode, setMode }) => (
  <DarkModeToggle
    onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    checked={mode === 'dark'}
    size={80}
  />
)
