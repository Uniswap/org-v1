import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Link } from 'gatsby'

import Info from './info'
import Iframe from './iframe'
import Github from './github'
import Title from './title'
import Code from './code'
import InlineCode from './inlineCode'
import InlineCard from '../inlineCard'
import InlineBoxLink from '../inlineBoxLink'
import Wizard from '../wizard'
import Video from '../video'
import Simulator from '../Simulator'
import ExternalRedirect from '../ExternalRedirect'

import '../../styles/katex.css'

const components = {
  ExternalRedirect,
  Info,
  Github,
  Link,
  Iframe,
  Title,
  InlineCard,
  InlineBoxLink,
  Wizard,
  Video,
  Simulator,
  code: Code,
  inlineCode: InlineCode
}

export default function MDX({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
