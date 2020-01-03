import Typography from 'typography'
import FairyGates from 'typography-theme-fairy-gates'
import * as colors from './colors'

FairyGates.headerFontFamily = ['Source Sans Pro']
FairyGates.bodyFontFamily = ['Source Sans Pro']

FairyGates.overrideThemeStyles = () => {
  return {
    a: {
      color: colors.primary,
      background: 'none',
      textShadow: 'none',
    },
    blockquote: {
      borderLeftColor: colors.primary,
    },
  }
}

const typography = new Typography(FairyGates)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
