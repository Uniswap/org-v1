const menu = require('./src/utils/menu')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

let gatsbyPlugins = new Array();

// detect local build
if (!process.env.NO_AWS) {
  gatsbyPlugins.push({
    resolve: `gatsby-plugin-s3`,
    options: {
      bucketName: process.env.AWS_S3_BUCKET,
      protocol: 'https',
      hostname: 'uniswap.org',
      acl: null
    }
  });
}

gatsbyPlugins.concat([
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://uniswap.org`
      }
    },
    {
      resolve: 'gatsby-plugin-replace-path',
      options: {
        pattern: /\d+-/g,
        replacement: ''
      }
    },
    `re-slug`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/pages/blog/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/pages/docs/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `faq`,
        path: `${__dirname}/src/pages/faq/`
      }
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-instagram-embed`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-styled-components`,
    `gatsby-background-image`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    'gatsby-remark-reading-time',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/layouts'),
          docs: require.resolve(`./src/layouts/docs`),
          blog: require.resolve(`./src/layouts/blogPost`),
          faq: require.resolve(`./src/layouts/faq`)
        },
        remarkPlugins: [require(`remark-math`)],
        rehypePlugins: [require(`rehype-katex`)],
        gatsbyRemarkPlugins: [
          `gatsby-remark-embedder`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`,
          // `gatsby-remark-check-links`,
          {
            resolve: `gatsby-remark-twitter-cards`,
            options: {
              title: 'Uniswap', // website title
              separator: '|', // default
              author: '@UniswapProtocol',
              background: require.resolve('./static/images/twitter_card_bg.jpg'), // path to 1200x630px file or hex code, defaults to black (#000000)
              fontColor: '#FF3093', // defaults to white (#ffffff)
              fontStyle: 'sans-serif', // default
              titleFontSize: 124, // default
              fontFile: require.resolve('./static/fonts/Inferi-Normal.ttf') // will override fontStyle - path to custom TTF font
            }
          },
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              showCaptions: true
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/fav.ico` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return {
                  description: edge.node.frontmatter.previewText,
                  title: edge.node.frontmatter.title,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug
                }
              })
            },
            query: `
            {
              allMdx(filter: {fileAbsolutePath: {regex: "/blog/"}}, sort: {order: DESC, fields: frontmatter___date}) {
                edges {
                  node {
                    id
                    frontmatter {
                      date
                      title
                      previewText
                    }
                    fields {
                      slug
                    }
                    rawBody
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'Uniswap Blog RSS Feed'
          }
        ]
      }
    },
    'gatsby-plugin-eslint',
    {
      resolve: `gatsby-plugin-algolia-docsearch-appid`,
      options: {
        apiKey: '8962240e69e6d23a88432f501c115470',
        indexName: 'uniswap_v2_docs',
        appId: 'VZ0CVS8XCW',
        inputSelector: 'blank' // use dummy selector to avoid double render
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ])


module.exports = {
  siteMetadata: {
    title: `Uniswap`,
    description: `Automated liquidity protocol on Ethereum`,
    author: `@UniswapProtocol`,
    menulinks: menu,
    siteUrl: `https://uniswap.org`,
    repository: `https://github.com/Uniswap/uniswap-org`,
    commit: process.env.NOW_GITHUB_COMMIT_SHA || `master`
  },
  plugins: gatsbyPlugins
}