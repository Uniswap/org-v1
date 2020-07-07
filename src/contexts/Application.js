import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'

const UPDATE_DARKMODE = 'UPDATE_DARKMODE'

const DARKMODE_KEY = 'DARKMODE_KEY'

const DARK_MODE_OPTION = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
}

const INITIAL_STATE = {
  [DARKMODE_KEY]: DARK_MODE_OPTION.LIGHT
}

const ApplicationContext = createContext({})

function useApplicationContext() {
  return useContext(ApplicationContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_DARKMODE: {
      const { mode } = payload
      return {
        ...state,
        [DARKMODE_KEY]: mode
      }
    }

    default: {
      throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const updateDarkMode = useCallback(mode => {
    dispatch({
      type: UPDATE_DARKMODE,
      payload: {
        mode
      }
    })
  }, [])

  return (
    <ApplicationContext.Provider value={useMemo(() => [state, { updateDarkMode }], [state, updateDarkMode])}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function Updater() {
  const [, { updateDarkMode }] = useApplicationContext()
  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.style.getPropertyValue('--initial-color-mode')
    if (initialColorValue === 'dark') {
      updateDarkMode(DARK_MODE_OPTION.DARK)
    } else {
      updateDarkMode(DARK_MODE_OPTION.DARK.LIGHT)
    }
  }, [])
  return null
}

export function useDarkMode() {
  const [state, { updateDarkMode }] = useApplicationContext()

  const darkModeOn = state?.[DARKMODE_KEY] === DARK_MODE_OPTION.DARK

  function toggleDarkMode() {
    if (darkModeOn) {
      updateDarkMode(DARK_MODE_OPTION.LIGHT)
      localStorage.setItem('color-mode', 'light')
    } else {
      updateDarkMode(DARK_MODE_OPTION.DARK)
      localStorage.setItem('color-mode', 'dark')
    }
  }

  return [darkModeOn, toggleDarkMode]
}
