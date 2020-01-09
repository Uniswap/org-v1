import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SideBar from '../components/sidebar'
import styled from 'styled-components'
// import Mdx from "./mdx"

import { useStaticQuery, graphql } from 'gatsby'

const StyledDocs = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`

const StyledMDX = styled.div`
  min-width: 756px;
  max-width: 756px;
  padding: 1rem;
`

const DocsLayout = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/docs/" }
          frontmatter: { title: { regex: "" } }
        }
      ) {
        edges {
          node {
            id
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
        <SideBar parent={'/docs/'} />
        <StyledMDX>
          {/* <Mdx> {props.children}</Mdx> */}
          {props.children}
          {data.allMdx.edges.map(({ node, next, previous }) => {
            if ('/docs' + node.fields.slug === props.path) {
              return (
                <>
                  <li>
                    {previous && (
                      <Link to={'/docs/' + previous.fields.slug} rel="prev">
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li>
                    {next && (
                      <Link to={'/docs/' + next.fields.slug} rel="next">
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </li>
                </>
              )
            }
          })}
        </StyledMDX>
      </StyledDocs>
    </Layout>
  )
}

export default DocsLayout
