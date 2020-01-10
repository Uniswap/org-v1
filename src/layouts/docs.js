import React, { useRef } from 'react'
import { Link } from 'gatsby'
import Layout from '.'
import SideBar from '../components/sidebar'
import styled from 'styled-components'
import { InView } from 'react-intersection-observer'

import { useStaticQuery, graphql } from 'gatsby'

import Slugger from 'github-slugger'

const slugger = new Slugger()

const StyledHeadingLink = styled.a`
  text-decoration: none;
  margin-left: ${({ depth }) => depth && depth / 2 + 'rem'};
  color: #2172e5;
`

const Heading = ({ heading }) => {
  const slug = slugger.slug(heading.value)
  slugger.reset()
  return (
    <li key={heading.value}>
      <StyledHeadingLink href={'#' + slug} depth={heading.depth}>
        {heading.value}
      </StyledHeadingLink>
    </li>
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
  color: #2172e5;
  min-width: 256px;
  font-size: 0.75rem;
  /* padding-left: 3rem; */
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
  margin-top: 4rem;
`

const StyledDocsNavWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  margin: 0;
`
const StyledDocsNav = styled.li`
  font-size: 1.25rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: 1rem 1.5rem;

  a {
    text-decoration: none;
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
      <StyledDocs>
        <SideBar parent={'/docs/'} {...props} />
        <StyledMDX>
          {props.children}
          {data.allMdx.edges.map(({ node, next, previous }) => {
            if ('/docs' + node.fields.slug === props.path) {
              return (
                <StyledDocsNavWrapper key={node.id}>
                  <StyledDocsNav>
                    {previous && (
                      <Link to={'/docs/' + previous.fields.slug} rel="prev">
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </StyledDocsNav>
                  <StyledDocsNav>
                    {next && (
                      <Link to={'/docs/' + next.fields.slug} rel="next">
                        {next.frontmatter.title} →
                      </Link>
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
