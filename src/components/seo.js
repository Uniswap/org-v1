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

function SEO({ description, lang, title, path }) {
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
  const uniTitle = 'Uniswap'

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`${site.siteMetadata.title} | %s`}
    >
      <meta charSet="utf-8" />
      <html lang="en" />
      <meta name="title" content={title} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={title}></meta>
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FF007A" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#FF007A" />

      <meta property="og:title" content={uniTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={'website'} />
      <meta property="og:url" content={site.siteMetadata.siteUrl + path} />
      <meta property="og:image" content={`${site.siteMetadata.siteUrl}${path ? path : '/images/'}twitter-card.jpg`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@Uniswap"></meta>
      <meta name="twitter:site" content="@Uniswap" />
      <meta property="og:image" content={`${site.siteMetadata.siteUrl}${path ? path : '/images/'}twitter-card.jpg`} />

      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
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
