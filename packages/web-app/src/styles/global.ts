import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${props => props.theme.colors.text};
    box-sizing: border-box;
    font: 400 16px Roboto, sans-serif;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ) ${props => props.theme.colors.background};
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: inherit;
    }
  }
`
