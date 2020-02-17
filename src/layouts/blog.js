import React from 'react'
import { Link } from 'gatsby'
import Layout from '.'
import styled from 'styled-components'

import { useStaticQuery, graphql } from 'gatsby'

const StyledBlog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledMDX = styled.div`
  /* width: 640px; */
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
`

const StyledDocsNavWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  margin-top: 2rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`
const StyledDocsNav = styled.li`
  a {
    color: black;
  }
`

const StyledLink = styled(Link)`
  font-size: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  small {
    font-size: 0.75rem;
    opacity: 0.6;
  }
`

const Blog = ({ path, children }) => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
        sort: { order: ASC, fields: fields___slug }
      ) {
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
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  console.log(path)

  return (
    <Layout path={path}>
      <StyledBlog id="blog-header">
        <StyledLink>{path}</StyledLink>
        <StyledMDX>{children}</StyledMDX>
      </StyledBlog>
    </Layout>
  )
}

export default Blog
