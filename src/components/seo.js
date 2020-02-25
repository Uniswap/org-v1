import * as React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({
  path,
  description,
  ogImageProp,
  lang = 'en',
  keywords = [],
  title
}) {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)

  const metaDescription = description || data.site.siteMetadata.description
  const author = data.site.siteMetadata.author
  const ogImage = `${data.site.siteMetadata.siteUrl}${
    path ? path : '/'
  }twitter-card.jpg`

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `og:image`,
          content: ogImage
        },
        {
          name: `image`,
          property: `og:image`,
          content: ogImage
        },
        {
          name: `author`,
          content: author
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`
        },
        {
          name: `twitter:creator`,
          content: author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        {
          name: `twitter:image`,
          content: ogImage
        }
      ].concat(
        keywords.length > 0
          ? {
              content: keywords.join(`, `),
              name: `keywords`
            }
          : []
      )}
    />
  )
}

export default SEO
