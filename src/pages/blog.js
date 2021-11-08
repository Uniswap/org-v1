import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../layouts'
import BG from '../components/bg'
import SEO from '../components/seo'

const StyledBlog = styled.div`
  padding: 0 2rem;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  padding-top: 2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};

  @media (max-width: 960px) {
    flex-direction: column;
    grid-template-columns: 1fr;
    margin-top: 0rem;
  }
`

const PostsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
`

const PageTitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  padding: 4rem;
  @media (max-width: 960px) {
    padding: 0;
  }
`

export const Posts = styled.div`
  margin: 1rem 0;
  position: relative;
  width: 100%;
  text-decoration: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.cardBG};
  backdrop-filter: blur(2px);
  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
  border: 1px solid rgba(0, 0, 0, 0);

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.grey3};
  }
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

export const PostLinkWrapper = styled(Link)`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 960px) {
    > * + * {
      margin-left: 0;
    }
  }
`

export const PostTitleWrapper = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  h2 {
    font-size: 36px;
  }

  @media (max-width: 960px) {
    > * + * {
      margin-left: 0;
    }
  }
`

export const PostMetaData = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.grey6};
  width: 100%;
  justify-self: flex-end;
  p {
    width: initial;
  }
`

export const StyledImage = styled(Img)`
  width: 100%;
  border-radius: 12px;
  height: 420px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 960px) {
    height: 256px;
  }

  @media (max-width: 600px) {
    height: 160px;
  }
`

export const NewPill = styled.p`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.colors.link};
  padding: 0rem 0.5rem;
  position: absolute;
  left: -1rem;
  top: -0.75rem;
  border-radius: 1rem;
  text-align: center;
  margin: 0;
  transform: rotateZ(-20deg);
  z-index: 99;
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
      <StyledBlog>
        <PageTitleWrapper>
          <h2 style={{ fontSize: '56px' }}>Blog</h2>
          <p>
            News, stories, and announcements from Uniswap.{' '}
            <a style={{ paddingBottom: '1rem' }} href="/rss.xml" target="_blank">
              Subscribe
            </a>
          </p>
        </PageTitleWrapper>
        <PostsWrapper>
          {data.allMdx.edges.map(({ node }, index) => {
            return (
              <Posts wide={index} key={node.id}>
                <PostLinkWrapper wide={index} to={node.fields.slug}>
                  {index === 0 && <NewPill>New</NewPill>}
                  <PostTitleWrapper>
                    <h2 style={{ marginTop: '0px' }}>{node.frontmatter.title}</h2>
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
      </StyledBlog>
    </Layout>
  )
}

export default Blog
