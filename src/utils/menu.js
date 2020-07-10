const menu = [
  {
    name: 'Products',
    sublinks: [
      {
        name: 'App',
        link: 'https://app.uniswap.org/#/',
        description: 'Swap tokens and supply liquidity'
      },
      {
        name: 'Analytics',
        link: 'https://uniswap.info/',
        description: 'Uniswap analytics and historical data'
      },
      {
        name: 'Unisocks',
        link: 'https://unisocks.exchange/',
        description: 'Dynamically priced socks'
      },
      {
        name: 'Unipig',
        link: 'https://unipig.exchange/',
        description: 'Optimistic rollup demo'
      }
    ]
  },
  {
    name: 'Developers',
    sublinks: [
      {
        name: 'Documentation',
        link: '/docs',
        description: 'Comprehensive smart contract and frontend integration docs'
      },
      { name: 'Github', link: 'https://github.com/Uniswap' },
      { name: 'Whitepaper', link: '/whitepaper.pdf' },
      { name: 'Audit', link: '/audit.html' },
      { name: 'Bug Bounty', link: '/bug-bounty' }
    ]
  },
  {
    name: 'Community',
    sublinks: [
      { name: 'Twitter', link: 'https://twitter.com/UniswapProtocol' },
      { name: 'Discord', link: 'https://discord.gg/XErMcTq' },
      { name: 'Reddit', link: 'https://www.reddit.com/r/Uniswap' }
    ]
  },
  {
    name: 'Info',
    sublinks: [
      { name: 'Blog', link: '/blog', description: 'Stay up to date on Uniswap' },
      {
        name: 'FAQ',
        link: '/faq'
      },
      { name: 'About', link: '/about' },
      {
        name: 'Jobs',
        link: '/About'
      },
      { name: 'Brand Assets', link: '/about#brand-assets' }
    ]
  }
]

module.exports = menu
