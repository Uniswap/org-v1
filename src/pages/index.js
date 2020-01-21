import React from 'react'
import styled, { keyframes } from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'

import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import Card from '../components/card'
import Marquee from '../components/marquee'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'

const StyledCardsWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const StyledBackgroundWrapper = styled(BackgroundImage)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
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
  /* animation: ${rotate} 100s linear infinite; */
  p {
    margin: 0px;
    margin-right: 1rem;
    font-size: 1rem;
  }
`

const StyledUnicornImage = styled(Img)`
  position: absolute !important;
  right: 0px;
  top: 11rem;
  width: 50%;
  background-color: none;
  border-radius: 8px 0px 0px 8px;
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
      unicornImage: file(relativePath: { eq: "uni_image.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      noise: file(relativePath: { eq: "bg_texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <StyledBackgroundWrapper
        fadeIn={false}
        durationFadeIn={0}
        backgroundColor={false}
        loading={'eager'}
        fluid={data.noise.childImageSharp.fluid}
      >
        <StyledUnicornImage fluid={data.unicornImage.childImageSharp.fluid} />
      </StyledBackgroundWrapper>

      <StyledBody>
        <StyledBodyTitle>
          A protocol for automated token exchange on Ethereum.
        </StyledBodyTitle>
        <p>Core infrastructure for decentralized finance.</p>

        <StyledDownArrow onClick={() => scrollTo('#down')}>↓</StyledDownArrow>
      </StyledBody>

      <Stats>
        <Marquee>
          <p>
            Total Liquidity: <b>$26,024,434</b>
          </p>
          <p>Uniswap ETH Price: $185.83</p>
          <a href="/">Total Liquidity: $26,024,434</a>
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
          <a href="/">Total Liquidity: $26,024,434</a>
          <p>Total Liquidity: $26,024,434</p>
          <p>Uniswap ETH Price: $185.83</p>
        </Marquee>
      </Stats>

      <StyledSection id="down">
        <StyledSectionHeader>{'Use Uniswap to...'}</StyledSectionHeader>
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
