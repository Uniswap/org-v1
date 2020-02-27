import React, { createContext, useLayoutEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './theme'

const defaultState = {
  isDark: false,
  toggleDark: () => undefined
}

export const ThemeManagerContext = createContext(defaultState)

const supportsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches

export const StyledThemeProvider = props => {
  const [isDark, setIsDark] = useState(false)

  const toggleDark = () => {
    const toggledTheme = !isDark
    setIsDark(toggledTheme)
    localStorage.setItem('dark', JSON.stringify(toggledTheme))
    console.log(theme(isDark))
  }

  useLayoutEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('dark')

    if (typeof themeFromLocalStorage === 'string') {
      setIsDark(JSON.parse(themeFromLocalStorage))
    } else if (supportsDarkMode()) {
      setIsDark(true)
    }
  }, [isDark, setIsDark])

  return (
    <ThemeManagerContext.Provider
      value={{
        isDark,
        toggleDark
      }}
    >
      <ThemeProvider theme={theme(isDark)}>
        <GlobalStyle isDark={isDark} />
        {props.children}
      </ThemeProvider>
    </ThemeManagerContext.Provider>
  )
}
