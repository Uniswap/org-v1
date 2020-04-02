import React from 'react'
import Layout from '.'
import styled from 'styled-components'
import Moment from 'react-moment'
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
  padding: 8rem 0 5rem 0;
  @media (max-width: 960px) {
    min-width: 100%;
    max-width: 100%;
  }
`

const PostMetaData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1rem;
  margin-bottom: 1rem;
  /* font-size: .75rem */
  
  /* color: ${({ theme }) => theme.colors.grey6}; */
  width: 100%;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const PostTitle = styled.h1`
  font-size: 4rem;
  /* font-weight: 600 !important; */
  margin-bottom: 1rem;
  /* letter-spacing: 0.04rem; */
  /* font-family: 'Times Ten LT Std', 'Times New Roman', serif; */
  /* font-weight: 00; */
  font-size: 72px;
  margin: 2rem 0 1rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;

  /* font-family: 'Times New Roman', serif; */

  /* text-align: center; */
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

const PostAuthor = styled.p`
  margin: 0;
`

const PostDate = styled(Moment)`
  margin: 0;
`

const StyledDocsNavWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  margin-bottom: 2rem;  
  padding-top: 3rem;

  padding-bottom: 3rem;
  /* border-top: 1px solid ${({ theme }) => theme.colors.grey2}; */

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  width: 100%;
  flex-wrap: wrap;
`
const StyledDocsNav = styled.li`
  a {
    color: ${({ theme }) => theme.textColor};
  }
  @media (max-width: 960px) {
    width: 100%;
  }
`

const StyledLink = styled(Link)`
  font-size: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  small {
    font-size: 0.75rem;
    opacity: 0.6;
  }
  @media (max-width: 960px) {
    width: 100%;
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
