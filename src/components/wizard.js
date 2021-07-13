import React, { useState } from 'react'
import InlineCard from './inlineCard'

import styled from 'styled-components'

const links = [
  {
    name: 'Developers',
    sublinks: [
      {
        title: 'Token Swaps',
        link: 'https://docs.uniswap.org/protocol/guides/swaps/single-swaps',
        description: 'Simplify the process of integrating Uniswap into your project.',
        tag: 'reference',
        icon: '📦'
      },
      {
        title: 'Programmable Liquidity',
        link: 'https://docs.uniswap.org/protocol/reference/periphery/NonfungiblePositionManager',
        description: 'Explore the NFT position manager.',
        tag: 'tutorial',
        icon: '🧼'
      },

      {
        title: 'Flash Swaps',
        link: 'https://docs.uniswap.org/protocol/guides/flash-integrations/inheritance-constructors',
        description: 'Withdraw the reserves of any ERC20 token on Uniswap and execute arbitrary logic.',
        tag: 'guide',
        icon: '⚡'
      },
      {
        title: 'Oracles',
        link: 'https://docs.uniswap.org/protocol/concepts/V3-overview/oracle',
        description: 'Highly decentralized, manipulation-resistant, on-chain price feeds.',
        icon: '🔮'
      }
    ]
  },
  {
    name: 'Traders',
    sublinks: [
      {
        title: 'Using the interface',
        link: '/docs/v2/user-guide/',
        description: 'The comprehensive web app user guide.',
        tag: 'tutorial'
      },
      {
        title: 'Glossary',
        link: '/docs/v2/protocol-overview/glossary',
        description: 'An overview of the terms used in these docs and on the interface',
        tag: 'reference'
      },
      {
        title: 'Understanding prices',
        link: '/docs/v2/swaps/pricing/',
        description: 'How the interface calculates prices for swaps.',
        tag: 'guide'
      }
    ]
  },
  {
    name: 'Liquidity',
    sublinks: [
      {
        title: 'Anatomy of a Uniswap Pool',
        link: '/docs/v2/pools',
        description: 'An overview of what a Uniswap liquidity pool.'
      },
      {
        title: 'Understanding Liquidity Returns',
        link: '/docs/v2/pools/understanding-returns',
        description: 'Udnerstand the economics of your returns.'
      }
    ]
  },
  {
    name: 'Tokens',
    sublinks: [
      {
        title: 'Core Concepts',
        link: '/docs/v2/protocol-overview',
        description: 'A high level technical overview of the Uniswap protocol.'
      }
    ]
  }
]

const StyledWizard = styled.div`
  color: ${({ theme, outlined }) => (outlined ? theme.colors.link : theme.textColor)};
  width: 100%;
  max-width: 720px;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 960px) {
    width: 100%;
    max-width: 450px;
    margin: 1rem 0;
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const Wizard = () => {
  const [currentCategory] = useState('Developers')

  return (
    <StyledWizard>
      <CardWrapper>
        {links
          .filter(category => {
            return category.name === currentCategory
          })
          .map(category => {
            return category.sublinks.map((sublink, i) => {
              return (
                <InlineCard
                  key={i}
                  title={sublink.title}
                  desc={sublink.description}
                  to={sublink.link}
                  tag={sublink.tag}
                  icon={sublink.icon}
                />
              )
            })
          })}
      </CardWrapper>
    </StyledWizard>
  )
}

export default Wizard
