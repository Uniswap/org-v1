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
  padding-top: 2rem;
`

const Posts = styled.div`
  position: relative;
  padding: 2rem;
  margin: 0.5rem;
  width: 100%;
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
    transform: scale(1);
  }

  transform: scale(0.99);
  transition: transform 0.25s ease;

  a {
    color: ${({ theme }) => theme.colors.grey9};
  }
  p {
    max-width: 450px;
  }
  p:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 960px) {
    width: 100%;
  }
`

const PostLinkWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`

const PostTitleWrapper = styled.div`
  min-width: 150px;
`

const PostMetaData = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.grey6};
  width: 100%;
`

const StyledImage = styled(Img)`
  width: 100%;
  border-radius: 12px;
  margin-left: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.huge};

  /* max-width: 256px; */
`

const NewPill = styled.p`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.link};
  padding: 0rem 0.5rem;
  position: absolute;
  left: -1rem;
  top: -0.75rem;
  border-radius: 1rem;
  text-align: center;
  margin: 0;
  transform: rotateZ(-20deg);
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
              previewText
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
    <Layout path={props.paths}>
      <SEO title="Uniswap Blog" path={props.path} />
      <h1>Latest Posts</h1>

      <PostsWrapper>
        {data.allMdx.edges.map(({ node }, index) => {
          return (
            <Posts wide={index} key={node.id}>
              <PostLinkWrapper to={'/blog/' + node.fields.slug}>
                {index === 0 && <NewPill>New</NewPill>}
                <PostTitleWrapper>
                  <h1>{node.frontmatter.title}</h1>

                  {node.frontmatter.previewText ? (
                    <p>{node.frontmatter.previewText} </p>
                  ) : (
                    ''
                  )}

                  <PostMetaData>
                    {node.frontmatter.date +
                      ' - ' +
                      node.fields.readingTime.text}
                  </PostMetaData>
                </PostTitleWrapper>
                {node.frontmatter.featuredImage && (
                  <StyledImage
                    fluid={node.frontmatter.featuredImage.childImageSharp.fluid}
                  />
                )}
              </PostLinkWrapper>
            </Posts>
          )
        })}
      </PostsWrapper>
    </Layout>
  )
}

export default Blog
