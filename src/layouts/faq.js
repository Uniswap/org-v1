import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '.'
import SEO from '../components/seo'

import BG from '../components/bg'

import '../styles/prism-github.css'

const GlobalStyle = createGlobalStyle`
  html {
    background-image: none;
    background-color: ${({ theme }) => theme.backgroundColor};
}
`

const StyledDocs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 2rem;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  padding-top: 2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  border-top: 1px solid ${({ theme }) => theme.colors.grey2};

  @media (max-width: 960px) {
    flex-direction: column;
    grid-template-columns: 1fr;
    margin-top: 0rem;
    padding: 1rem;
  }
`

const StyledMDX = styled.div`
  min-width: 550px;
  max-width: 650px;
  padding: 0;
  margin-bottom: 3rem;
  a {
    color: ${({ theme }) => theme.colors.link};
  }

  figcaption {
    padding: 0.25rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.grey6};
    text-align: center;
  }
  @media (max-width: 960px) {
    min-width: 100%;
    max-width: 100%;
  }

  h1 {
    margin-top: 4rem;
  }
  h2 {
    margin-top: 2rem;
  }
  blockquote h1 {
    margin-top: unset;
    font-style: italic;
  }
`

const StyledPageTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  /* align-items: center; */

  h1 {
    font-size: 2.5rem !important;
    margin-top: 0px !important;
  }

  a {
    color: ${({ theme }) => theme.colors.grey6};
    display: inherit;
    font-size: 0.825rem;
  }
`

const Docs = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/faq/" } }, sort: {}) {
        edges {
          node {
            headings {
              value
              depth
            }
            frontmatter {
              title
            }
            fields {
              slug
              subDir
              rawSlug
              parentDir
            }
            id
          }
        }
      }
    }
  `)

  return (
    <Layout path={props.location.pathname} isDocs={false}>
      <BG />
      <SEO title={props.pageContext.frontmatter.title} path={props.location.pathname} />
      <GlobalStyle />
      {data.allMdx.edges
        .filter(({ node }) => {
          return node.fields.slug === props.path
        })
        .map(({ node }) => {
          const title = node.fields.subDir
            .replace(/\d+-/g, '')
            .replace(/-/g, ' ')
            .replace(/(^|\s)\S/g, function(t) {
              return t.toUpperCase()
            })
          return (
            <SEO
              key={node.fields.slug}
              title={props.pageContext.frontmatter.title}
              site={'Uniswap ' + title}
              path={props.location.pathname}
              description={node.excerpt}
            />
          )
        })}
      <StyledDocs id="docs-header">
        <span>
          <StyledPageTitle>
            <h1 className={'title'} style={{ fontSize: '72px' }}>
              {props.pageContext.frontmatter.title}
            </h1>
          </StyledPageTitle>
          <span>
            <StyledMDX>{props.children}</StyledMDX>
          </span>
        </span>
      </StyledDocs>
    </Layout>
  )
}

export default Docs
