/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, title, path }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content={'website'} />
      <meta name="og:url" content={site.siteMetadata.siteUrl + path} />
      <meta
        property="og:image"
        content={`${site.siteMetadata.siteUrl}${
          path ? path : '/'
        }twitter-card.jpg`}
      />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:url" content={site.siteMetadata.siteUrl + path} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={`${site.siteMetadata.siteUrl}${
          path ? path : '/'
        }twitter-card.jpg`}
      />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default SEO
