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
      { name: 'Community', link: '/' },
      { name: 'Contact', link: '/' },
      { name: 'Guides', link: '/' },
      { name: 'FAQ', link: '/' }
    ]
  }
]

module.exports = {
  siteMetadata: {
    title: `Uniswap`,
    description: `Uniswap homepage`,
    author: `@callil`,
    menulinks: menu
  },
  plugins: [
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
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true
            }
          },
          `gatsby-remark-code-buttons`,
          `gatsby-remark-autolink-headers`,
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
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
