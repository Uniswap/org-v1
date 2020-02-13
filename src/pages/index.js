import React from 'react'
import styled, { keyframes } from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'
import TextLoop from 'react-text-loop'

import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import Card from '../components/card'
import Marquee from '../components/marquee'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'

import circle from '../images/circle.svg'

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
  /* z-index: -1; */
  padding: 2rem;
  overflow: visible;
`

const StyledBody = styled.div`
  padding: 0 2rem 5rem 2rem;
  font-size: 18px;
  width: 50%;
`

const StyledSection = styled.div`
  padding: 4rem;
  margin-top: 6rem;
`

const StyledBodyTitle = styled.div`
  font-family: 'Principal Trial Black';
  color: ${({ theme }) => theme.colors.pink1};
  font-weight: 900;
  font-size: 8vw;
  line-height: 8rem;
  margin-bottom: 2rem;
  min-height: 40vh;
  /* max-width: 20%; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  filter: blur(0.25px);
  @media (min-width: 1441px) {
    font-size: 4vw;
    line-height: 4.25vw;
    max-width: 40vw;
  }

  * {
    /* white-space: pre-wrap; */
    white-space: pre-wrap;
    word-break: break-word;
    /* max-width: 600px; */
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(9000deg);
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
  p {
    margin: 0px;
    margin-right: 1rem;
    font-size: 1rem;
  }
`

const NewInfo = styled.a`
  position: absolute !important;
  right: -3vw;
  top: 12rem;
  width: 50%;
  transform: rotate(-4deg);
  font-size: 20px;
  transition: transform 0.3s ease;
  z-index: 99;
  color: ${({ theme }) => theme.colors.grey9};

  :hover {
    transform: rotate(-2deg);
  }
  a {
    color: ${({ theme }) => theme.colors.grey9};
  }
`

const NewPill = styled.div`
  float: left;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.grey9};
  padding: 0rem 0.75rem;
  border-radius: 1rem;
  text-align: center;
  margin: 0;
  margin-right: 1rem;
  font-size: 18px;
`

const StyledUnicornImage = styled(Img)`
  position: absolute !important;
  top: 3rem;
  width: 100%;
  background-color: none;
  border-radius: 8px 0px 0px 8px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
`

const StyledDownArrow = styled.a`
  font-weight: 600;
  font-size: 48px;
  position: absolute;
  left: 4rem;
  margin-top: 5rem;
  color: ${({ theme }) => theme.colors.link};
`

const StyledSectionHeader = styled.p`
  font-weight: 400;
  font-size: 1.5rem;
`

const StyledSectionFlex = styled.div`
  padding: 4rem;
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  h2 {
    font-family: 'Principal Trial Semibold';
    margin-bottom: 0.5rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
`

const StyledImgSection = styled.div`
  position: relative;
  min-width: 400px;
`

const StyledCircleImg = styled.img`
  margin: 0;
  max-width: 400px;
  position: absolute;
  top: 0px;
  left: 200px;
  margin-right: 0.5rem;
  animation: ${rotate} 700s linear infinite;
`

const StyledLineImg = styled(Img)`
  max-width: 300px;
`

const StyledGoal = styled.div`
  padding: 0 2rem 2rem 2rem;
  margin: 4rem;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 0.5rem;
  h2 {
    font-family: 'Principal Trial Semibold';
  }
`

const Noise = styled(Img)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100vh; */
  /* background-color: white; */
  /* background-image: ${({ imgUrl }) => `url(${imgUrl})`}; */
  background-repeat: no-repeat;
  background-size: contain;
  pointer-events: none;
  mix-blend-mode: overlay;
  z-index: 999;
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
      bg: file(relativePath: { eq: "bg_texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      line: file(relativePath: { eq: "sq.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      noise: file(relativePath: { eq: "noise.jpg" }) {
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
        fluid={data.bg.childImageSharp.fluid}
      >
        <a href="">
          <NewInfo>
            <NewPill>V2</NewPill>Learn what’s new ↗
            <StyledUnicornImage
              fluid={data.unicornImage.childImageSharp.fluid}
            />
          </NewInfo>
        </a>
      </StyledBackgroundWrapper>

      <StyledBody>
        <StyledBodyTitle>
          {/* <Noise fluid={data.noise.childImageSharp.fluid} /> */}

          <TextLoop interval={12000}>
            <span>Automated token exchange.</span>
            <span>Automated price feeds.</span>
            <span>Open token liquidity.</span>
          </TextLoop>
        </StyledBodyTitle>
        {/* <p>Decentralized exchange, market making & on chain price feeds.</p>
        <span>
          <NewPill>V2</NewPill> <a href="">What's new?</a>
        </span> */}
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
      <StyledGoal>
        <h2>Our goals</h2>
        <p>
          Uniswap is important infrastructure for the emerging crypto economy
          and enables markets to be created that couldn't have existed before.
          As more assets become tokenized, public blockchains and protocols like
          Uniswap provide the opportunity to establish a new financial stack
          that is more efficient, transparent, and equitable than any system in
          the past.
        </p>
        <div>
          <a href="">Read more about how we are working towards this future.</a>
        </div>
      </StyledGoal>
      <StyledSectionFlex>
        <StyledImgSection>
          <StyledLineImg fluid={data.line.childImageSharp.fluid} />
          <StyledCircleImg src={circle} alt="circle logo" />{' '}
        </StyledImgSection>
        <StyledImgSection>
          <div>
            <h2>Documentation</h2>
            <p>Get started building on Uniswap using the SDK.</p>
            <div>
              <a href="">Get Started</a> • <a href="">Javascript SDK</a> •{' '}
              <a href="">Smart Contracts</a>
            </div>
          </div>
          <div>
            <h2>About</h2>
            <p>Learn more about Uniswap.</p>
            <div>
              <a href="">What is Uniswap?</a> • <a href="">FAQ</a> •{' '}
              <a href="">Whitepaper</a>
            </div>
          </div>
          <div>
            <h2>Community</h2>
            <p>Get help and participate in the community.</p>
            <div>
              <a href="">Twitter</a> • <a href="">Discord</a> •{' '}
              <a href="">Github</a> • <a href="">Reddit</a>
            </div>
          </div>
        </StyledImgSection>
      </StyledSectionFlex>
    </Layout>
  )
}

export default IndexPage
