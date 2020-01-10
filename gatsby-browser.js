/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import { wrapRootElement as wrap } from "./wrap-root-element"

// export const wrapRootElement = wrap
require('prismjs/themes/prism.css')
// require('prismjs/themes/prism-solarizedlight.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

const transitionDelay = 50

exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  if (location.action === 'PUSH') {
    // window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
    window.scrollTo(0, 0)
  }
  // else {
  //   const savedPosition = getSavedScrollPosition(location)
  //   window.setTimeout(
  //     () => window.scrollTo(...(savedPosition || [0, 0])),
  //     transitionDelay
  //   )
  // }
  return false
}
