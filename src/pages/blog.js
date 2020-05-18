import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../layouts'
import BG from '../components/bg'
import SEO from '../components/seo'

const PostsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
  padding: 2rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
`

const Posts = styled.div`
  position: relative;
  padding: 2rem;
  margin: 0.5rem;
  width: 100%;
  max-width: 960px;
  box-shadow: ${({ theme, index }) => (index === 0 ? theme.shadows.huge : 'none')};
  border-radius: 20px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.cardBG};
  /* border: 1px solid ${({ theme, index }) => (index === 0 ? 'none' : theme.colors.grey2)}; */

  :hover {
    transform: scale(1.02);
  }

  transform: scale(1);
  transition: transform 0.25s ease;

  h1 {
    max-width: 960px;
  }

  a {
    color: ${({ theme }) => theme.textColor};
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
  h1 {
    /* font-family: 'Times Ten LT Std', 'Times New Roman', serif; */
  }
`

const PostMetaData = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.grey6};
  width: 100%;
  p {
    width: initial;
  }
`

const StyledImage = styled(Img)`
  width: 100%;
  border-radius: 12px;
  margin-left: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.huge};
  @media (max-width: 960px) {
    display: none;
    max-width: 256px;
  }
`

const NewPill = styled.p`
  color: ${({ theme }) => theme.invertedTextColor};
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
      allMdx(filter: { fileAbsolutePath: { regex: "/blog/" } }, sort: { order: DESC, fields: frontmatter___date }) {
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
    <Layout path={props.location.pathname}>
      <BG />
      <SEO title="Uniswap Blog" path={props.location.pathname} />

      <PostsWrapper>
        <h1>Latest Posts</h1>
        <a style={{ paddingBottom: '1rem' }} href="/rss.xml" target="_blank">
          Subscribe
        </a>

        {data.allMdx.edges.map(({ node }, index) => {
          return (
            <Posts wide={index} key={node.id}>
              <PostLinkWrapper to={node.fields.slug}>
                {index === 0 && <NewPill>New</NewPill>}
                <PostTitleWrapper>
                  <h1 style={{ marginTop: '0px' }}>{node.frontmatter.title}</h1>

                  {node.frontmatter.previewText ? <p>{node.frontmatter.previewText} </p> : ''}

                  <PostMetaData>{node.frontmatter.date + ' - ' + node.fields.readingTime.text}</PostMetaData>
                </PostTitleWrapper>
                {node.frontmatter.featuredImage && (
                  <StyledImage fluid={node.frontmatter.featuredImage.childImageSharp.fluid} />
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
