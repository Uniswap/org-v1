import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'

import Info from './info'
import Code from './code'
import InlineCode from './inlineCode'

const components = {
  Info,
  Link,
  code: Code,
  inlineCode: InlineCode
}

export default function MDX({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
