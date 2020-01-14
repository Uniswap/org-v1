/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import styled, { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from '../components/theme'
import Header from '../components/header'
import Footer from '../components/footer'
import Mdx from '../components/mdx'

import '../css/prism-github.css'
import '../css/layout.css'

import bg from '../images/bg.jpg'

const StyledNavImage = styled.img`
  position: fixed;
  top: -300px;
  right: -100px;
  margin: 0;
  z-index: -999;
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
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledNavImage src={bg} alt="bg" />
        <Header siteTitle={data.site.siteMetadata.title} />
        {/* {children} */}
        <Mdx> {children}</Mdx>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default Layout
