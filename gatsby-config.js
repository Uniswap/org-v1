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
        description: 'L2 Optimistic rollup demo'
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
    name: 'Info',
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
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-instagram-embed`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-styled-components`,
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
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            name: 'en',
            // A function for filtering nodes. () => true by default
            filterNodes: node => node.fields && node.fields.topLevelDir === 'docs'
            // Add to index custom entries, that are not actually extracted from gatsby nodes
            // customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }]
          }
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'path', store: true },
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'content' }
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          Mdx: {
            path: node => node.fields.slug,
            title: node => node.frontmatter.title,
            content: node => node.rawBody
          }
        }
        //custom index file name, default is search_index.json
        // filename: 'search_index.json',
        //custom options on fetch api call for search_ındex.json
        // fetchOptions: {
        //   credentials: 'same-origin'
        // }
      }
    },
    'gatsby-plugin-eslint'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
