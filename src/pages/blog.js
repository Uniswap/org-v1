import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../layouts'
import Img from 'gatsby-image'

import SEO from '../components/seo'

const PostsWrapper = styled.div`
  color: ${({ theme }) => theme.colors.grey9};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const Posts = styled.div`
  padding: 2rem;
  margin: 0.5rem;
  width: ${({ wide }) => (wide === 0 ? '100%' : '30%')};
  /* max-width: 356px; */
  box-shadow: ${({ theme, index }) =>
    index === 0 ? theme.shadows.huge : 'none'};

  border-radius: 20px;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid
    ${({ theme, index }) => (index === 0 ? 'none' : theme.colors.grey2)};

  :hover {
    background-color: rgba(255, 255, 255, 0.6);
  }

  a {
    color: ${({ theme }) => theme.colors.grey9};
  }
`

const PostMetaData = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.grey6};
  width: 100%;
`

const StyledImage = styled(Img)`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.huge};

  /* max-width: 256px; */
`

const Blog = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              date(formatString: "MMMM Do, YYYY")
              title
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
              readingTime {
                text
              }
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
    <Layout path={props.path}>
      <SEO title="Uniswap Blog" />
      <h3>Latest Posts</h3>

      <PostsWrapper>
        {data.allMdx.edges.map(({ node }, index) => {
          return (
            <Posts wide={index} key={node.id}>
              <Link to={'/blog/' + node.fields.slug}>
                <StyledImage
                  fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
                />

                <h1>{node.frontmatter.title}</h1>

                <PostMetaData>
                  {node.frontmatter.date + ' - ' + node.fields.readingTime.text}
                </PostMetaData>
                <p>{node.excerpt}</p>
              </Link>
            </Posts>
          )
        })}
      </PostsWrapper>
    </Layout>
  )
}

export default Blog
