import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font: 400 16px Roboto, sans-serif;
    background-color: ${props => props.theme.colors.background};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`
