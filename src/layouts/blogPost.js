import React from 'react'
import Layout from '.'
import styled from 'styled-components'
import Moment from 'react-moment'
import { graphql, useStaticQuery, Link } from 'gatsby'

import SEO from '../components/seo'
import BG from '../components/bg'

import '../styles/prism-github.css'

const StyledBlog = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  /* padding: 2rem 5rem; */
  margin-bottom: 2rem;
  @media (max-width: 960px) {
    padding: 1rem;
  }
`

const StyledMDX = styled.div`
  min-width: 550px;
  max-width: 650px;
  padding: 0;
  margin-bottom: 3rem;
  margin-left: 3rem;
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
    margin-left: 0;
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
  img {
    border-radius: 4px;
    background-color: transparent;
  }
  .gatsby-resp-image-background-image {
    border-radius: 12px;
    background-color: transparent;
  }
`

const PostHeader = styled.div`
  font-size: 1.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 550px;
  padding: 4rem 0 5rem 0;
  @media (max-width: 960px) {
    min-width: 100%;
    max-width: 100%;
  }
`

const PostMetaData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1rem;
  opacity: 0.6;

  /* width: 100%; */
  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const PostTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
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

const Blog = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/blog/" } }, sort: { order: DESC, fields: frontmatter___date }) {
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
        site={'Uniswap Blog'}
        description={props.pageContext.frontmatter.previewText}
        path={props.location.pathname}
      />

      <StyledBlog id="blog-header">
        <PostHeader>
          <PostTitle>{props.pageContext.frontmatter.title}</PostTitle>
          <PostMetaData>
            <PostAuthor>{props.pageContext.frontmatter.author}</PostAuthor> {' — '}
            <PostDate parse="YYYY-MM-DD" format="MMMM Do, YYYY">
              {props.pageContext.frontmatter.date}
            </PostDate>
          </PostMetaData>
        </PostHeader>

        <StyledMDX>{props.children}</StyledMDX>
        {data.allMdx.edges
          .filter(({ node }) => {
            return node.fields.slug === props.path
          })
          .map(({ node, next, previous }) => {
            return (
              <StyledDocsNavWrapper key={node.id}>
                <StyledDocsNav>
                  {previous && (
                    <StyledLink style={{ alignItems: 'flex-end' }} to={previous.fields.slug} rel="prev">
                      <small>Previous</small>
                      <span>← {previous.frontmatter.title}</span>
                    </StyledLink>
                  )}
                </StyledDocsNav>
                <StyledDocsNav>
                  {next && (
                    <StyledLink style={{ alignItems: 'flex-start' }} to={next.fields.slug} rel="next">
                      <small>Next</small>
                      <span>{next.frontmatter.title} →</span>
                    </StyledLink>
                  )}
                </StyledDocsNav>
              </StyledDocsNavWrapper>
            )
          })}
      </StyledBlog>
    </Layout>
  )
}

export default Blog
