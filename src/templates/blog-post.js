import React from 'react'
import { Link, graphql } from 'gatsby'
import { Box, Heading } from 'rebass'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

const PostTitle = styled(Heading)`
  margin-top: ${rhythm(1 / 4)};
  margin-bottom: ${rhythm(1 / 4)};
`

const NextLinks = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <PostTitle fontSize={5}>{post.frontmatter.title}</PostTitle>
        <small>{post.frontmatter.date}</small>
        <Box py={4} dangerouslySetInnerHTML={{ __html: post.html }} />
        <NextLinks as="ul" m={0}>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </NextLinks>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
