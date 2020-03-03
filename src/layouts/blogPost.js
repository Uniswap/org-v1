import React from 'react'
import Layout from '.'
import styled from 'styled-components'
import Moment from 'react-moment'
import { graphql, useStaticQuery, Link } from 'gatsby'

// import { Twitter, Facebook } from 'react-social-sharing'
import SEO from '../components/seo2'

const StyledBlog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const StyledMDX = styled.div`
  min-width: 550px;
  max-width: 768px;
  padding: 0;
  margin-bottom: 3rem;
  a {
    color: ${({ theme }) => theme.colors.link};
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
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
`

const PostHeader = styled.div`
  font-size: 1.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 550px;
  max-width: 768px;
  padding: 8rem 0;
  @media (max-width: 960px) {
    min-width: 100%;
    max-width: 100%;
  }
`

const PostMetaData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.grey6};
  width: 100%;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const PostTitle = styled.h1`
  font-family: 'Inter';
  font-size: 4rem;
  font-weight: 800 !important;
  margin-bottom: 2rem;
  /* text-align: center; */
  @media (max-width: 960px) {
    font-size: 3rem;
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
  margin-top: 2rem;
  padding-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grey2};
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
      allMdx(filter: { fileAbsolutePath: { regex: "/blog/" } }, sort: { order: ASC, fields: fields___slug }) {
        edges {
          node {
            id
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
      {/* <SEO title={pageContext.frontmatter.title} path={path} /> */}
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
          {/* <div>
            <Twitter
              style={{ padding: '0.5em 0.5em' }}
              solid
              small
              message={props.pageContext.frontmatter.title}
              link={'https://uniswap.org' + props.path}
            />
            <Facebook style={{ padding: '0.5em 0.5em' }} solid small link="http://sharingbuttons.io" />
          </div> */}
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
