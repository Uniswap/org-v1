import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Info from './info'

const components = {
  Info: Info
}

const Mdx = props => (
  <MDXProvider components={components}> {props.children}</MDXProvider>
)

export default Mdx
