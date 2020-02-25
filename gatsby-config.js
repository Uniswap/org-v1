const menu = [
  {
    name: 'Products',
    sublinks: [
      {
        name: 'Exchange',
        link: 'https://uniswap.exchange/',
        description: 'Swap, Send and Supply tokens'
      },
      {
        name: 'Info',
        link: 'https://uniswap.info/',
        description: 'Track Uniswap exchanges and token prices'
      },
      {
        name: 'Unisocks',
        link: 'https://unisocks.exchange/',
        description: 'Dynamically priced Socks'
      },
      {
        name: 'Unipig',
        link: 'https://unipig.exchange/',
        description: 'L2 Optimstic rollup demo'
      }
    ]
  },
  {
    name: 'Developers',
    sublinks: [
      {
        name: 'Documentation',
        link: '/docs',
        description: 'Full API, smart contract and integration docs'
      },
      { name: 'Github', link: 'https://github.com/Uniswap' },
      { name: 'Whitepaper', link: '/docs' },
      {
        name: 'Smart Contract ABI',
        link: '/docs/smart-contract-api/exchange/'
      },
      {
        name: 'Javascript SDK',
        link: '/docs/SDK-documentation/get-started/'
      }
    ]
  },
  {
    name: 'Community',
    sublinks: [
      { name: 'Twitter', link: 'https://twitter.com/UniswapExchange' },
      { name: 'Discord', link: 'https://discord.gg/Y7TF6QA' },
      { name: 'Reddit', link: 'https://www.reddit.com/r/UniSwap/' }
    ]
  },
  {
    name: 'About',
    sublinks: [
      // { name: 'About', link: '/about' },
      // { name: 'Team', link: '/about#team' },
      { name: 'Blog', link: '/blog' },
      // { name: 'Contact', link: '/contact' },
      { name: 'FAQ', link: '/faq' }
    ]
  }
]

const cards = [
  {
    slug: 'http://uniswap.exchange',
    cardTitle: 'Swap any token on Ethereum',
    cardDesc:
      'Use uniswap.exchange or integrate into your project using the SDK.',
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
    cardDesc:
      'Provide liquidity to earn .03% of all spread fees for adding market depth.',
    cardButton: 'How pooling works'
  },
  {
    slug: '/docs',
    cardTitle: 'Build decentralized price feeds',
    cardDesc: 'Perfect TWAPs on chain, customizable to your risk profile.',
    type: 'New',
    cardButton: 'Read the SDK'
  }
]

const remark = require('remark')
const stripMarkdown = require('strip-markdown')

module.exports = {
  siteMetadata: {
    title: `Uniswap`,
    description: `Uniswap homepage`,
    author: `@UniswapExchange`,
    menulinks: menu,
    cardlinks: cards,
    siteUrl: `https://uniswap-site-v2.now.sh/`,
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
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    'gatsby-plugin-instagram-embed',
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-styled-components`,
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
          `gatsby-remark-twitter-cards`,
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
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
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'docs',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'lunr',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allMdx {
              nodes {
                id
                frontmatter {
                  title
                }
                fields{
                  slug
                }
                rawBody
                excerpt
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'path', 'title', 'body', 'excerpt'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            path: node.fields.slug,
            title: node.frontmatter.title,
            body: node.rawBody,
            excerpt: node.excerpt
          }))
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
    }

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
