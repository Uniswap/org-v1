const menu = [
  {
    name: 'Products',
    sublinks: [
      {
        name: 'Exchange',
        link: '/',
        description: 'Swap, Send and Supply tokens'
      },
      {
        name: 'Info',
        link: '/',
        description: 'Track Uniswap exchanges and token prices'
      },
      {
        name: 'Widget',
        link: '/',
        description: 'Customize and embed token tools on your site'
      },
      { name: 'Oracles', link: '/', description: '' }
    ]
  },
  {
    name: 'Developers',
    sublinks: [
      {
        name: 'Documentation',
        link: '/docs/',
        description: 'Full API, smart contract and integration docs'
      },
      { name: 'Github', link: '/' },
      { name: 'Whitepaper', link: '/' },
      { name: 'Smart Contract ABI', link: '/' },
      { name: 'Javascript SDK', link: '/' }
    ]
  },
  {
    name: 'Community',
    sublinks: [
      { name: 'Twitter', link: '/' },
      { name: 'Discord', link: '/' },
      { name: 'Reddit', link: '/' },
      { name: 'Slack', link: '/' }
    ]
  },
  {
    name: 'About',
    sublinks: [
      { name: 'About', link: '/' },
      { name: 'Team', link: '/' },
      { name: 'Contact', link: '/' },
      { name: 'Guides', link: '/' },
      { name: 'FAQ', link: '/' }
    ]
  }
]

const remark = require('remark')
const stripMarkdown = require('strip-markdown')

module.exports = {
  siteMetadata: {
    title: `Uniswap`,
    description: `Uniswap homepage`,
    author: `@callil`,
    menulinks: menu
  },
  plugins: [
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/layouts'),
          docs: require.resolve(`./src/layouts/docs`),
          guides: require.resolve(`./src/layouts/guides`)
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-code-titles`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          }
        ],
        remarkPlugins: [
          require('remark-git-contributors'),
          require('remark-external-links')
        ]
        // rehypePlugins: [require("rehype-autolink-headings")],
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
      resolve: `gatsby-plugin-scroll-indicator`,
      options: {
        color: `#2172e5`
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
        store: ['id', 'title', 'slug', 'body', 'excerpt'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            path: node.fields.path,
            title: node.frontmatter.title,
            body: node.rawBody,
            excerpt: node.excerpt
          }))
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
