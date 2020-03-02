import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Info from './info'
import Code from './code'

// const Code = props => <div>{props.children}</div>

const components = {
  Info: Info,
  code: Code
}

const Mdx = props => <MDXProvider components={components}> {props.children}</MDXProvider>

export default Mdx
