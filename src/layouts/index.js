/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import styled, { createGlobalStyle } from 'styled-components'
import Header from '../components/header'
import Footer from '../components/footer'

import './layout.css'

import bg from '../images/bg.jpg'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0px auto;
    line-height: 1.75 !important;
    /* max-width: 960px; */
  }
  h1{
    font-weight: 600;
  }
  h2, h3{
    font-weight: 500;
  }
  h2, h3{
    margin-top: 2rem !important;
  }
`
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
      <GlobalStyle />
      <StyledNavImage src={bg} alt="bg" />
      <Header siteTitle={data.site.siteMetadata.title} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
