import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Code from "./code"

const components = {
  code: Code,
}

const Mdx = props => (
  <MDXProvider components={components}> {props.children}</MDXProvider>
)

export default Mdx
