import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './theme'
import useDarkMode from 'use-dark-mode'

export const StyledThemeProvider = props => {
  const { value } = useDarkMode()

  return (
    <ThemeProvider theme={theme(value)}>
      <GlobalStyle isDark={true} />
      {props.children}
    </ThemeProvider>
  )
}
