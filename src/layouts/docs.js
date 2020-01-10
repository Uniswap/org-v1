import React, { useRef } from 'react'
import { Link } from 'gatsby'
import Layout from '.'
import SideBar from '../components/sidebar'
import styled from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'

import { useStaticQuery, graphql } from 'gatsby'

import Slugger from 'github-slugger'

const slugger = new Slugger()

const StyledHeadingListElement = styled.li`
  margin-left: ${({ depth }) => depth && depth / 2 + 'rem'};
`

const StyledHeadingLink = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
`

const Heading = ({ heading }) => {
  const slug = slugger.slug(heading.value)
  slugger.reset()
  return (
    <StyledHeadingListElement key={heading.value} depth={heading.depth}>
      <StyledHeadingLink onClick={() => scrollTo('#' + slug)}>
        {heading.value}
      </StyledHeadingLink>
    </StyledHeadingListElement>
  )
}

const StyledTOC = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: -webkit-sticky;
  position: sticky;
  top: 3rem;
  align-self: flex-start;
  max-width: 256px;
  font-size: 0.75rem;
  margin-top: 6rem;
  margin-right: 3rem;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  list-style: none;
  text-decoration: none;

  :hover {
    opacity: 1;
  }

  li {
    /* margin: 0; */
    padding: 0;
  }
`

const TableofContents = ({ headings }) => (
  <StyledTOC>
    {headings
      .filter(heading => heading.depth !== 1)
      .map(heading => (
        <Heading key={heading.value} heading={heading} />
      ))}
  </StyledTOC>
)

const StyledDocs = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  justify-content: space-between;
`

const StyledMDX = styled.div`
  min-width: 756px;
  max-width: 756px;
  margin-top: 5.5rem;
  padding: 0 2rem;
  margin-bottom: 3rem;
  a {
    color: #2172e5;
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

  return (
    <Layout>
      <StyledDocs id="docs-header">
        <SideBar parent={'/docs/'} {...props} />
        <StyledMDX>
          {props.children}
          {data.allMdx.edges.map(({ node, next, previous }) => {
            if ('/docs' + node.fields.slug === props.path) {
              return (
                <StyledDocsNavWrapper key={node.id}>
                  <StyledDocsNav>
                    {previous && (
                      <StyledLink
                        style={{ alignItems: 'flex-end' }}
                        to={'/docs/' + previous.fields.slug}
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
                        to={'/docs/' + next.fields.slug}
                        rel="next"
                      >
                        <small>Next</small>
                        <span>{next.frontmatter.title} →</span>
                      </StyledLink>
                    )}
                  </StyledDocsNav>
                </StyledDocsNavWrapper>
              )
            }
          })}
        </StyledMDX>
        {data.allMdx.edges.map(({ node }) => {
          if ('/docs' + node.fields.slug === props.path) {
            return <TableofContents key={node.id} headings={node.headings} />
          }
        })}
      </StyledDocs>
    </Layout>
  )
}

export default Docs
