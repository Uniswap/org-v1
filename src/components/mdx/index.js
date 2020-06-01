import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'

import Info from './info'
import Title from './title'
import Code from './code'
import InlineCode from './inlineCode'
import InlineCard from '../inlineCard'

const components = {
  Info,
  Link,
  Title,
  InlineCard,
  code: Code,
  inlineCode: InlineCode
}

export default function MDX({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
