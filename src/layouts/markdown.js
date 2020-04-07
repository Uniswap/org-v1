import React from 'react'
import Layout from '.'
import styled from 'styled-components'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Twitter, Facebook } from 'react-social-sharing'

import SEO from '../components/seo'
import BG from '../components/bg'

import '../styles/prism-github.css'

const StyledMarkdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
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

const PostHeader = styled.div`
  font-size: 1.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  min-width: 550px;
  max-width: 650px;
  padding: 8rem 0 2rem 0;
  @media (max-width: 960px) {
    min-width: 100%;
    max-width: 100%;
  }
`

const PostTitle = styled.h1`
  font-size: 4rem;
  font-size: 72px;
  margin: 2rem 0 1rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  @media (max-width: 960px) {
    width: 100%;
    font-size: 4rem;
    line-height: 4.5rem;
    margin: 2rem 0 2rem 0;
    max-width: 600px;
  }
  @media (max-width: 375px) {
    width: 100%;
    font-size: 2.25rem;
    line-height: 2.5rem;
    margin: 2rem 0 4rem 0;
    font-weight: 400;
  }
`

const Markdown = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/Markdown/" } }, sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            id
            headings {
              value
              depth
            }
            frontmatter {
              title
            }
            fields {
              slug
              topLevelDir
              subDir
            }
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout path={props.location.pathname}>
      <BG />
      <SEO
        title={props.pageContext.frontmatter.title}
        site={'Uniswap Markdown'}
        description={props.pageContext.frontmatter.previewText}
        path={props.location.pathname}
      />

      <StyledMarkdown id="Markdown-header">
        <PostHeader>
          <PostTitle>{props.pageContext.frontmatter.title}</PostTitle>
        </PostHeader>
        <StyledMDX>{props.children}</StyledMDX>
      </StyledMarkdown>
    </Layout>
  )
}

export default Markdown
