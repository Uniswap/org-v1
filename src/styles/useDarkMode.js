import { useEffect, useState, createContext } from 'react'

const AppContext = React.createContext({ mode: 'light' })

export const useDarkMode = () => {
  const [mode, setTheme] = useState('light')

  const setMode = mode => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const themeToggler = () => {
    mode === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme)
  }, [])

  return [mode, themeToggler]
}
