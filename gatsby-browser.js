/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import { wrapRootElement as wrap } from "./wrap-root-element"

// export const wrapRootElement = wrap
require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

const transitionDelay = 100

exports.shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  if (location.action === 'PUSH') {
    // window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
    window.scrollTo(0, 0)
  } else {
    const savedPosition = getSavedScrollPosition(location)
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), transitionDelay)
  }
  return false
}

exports.onRouteUpdate = ({ location }) => {
  checkHash(location)
}

const checkHash = location => {
  let { hash } = location

  if (hash !== '') {
    console.log('something changed')
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView()
      } // Adjust scrolling with a negative value here
    }, 0)
  }
}
