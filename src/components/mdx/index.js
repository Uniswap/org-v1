import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Info from './info'
import Code from './code'
import InlineCode from './inlineCode'

const components = {
  Info: Info,
  code: Code,
  inlineCode: InlineCode
}

export default function MDX({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
