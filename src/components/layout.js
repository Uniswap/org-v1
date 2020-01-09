/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { createGlobalStyle } from "styled-components"
import Header from "./header"
import Footer from "./footer"

import "./layout.css"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0px auto;
    max-width: 960px;
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query GuidesSiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <React.Fragment>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default Layout
