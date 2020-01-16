import React from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'
import Tilt from 'react-tilt'

import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import Card from '../components/card'
import noise from '../images/bg_texture.jpg'
import uni_image from '../images/uni_image.jpg'

const StyledCardsWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const StyledBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  background-image: url(${noise});
  background-repeat: no-repeat;
  background-size: contain;
  z-index: -999;
  padding: 4rem;
  overflow: visible;
`

const StyledBody = styled.div`
  /* min-height: 60vh; */
  padding: 4rem;
`

const StyledSection = styled.div`
  padding: 4rem;
  margin-top: 6rem;
`

const StyledBodyTitle = styled.div`
  font-family: 'Principal Trial Semibold';
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  max-width: 556px;
  margin-bottom: 2rem;
  @media (min-width: 1441px) {
    font-size: 4vw;
    line-height: 4.25vw;
    max-width: 40vw;
  }
`

const rotate = keyframes`
  from {
    transform: translateX(0px);
  }

  to {
    transform: translateX(-9000px);
  }
`

const Stats = styled.div`
  width: 10000px;
  background-color: black;
  /* height: 56px; */
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0px;
  color: white;
  align-items: center;
  z-index: 999;
  animation: ${rotate} 100s linear infinite;
  p {
    margin: 0px;
    margin-right: 1rem;
    font-size: 1rem;
  }
`

const StyledUnicornImage = styled.img`
  position: absolute;
  right: 0px;
  top: 11rem;
  width: 50%;
  background-color: none;
  border-radius: 20px 0px 0px 20px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
`

const StyledDownArrow = styled.a`
  font-weight: 300;
  font-size: 48px;
  position: absolute;
  margin-top: 5rem;
  color: ${({ theme }) => theme.colors.link};
`

const StyledSectionHeader = styled.p`
  font-weight: 400;
  font-size: 1.5rem;
`

const IndexPage = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/guides/" }
          frontmatter: { title: { eq: "Overview" } }
        }
        sort: { order: ASC, fields: fields___slug }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              cardTitle
              cardDesc
              type
            }
            fields {
              slug
              subDir
              topLevelDir
            }
            fileAbsolutePath
            excerpt
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <StyledBackgroundWrapper>
        <Tilt
          style={{ background: '#000', borderRadius: '8px' }}
          options={{
            scale: 1.01,
            max: 10,
            glare: true,
            'max-glare': 1,
            speed: 1000
          }}
        >
          <StyledUnicornImage src={uni_image} />
        </Tilt>
      </StyledBackgroundWrapper>

      <StyledBody>
        <StyledBodyTitle>
          A protocol for automated token exchange on Ethereum.
        </StyledBodyTitle>
        <p>Core infrastructure for decentralized finance.</p>

        <StyledDownArrow onClick={() => scrollTo('#down')}>↓</StyledDownArrow>
      </StyledBody>

      <Stats>
        <p>
          Total Liquidity: <b>$26,024,434</b>
        </p>
        <p>Uniswap ETH Price: $185.83</p>
        <p>Total Liquidity: $26,024,434</p>
        <p>Uniswap ETH Price: $185.83</p>
        <p>Total Liquidity: $26,024,434</p>
        <p>Uniswap ETH Price: $185.83</p>
        <p>Total Liquidity: $26,024,434</p>
        <p>Uniswap ETH Price: $185.83</p>
        <p>Total Liquidity: $26,024,434</p>
        <p>Uniswap ETH Price: $185.83</p>
        <p>Total Liquidity: $26,024,434</p>
        <p>Uniswap ETH Price: $185.83</p>
        <p>Total Liquidity: $26,024,434</p>
        <p>Uniswap ETH Price: $185.83</p>
        <p>Total Liquidity: $26,024,434</p>
        <p>Uniswap ETH Price: $185.83</p>
        <p>Total Liquidity: $26,024,434</p>
        <p>Uniswap ETH Price: $185.83</p>
      </Stats>

      <StyledSection id="down">
        <StyledSectionHeader>{'How Uniswap works...'}</StyledSectionHeader>
        <StyledCardsWrapper>
          {data.allMdx.edges.map(({ node }, index) => {
            return <Card key={node.id} index={index} node={node} />
          })}
        </StyledCardsWrapper>
      </StyledSection>
    </Layout>
  )
}

export default IndexPage
