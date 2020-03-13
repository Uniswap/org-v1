export { wrapRootElement } from './src/apollo/wrapper'
import scrollTo from 'gatsby-plugin-smoothscroll'

export function onRouteUpdate({ location }) {
  // responsible for smooth-scrolling to hashes on page refreshes
  if (location.hash) {
    scrollTo(location.hash)
  } else {
    window.scroll(0, 0)
  }
}
