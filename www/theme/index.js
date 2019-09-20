import { ThemeProvider as SCThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  colors: {
    white: '#FFFFFF',
    button: '#C44AE5'
  }
}

export default function ThemeProvider(props) {
  return <SCThemeProvider theme={theme} {...props} />
}

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: 'Inter', sans-serif;
    color: ${({ theme }) => theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-overflow-scrolling: touch;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    outline-width: thin;
    outline-color: ${({ theme }) => theme.colors.white};
  }
`
