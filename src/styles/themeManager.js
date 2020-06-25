import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './theme'
import useDarkMode from 'use-dark-mode'

// const supportsDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export const StyledThemeProvider = props => {
  const { value } = useDarkMode(false)

  return (
    <ThemeProvider theme={theme(value)}>
      <GlobalStyle isDark={value} />
      {props.children}
    </ThemeProvider>
  )
}
