import React from 'react'
import styled, { keyframes } from 'styled-components'
import scrollTo from 'gatsby-plugin-smoothscroll'

import { useStaticQuery, graphql, Link } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import { Helmet } from 'react-helmet'

import Card from '../components/card'
import Marquee from '../components/marquee'
import Img from 'gatsby-image'

import circle from '../images/circle.svg'
import star from '../images/star.svg'

const StyledCardsWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-content: space-between;
  padding-top: 0rem;
  @media (max-width: 960px) {
    padding-top: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const Stats = styled.div`
  width: 10000px;
  background-color: black;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0px;
  left: 0px;
  color: white;
  align-items: center;
  z-index: 999;
  p {
    margin: 0px;
    margin-right: 1rem;
    font-size: 1rem;
  }
`

const StyledBody = styled.div`
  font-size: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 3rem;
  @media (min-width: 1441px) {
    padding-top: 0px;
    justify-content: center;
    max-height: 900px;
    height: 80vh;
  }
  @media (max-width: 1440px) and (max-height: 1000px) {
    max-height: 900px;
    height: 80vh;
  }
  @media (max-width: 1024px) {
    height: auto;
    max-height: 100%;
  }
`

const StyledSection = styled.div`
  margin-top: 6rem;
`
const StyledTitle = styled.div`
  z-index: 999;
  display: flex;
  mix-blend-mode: color-dodge;
  min-height: 40vh;
  width: 50%;
  flex-direction: column;
  @media (min-width: 1441px) {
    width: 70%;
  }
  @media (max-width: 960px) {
    width: 100%;
    mix-blend-mode: normal;
    min-height: auto;
    height: 100%;
  }
`

const StyledBodyTitle = styled.div`
  font-family: 'Principal Trial Black';
  color: ${({ theme }) => theme.colors.pink1};
  font-weight: 900;
  font-size: 7.5vw;
  line-height: 7.75vw;
  letter-spacing: -0.06rem;
  margin-bottom: 4rem;
  /* padding-right: 4rem; */
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  @media (min-width: 1441px) {
    font-size: 5.5vw;
    line-height: 5.25vw;
  }
  @media (max-width: 960px) {
    font-size: 3.5rem;
    line-height: 3.75rem;
    padding-right: 0rem;
  }
  @media (max-width: 356px) {
    font-size: 2.25rem;
    line-height: 2.5rem;
    padding-right: 0rem;
  }
`

const NewInfo = styled(Link)`
  width: 100%;
  position: absolute;
  right: -80px;
  top: 20px;
  width: 63%;
  /* max-width: 600px; */
  transform: rotate(-4deg) scale(0.98);
  font-size: 20px;
  transition: transform 0.3s ease;
  color: ${({ theme }) => theme.colors.grey9};
  margin-right: -120px;
  @media (min-width: 1441px) {
    top: 60px;
    width: 55%;
    right: 0px;
  }

  :hover {
    transform: rotate(-2deg);
  }
  a {
    color: ${({ theme }) => theme.colors.grey9};
  }
  @media (max-width: 960px) {
    position: relative;
    width: 120%;
    right: -30px;
    margin-right: 0px;
    top: 0px;
    height: 100%;
    margin-top: 4rem;
  }
`

const StyledUnicornImage = styled(Img)`
  width: 100%;
  /* opacity: 0.4; */
  background-color: none;
  margin-top: 1rem;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
`

const NewPill = styled.span`
  float: left;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.grey9};
  padding: 0rem 0.75rem;
  border-radius: 0.5em;
  text-align: center;
  margin: 0;
  margin-right: 1rem;
  font-size: 18px;
`
const bounce = keyframes`
  0%, 20%, 40%, 60%, 100% {
    transform: translateY(0);
  }
  45% {
    transform: translateY(-10px);
  }
`

const StyledDownArrow = styled.a`
  font-weight: 200;
  font-size: 48px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-top: 5rem;
  color: ${({ theme }) => theme.colors.link};
  cursor: pointer;
  animation: ${bounce} 5s infinite;
  @media (max-width: 960px) {
    display: none;
  }
`

const StyledSectionFlex = styled.div`
  padding: 4rem;
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  @media (max-width: 960px) {
    padding: 1rem;
    margin-top: 0rem;
    flex-direction: column;
  }
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
  @media (max-width: 960px) {
    min-width: 0px;
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

const StyledCircleImg = styled.img`
  margin: 0;
  max-width: 400px;
  position: absolute;
  top: 0px;
  left: 150px;
  margin-right: 0.5rem;
  animation: ${rotate} 700s linear infinite;
  @media (max-width: 1024px) {
    max-width: 50%;
    left: 25%;
  }
  @media (max-width: 960px) {
    width: 100%;
    max-width: 200px;
    left: 100px;
  }
`

const StyledLineImg = styled(Img)`
  max-width: 300px;
  @media (max-width: 1024px) {
    max-width: 50%;
    left: 25%;
  }
  @media (max-width: 960px) {
    width: 100%;
    max-width: 200px;
  }
`

const StyledStarImg = styled.img`
  margin: 0;
  max-width: 400px;
  position: absolute;
  top: 0px;
  right: 0px;
  margin-right: 0.5rem;
  z-index: 999;
`

const StyledGoal = styled.div`
  padding: 0 2rem 2rem 2rem;
  margin-top: 4rem;
  border: 1px solid ${({ theme }) => theme.colors.grey9};
  background-color: ${({ theme }) => theme.colors.grey9};
  color: white;
  border-radius: 0.5rem;
  h2 {
    font-family: 'Principal Trial Semibold';
  }
`

const StyledTradeLink = styled.a`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.pink1};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  margin-right: 1.5rem;
  display: inline-block;
  transform: scale(0.98);
  transition: transform 0.25s ease;

  :hover {
    transform: scale(1);
  }
  @media (max-width: 960px) {
    margin-right: 0.5rem;
    border-radius: 20px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.colors.pink1};
    text-decoration: none;
    color: ${({ theme }) => theme.colors.pink1};
    background-color: rgba(255, 255, 255, 0);
    font-size: 1.5rem;
    font-weight: 700;
    padding: 0.5rem 1.25rem;
  }
`

const StyledTradeLinkOutlined = styled(Link)`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.pink1};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.pink1};
  border-radius: 20px;
  margin-right: 1.5rem;
  display: inline-block;
  transform: scale(0.98);
  transition: transform 0.25s ease;

  :hover {
    transform: scale(1);
  }
  @media (max-width: 960px) {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
    border-radius: 12px;
    display: none;
  }
`

const IndexPage = props => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          cardlinks {
            cardButton
            cardDesc
            cardTitle
            type
            slug
          }
        }
      }
      unicornImage: file(relativePath: { eq: "uni_image.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      line: file(relativePath: { eq: "sq.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout path={props.paths}>
      <SEO title="Home" path={props.paths} />
      <Helmet>
        <meta
          name="twitter:image"
          content={`${data.site.siteMetadata.siteUrl}/images/twitter-card.jpg`}
        />
      </Helmet>
      <StyledBody>
        <StyledTitle>
          <StyledBodyTitle>Automated token exchange.</StyledBodyTitle>
          <span>
            <StyledTradeLink href="https://uniswap.exchange/">
              Trade Now
            </StyledTradeLink>
            <StyledTradeLinkOutlined to="/docs">
              Read the docs
            </StyledTradeLinkOutlined>
          </span>
        </StyledTitle>
        <StyledStarImg src={star} alt="star logo" />{' '}
        <NewInfo to="/blog/post-01">
          <NewPill>V2 Announced</NewPill>Learn what’s new ↗
          <StyledUnicornImage fluid={data.unicornImage.childImageSharp.fluid} />
        </NewInfo>
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
        <StyledCardsWrapper>
          {data.site.siteMetadata.cardlinks.map((node, index) => {
            return <Card key={index} index={index} node={node} />
          })}
        </StyledCardsWrapper>
      </StyledSection>
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
              <Link to="/docs">Get Started</Link> •{' '}
              <Link to="/docs/04-SDK-documentation/01-get-started/">
                Javascript SDK
              </Link>{' '}
              •{' '}
              <Link to="/docs/05-smart-contract-api/01-exchange/">
                Smart Contracts
              </Link>
            </div>
          </div>
          <div>
            <h2>About</h2>
            <p>Learn more about Uniswap.</p>
            <div>
              <Link to="/">What is Uniswap?</Link> • <Link to="/faq">FAQ</Link>{' '}
              • <Link to="/">Whitepaper</Link>
            </div>
          </div>
          <div>
            <h2>Community</h2>
            <p>Get help and participate in the community.</p>
            <div>
              <a href="https://twitter.com/UniswapExchange">Twitter</a> •{' '}
              <a href="https://discord.gg/Y7TF6QA">Discord</a> •{' '}
              <a href="https://github.com/Uniswap">Github</a> •{' '}
              <a href="https://www.reddit.com/r/UniSwap/">Reddit</a>
            </div>
          </div>
        </StyledImgSection>
      </StyledSectionFlex>
      <StyledGoal>
        <h2>Our goal</h2>
        <p>
          Uniswap is important infrastructure for the emerging crypto economy
          and enables markets to be created that couldn't have existed before.
          As more assets become tokenized, public blockchains and protocols like
          Uniswap provide the opportunity to establish a new financial stack
          that is more efficient, transparent, and equitable than any system in
          the past.
        </p>
        <div>
          <Link to="/">
            Read more about how we are working towards this future.
          </Link>
        </div>
      </StyledGoal>
    </Layout>
  )
}

export default IndexPage
