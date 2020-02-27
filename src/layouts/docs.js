import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '.'
import SideBar from '../components/sidebar'
import SEO from '../components/seo2'
import TableofContents from '../components/toc'

const GlobalStyle = createGlobalStyle`
  html {
    background-image: none;
    background-color: ${({ theme }) => theme.backgroundColor};
}
`

const StyledDocs = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 960px) {
    flex-direction: column;
  }
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
    margin-bottom: 1em;
    font-size: 2rem;
  }

  h2 {
    margin-top: 4rem !important;
    margin-bottom: 1.5rem;
  }

  h2:before {
    top: -32px;
    left: 0;
    width: 100%;
    height: 1px;
    content: ' ';
    position: absolute;
    background-color: #e6ecf1;
  }

  @media (max-width: 960px) {
    min-width: 100%;
    max-width: 100%;
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
    color: ${({ theme }) => theme.textColor};
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

const Docs = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/docs/" } }
        sort: { order: ASC, fields: fields___slug }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 40)
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
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout path={props.location.pathname}>
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
              title={props.pageContext.frontmatter.title}
              site={'Uniswap ' + title}
              path={props.location.pathname}
              description={node.excerpt}
            />
          )
        })}
      <StyledDocs id="docs-header">
        <SideBar parent={'/docs/'} {...props} />
        <StyledMDX>
          {props.children}
          {data.allMdx.edges
            .filter(({ node }) => {
              return node.fields.slug === props.path
            })
            .map(({ node, next, previous }) => {
              return (
                <StyledDocsNavWrapper key={node.id}>
                  <StyledDocsNav>
                    {previous && (
                      <StyledLink
                        style={{ alignItems: 'flex-end' }}
                        to={previous.fields.slug}
                        rel="prev"
                      >
                        <small>Previous</small>
                        <span>← {previous.frontmatter.title}</span>
                      </StyledLink>
                    )}
                  </StyledDocsNav>
                  <StyledDocsNav>
                    {next && (
                      <StyledLink
                        style={{ alignItems: 'flex-start' }}
                        to={next.fields.slug}
                        rel="next"
                      >
                        <small>Next</small>
                        <span>{next.frontmatter.title} →</span>
                      </StyledLink>
                    )}
                  </StyledDocsNav>
                </StyledDocsNavWrapper>
              )
            })}
        </StyledMDX>
        {data.allMdx.edges
          .filter(({ node }) => {
            return node.fields.slug === props.path
          })
          .map(({ node }) => {
            return (
              <TableofContents
                path={props.path}
                key={node.id}
                headings={node.headings}
              />
            )
          })}
      </StyledDocs>
    </Layout>
  )
}

export default Docs
