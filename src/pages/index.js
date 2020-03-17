import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql, Link } from 'gatsby'

import Img from 'gatsby-image'

import Layout from '../layouts'
import SEO from '../components/seo'
import Ticker from '../components/ticker'
import BG from '../components/bg'

const StyledBody = styled.div`
  /* font-size: 18px; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledTitle = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  will-change: transform;
  margin: 3rem 0 4rem 0;
  @media (max-width: 960px) {
    margin: 3rem 0 1rem 0;
  }
`

const StyledBodyTitle = styled.h1`
  color: ${({ theme }) => theme.colors.link};
  /* font-weight: 00; */
  font-size: 104px;
  margin: 4rem 0 3rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  text-align: center;
  font-family: 'Times Ten LT Std', 'Times New Roman', serif;

  /* letter-spacing: -0.03em; */

  @media (max-width: 960px) {
    width: 100%;
    font-size: 4rem;
    line-height: 4.5rem;
    margin: 2rem 0 2rem 0;
  }
  @media (max-width: 375px) {
    width: 100%;
    font-size: 2.25rem;
    line-height: 2.5rem;
    margin: 2rem 0 4rem 0;
    font-weight: 400;
  }
`

const StyledUnicornImage = styled(Img)`
  width: 100%;
  height: 100%;
  min-width: 450px;
  background-color: none;
  margin-top: 1rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
  @media (max-width: 960px) {
    min-width: unset;
  }
`

const StyledSectionFlex = styled.div`
  padding: 4rem 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 0rem;
    flex-direction: ${({ wrapSmall }) => (!wrapSmall ? 'row' : 'column')};
  }
  @media (max-width: 960px) {
    padding: 1rem;
    margin-top: 0rem;
    flex-direction: column;
  }
  h2 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
`

const StyledTradeLink = styled.a`
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.pink1};
  text-decoration: none;
  color: ${({ theme }) => theme.invertedTextColor};
  border-radius: 12px;
  margin-right: 1.5rem;
  display: inline-block;
  transform: scale(0.98);
  transition: transform 0.25s ease;
  box-sizing: border-box;

  :hover {
    transform: scale(1);
  }
  @media (max-width: 960px) {
    margin-right: 0.5rem;
    text-align: center;
    text-decoration: none;
    font-size: 0.825rem;
    padding: 0.25rem 1rem;
  }
`

const StyledTradeLinkOutlined = styled(Link)`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.pink1};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.pink1};
  border-radius: 12px;
  margin-right: 1.5rem;
  display: inline-block;
  transform: scale(0.98);
  transition: transform 0.25s ease;
  box-sizing: border-box;

  :hover {
    transform: scale(1);
  }
  @media (max-width: 960px) {
    margin-right: 0.5rem;
    text-align: center;
    text-decoration: none;
    font-size: 0.825rem;
    padding: 0.25rem 1rem;
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
      swap: file(relativePath: { eq: "swap.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      info: file(relativePath: { eq: "info.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      socks: file(relativePath: { eq: "socks.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout path={props.location.pathname}>
      <Ticker />
      <BG />
      <SEO title="Home" path={props.location.pathname} />
      <Helmet>
        <meta name="twitter:image" content={`${data.site.siteMetadata.siteUrl}/images/twitter-card.jpg`} />
      </Helmet>
      <StyledBody>
        <StyledTitle>
          <StyledBodyTitle>Automated Exchange Protocol.</StyledBodyTitle>
          <span>
            <StyledTradeLink href="https://uniswap.exchange/">Trade Now</StyledTradeLink>
            <StyledTradeLinkOutlined to="/docs">Read the docs</StyledTradeLinkOutlined>
          </span>
        </StyledTitle>
        <SummarySection data={data} />

        <ProductsSection data={data} />
        <GoalSection />
      </StyledBody>
    </Layout>
  )
}

export default IndexPage

const StyledImgSection = styled.div`
  color: ${({ theme }) => theme.colors.link};
  position: relative;
  /* font-size: 20px; */
  margin: 1rem 3rem;
  @media (max-width: 960px) {
    width: 100%;
    margin: 0;
    p {
      max-width: 450px;
    }
  }
  p {
    line-height: 155%;
    margin-bottom: 2rem;
    max-width: 410px;
  }
`

const MiniNewInfo = styled(Link)`
  transform: rotate(-4deg) scale(0.98);
  /* font-size: 20px; */
  color: ${({ theme }) => theme.textColor};
  display: inline-block;
  /* width: 450px; */
  height: 600px;

  transition: transform 0.3s ease;
  will-change: transform;
  :hover {
    transform: rotate(-2deg);
  }
  a {
    color: ${({ theme }) => theme.textColor};
  }

  @media (max-width: 960px) {
    position: relative;
    max-width: 410px;
    width: 100%;
    height: 100%;
    margin: 4rem 0;
  }
`

const NewPill = styled.span`
  float: left;
  color: ${({ theme }) => theme.invertedTextColor};
  background-color: ${({ theme }) => theme.textColor};
  padding: 0rem 0.75rem;
  border-radius: 0.5em;
  text-align: center;
  margin: 0;
  margin-right: 1rem;
  /* font-size: 20px; */
`

const LinkTitle = styled.span`
  @media (max-width: 960px) {
    display: none;
  }
`

const SummarySection = props => {
  return (
    <StyledSectionFlex>
      <StyledImgSection>
        <MiniNewInfo to="/blog/uniswap-v2/">
          <NewPill>
            V2 <LinkTitle>Announced</LinkTitle>
          </NewPill>
          Learn what’s new ↗
          <StyledUnicornImage fadeIn={false} fluid={props.data.unicornImage.childImageSharp.fluid} />
        </MiniNewInfo>
      </StyledImgSection>
      <StyledImgSection>
        <p>
          <b>Uniswap</b> is a fully decentralized protocol for automated market making on Ethereum.
        </p>

        <p>A simple formalized equation drives unstoppable liquidity for thousands of exchanges.</p>

        <p>The protocol aligns developers, market makers to design markets that are open and accessible to all.</p>

        <Link to="/docs/v2#how-it-all-works">
          <u>Read more</u>
        </Link>
      </StyledImgSection>
    </StyledSectionFlex>
  )
}

// const StyledMiniCardContainer = styled.li`

const StyledMiniCards = styled.a`
  padding: 1.5rem;
  /* font-size: 20px; */
  color: ${({ theme }) => theme.textColor};
  width: 260px;
  height: 360px;
  margin: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.huge};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
  will-change: transform;
  :hover {
    transform: scale(1.03);
  }
`
const StyledCardBG = styled(Img)`
  width: 80px;
  height: 250px;
  position: absolute !important;
  top: 0px;
  right: 0px;
  background-size: auto;
  background-position: center;
  /* z-index: -1; */
`

const StyledMiniCardHeader = styled.h2`
  color: ${({ theme }) => theme.textColor};
  max-width: 160px;
  line-height: 120%;
  margin-top: 0px;
`

const StyledMiniCardDesc = styled.p`
  font-size: 1rem;
  line-height: 130%;
  max-width: 80%;
`

const ProductsSection = props => {
  return (
    <>
      <StyledSectionFlex style={{ paddingBottom: '0px' }}>
        <StyledGoal style={{ width: '100%', maxWidth: '410px;' }}>
          <h1>Products</h1>
          <p>We build open tools and experimental products that interact with the Uniswap protocol.</p>
        </StyledGoal>
      </StyledSectionFlex>
      <StyledSectionFlex wrapSmall={false} style={{ paddingTop: '2rem' }}>
        <StyledMiniCards href="https://uniswap.exchange">
          <StyledMiniCardHeader>
            Uniswap
            <br /> Exchange
            <StyledCardBG fluid={props.data.swap.childImageSharp.fluid} />
          </StyledMiniCardHeader>
          <StyledMiniCardDesc>Trade tokens, add liquidity and create exchanges.</StyledMiniCardDesc>
        </StyledMiniCards>
        <StyledMiniCards href="https://uniswap.info" style={{ backgroundColor: '#F3BE1E' }}>
          <StyledCardBG fluid={props.data.info.childImageSharp.fluid} />
          <StyledMiniCardHeader>
            Uniswap <br />
            Info{' '}
          </StyledMiniCardHeader>
          <StyledMiniCardDesc>In depth Uniswap protocol market data.</StyledMiniCardDesc>
        </StyledMiniCards>
        <StyledMiniCards href="https://unisocks.exchange" style={{ backgroundColor: '#000000', color: 'white' }}>
          <StyledCardBG fluid={props.data.socks.childImageSharp.fluid} />
          <StyledMiniCardHeader style={{ color: 'white' }}>Unisocks</StyledMiniCardHeader>
          <StyledMiniCardDesc>Experimental speculative fashion.</StyledMiniCardDesc>
        </StyledMiniCards>
      </StyledSectionFlex>
    </>
  )
}

const StyledGoal = styled.div`
  color: ${({ theme }) => theme.colors.link};
  border-radius: 0.5rem;
  /* font-size: 20px; */
  p {
    line-height: 155%;
    margin-bottom: 2rem;
    max-width: 450px;
  }
  @media (max-width: 960px) {
    margin-top: 2rem;
    p {
      max-width: 410px;
    }
  }
`

const GoalSection = () => {
  return (
    <StyledSectionFlex>
      <StyledGoal>
        <h1>Mission</h1>
        <p>
          Uniswap is important infrastructure for the emerging crypto economy and enables markets to be created that
          couldn{"'"}t have existed before.
        </p>
        <p>
          As more assets become tokenized, public blockchains and protocols like Uniswap provide the opportunity to
          establish a new financial stack that is more efficient, transparent, and equitable than any system in the
          past.
        </p>
        {/* <div>
          <Link to="/">Read more about how we are working towards this future.</Link>
        </div> */}
      </StyledGoal>
    </StyledSectionFlex>
  )
}
