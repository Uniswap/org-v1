const menu = [
  {
    name: 'Products',
    sublinks: [
      {
        name: 'Exchange',
        link: 'https://uniswap.exchange/',
        description: 'Swap tokens and supply liquidity'
      },
      {
        name: 'Info',
        link: 'https://uniswap.info/',
        description: 'Track Uniswap exchanges and token prices'
      },
      {
        name: 'Unisocks',
        link: 'https://unisocks.exchange/',
        description: 'Dynamically priced socks'
      }
    ]
  },
  {
    name: 'Developers',
    sublinks: [
      {
        name: 'Documentation',
        link: '/docs',
        description: 'Comprehensive smart contract and integration docs'
      },
      { name: 'Github', link: 'https://github.com/Uniswap' },
      { name: 'Whitepaper', link: '/whitepaper.pdf' }
    ]
  },
  {
    name: 'Community',
    sublinks: [
      { name: 'Twitter', link: 'https://twitter.com/UniswapExchange' },
      { name: 'Discord', link: 'https://discord.gg/Y7TF6QA' },
      { name: 'Reddit', link: 'https://www.reddit.com/r/Uniswap' }
    ]
  },
  {
    name: 'Info',
    sublinks: [
      { name: 'Blog', link: '/blog', description: 'Discussing all things Uniswap' },
      {
        name: 'FAQ',
        link: '/',
        description: 'Coming soon!'
      },
      { name: 'About', link: '/about' }
    ]
  }
]

const cards = [
  {
    slug: 'http://uniswap.exchange',
    cardTitle: 'Swap any token on Ethereum',
    cardDesc: 'Use uniswap.exchange or integrate into your project using the SDK.',
    cardButton: 'Swap now'
  },
  {
    slug: '/docs',
    cardTitle: 'Add liquidity for any project',
    cardDesc: 'Add liquidity or create an exchange for any ERC20 token.',
    cardButton: 'Integrate your project'
  },
  {
    slug: '/docs',
    cardTitle: 'Earn fees through passive market making',
    cardDesc: 'Provide liquidity to earn 0.3% of all spread fees for adding market depth.',
    cardButton: 'How pooling works'
  },
  {
    slug: '/docs',
    cardTitle: 'Build decentralized price feeds',
    cardDesc: 'Perfect time-weighted average prices on chain, customizable to your risk profile.',
    type: 'New',
    cardButton: 'Read the SDK'
  }
]

module.exports = {
  siteMetadata: {
    title: `Uniswap`,
    description: `Automated token exchange on Ethereum`,
    author: `@UniswapExchange`,
    menulinks: menu,
    cardlinks: cards,
    siteUrl: `https://uniswap.org`,
    repository: `https://github.com/Uniswap/uniswap-site-v2`,
    commit: process.env.NOW_GITHUB_COMMIT_SHA || `master`
  },
  plugins: [
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
        name: `guides`,
        path: `${__dirname}/src/pages/guides/`
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
          guides: require.resolve(`./src/layouts/guides`)
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-embedder`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-check-links`,
          {
            resolve: `gatsby-remark-twitter-cards`,
            options: {
              title: 'Uniswap', // website title
              separator: '|', // default
              author: '@UniswapExchange',
              background: require.resolve('./src/images/twitter_card_bg.jpg'), // path to 1200x630px file or hex code, defaults to black (#000000)
              fontColor: '#FF3093' // defaults to white (#ffffff)
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
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
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
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'V1',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'lunr',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
        {
          allMdx(filter: {fileAbsolutePath: {regex: "/docs/v1/"}}) {
            nodes {
              id
              frontmatter {
                title
              }
              fields {
                slug
              }
              rawBody
            }
          }
        }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['id', 'path', 'title', 'content'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'path', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            path: node.fields.slug,
            title: node.frontmatter.title,
            content: node.rawBody
          }))
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'V2',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'lunr',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
        {
          allMdx(filter: {fileAbsolutePath: {regex: "/docs/v2/"}}) {
            nodes {
              id
              frontmatter {
                title
              }
              fields {
                slug
              }
              rawBody
            }
          }
        }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['id', 'path', 'title', 'content'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'path', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            path: node.fields.slug,
            title: node.frontmatter.title,
            content: node.rawBody
          }))
      }
    },
    'gatsby-plugin-eslint'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
