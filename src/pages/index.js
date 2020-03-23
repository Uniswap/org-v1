import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'

import Img from 'gatsby-image'

import Layout from '../layouts'
import SEO from '../components/seo'
import Ticker from '../components/ticker'
import BG from '../components/bg'
import MiniCard from '../components/minicard'
import { Button } from '../components/button'

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  @media (max-width: 375px) {
    margin-bottom: 2rem;
  }
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
  font-size: 104px;
  margin: 4rem 0 3rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  text-align: center;
  font-family: 'Inferi Normal', 'Times New Roman', serif;
  @media (max-width: 1024px) {
    margin: 2rem 0 3rem 0;
  }

  @media (max-width: 960px) {
    width: 100%;
    font-size: 4rem;
    line-height: 4.5rem;
    margin: 2rem 0 2rem 0;
    max-width: 600px;
  }
  @media (max-width: 375px) {
    width: 100%;
    /* font-size: 3rem;
    line-height: 3.5rem; */
    margin: 2rem 0 2rem 0;
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
  /* max-width: 650px; */
  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 0rem;
    flex-direction: ${({ wrapSmall }) => (!wrapSmall ? 'row' : 'column')};
  }
  @media (max-width: 960px) {
    padding: 1rem;
    margin-top: 0rem;
    width: 100%;
    max-width: 450px;
  }

  h2 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-bottom: 0.5rem;
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
      <SEO
        title="Home"
        path={props.location.pathname}
        description={'A fully decentralized protocol for automated liquidity provision on Ethereum'}
      />
      <StyledBody>
        <StyledTitle>
          <StyledBodyTitle>Automated Liquidity Protocol.</StyledBodyTitle>
          <span>
            <Button href="https://uniswap.exchange/">Launch App</Button>
            <Button to="/docs" as={Link} outlined>
              Read the docs
            </Button>
          </span>
        </StyledTitle>
        <SummarySection data={data} />
        <DeveloperSection data={data} />
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
  margin: 1rem 3rem;
  @media (max-width: 960px) {
    width: 100%;
    margin: 0;
    p {
      max-width: 450px;
    }
    h1 {
      max-width: 450px;
    }
  }
  p {
    line-height: 155%;
    margin-bottom: 2rem;
    max-width: 450px;
  }
  h1 {
    max-width: 450px;
    line-height: 1.3;
  }
  h2 {
    max-width: 450px;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
`

const MiniNewInfo = styled(Link)`
  transform: rotate(-4deg) scale(0.98);
  color: ${({ theme }) => theme.textColor};
  display: inline-block;
  height: 500px;

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
    max-width: 450px;
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
  font-weight: 400;
`

const LinkTitle = styled.span`
  @media (max-width: 960px) {
    display: none;
  }
`

const StyledSectionTitle = styled.h1`
  color: ${({ theme }) => theme.colors.link};
  font-size: 48px;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  text-align: center;
  font-family: 'Inferi Normal', 'Times New Roman', serif;

  @media (max-width: 960px) {
    width: 100%;
    font-size: 2rem;
    line-height: 2.5rem;
    max-width: 600px;
    margin-top: 4rem;
  }
  @media (max-width: 375px) {
    width: 100%;
    font-weight: 400;
    margin-top: 4rem;
  }
`

const SummarySection = props => {
  return (
    <StyledSectionFlex>
      <StyledImgSection>
        <MiniNewInfo to="/blog/uniswap-v2/">
          <NewPill>
            <LinkTitle>Uniswap</LinkTitle> V2
          </NewPill>
          Read the announcement ↗
          <StyledUnicornImage fadeIn={false} fluid={props.data.unicornImage.childImageSharp.fluid} />
        </MiniNewInfo>
      </StyledImgSection>
      <StyledImgSection>
        <h1>
          <b>Uniswap</b> is a fully decentralized protocol for automated liquidity provision on Ethereum.
        </h1>

        <p>
          A simple formalized equation drives unstoppable liquidity for thousands of users and hundreds of applications.
        </p>

        <p>
          Uniswap empowers developers, liquidity providers and traders to participate in markets that are open and
          accessible to all.
        </p>

        <Button as={Link} outlined to="/docs/v2#how-it-all-works">
          Read more
        </Button>
      </StyledImgSection>
    </StyledSectionFlex>
  )
}

const DeveloperSection = () => {
  return (
    <>
      <StyledSectionTitle>Build with Uniswap</StyledSectionTitle>
      <StyledSectionFlex style={{ paddingBottom: '0px', paddingTop: '1rem' }}>
        <MiniCard
          outlined
          small
          as={Link}
          to="/docs/v2/SDK/getting-started"
          title={'Integrate Uniswap into your Frontend.'}
          desc={'Use the new SDK for anything from a hackathon project to a production application.'}
        />
        <MiniCard
          outlined
          small
          as={Link}
          to="/docs/v2/smart-contracts/architecture"
          title={'Use Uniswap in your Smart Contracts.'}
          desc={'Token Swaps, Flash swaps, Token Liquidity and so much more.'}
        />
        <MiniCard
          outlined
          small
          as={Link}
          to="/docs/v2/technical-considerations/oracles"
          title={'Build oracles on Uniswap.'}
          desc={'New on chain price feeds makes building oracles easier than ever.'}
        />
      </StyledSectionFlex>
    </>
  )
}

const ProductsSection = props => {
  return (
    <>
      <StyledSectionFlex style={{ paddingBottom: '0px' }}>
        <StyledGoal style={{ width: '100%', maxWidth: '450px' }}>
          <h1>Use Uniswap</h1>
          <p>We build open tools and experimental products that interact with the Uniswap protocol.</p>
        </StyledGoal>
      </StyledSectionFlex>
      <StyledSectionFlex wrapSmall={false} style={{ paddingTop: '2rem' }}>
        <MiniCard
          href="https://uniswap.exchange"
          title={'Uniswap Interface'}
          image={props.data.swap.childImageSharp.fluid}
          desc={'Trade tokens, add liquidity and create new pools.'}
        />
        <MiniCard
          href="https://uniswap.info"
          title={'Uniswap Info'}
          image={props.data.info.childImageSharp.fluid}
          desc={'In depth Uniswap protocol market data.'}
          backgroundColor={'#F3BE1E'}
        />
        <MiniCard
          href="https://unisocks.exchange"
          title={'Unisocks'}
          image={props.data.socks.childImageSharp.fluid}
          desc={'Experimental speculative fashion.'}
          backgroundColor={'#000000'}
          color={'white'}
        />
      </StyledSectionFlex>
    </>
  )
}

const StyledGoal = styled.div`
  color: ${({ theme }) => theme.colors.link};
  border-radius: 0.5rem;
  p {
    line-height: 155%;
    margin-bottom: 2rem;
    max-width: 450px;
  }
  @media (max-width: 960px) {
    margin-top: 2rem;
    p {
      max-width: 450px;
    }
  }
`

const GoalSection = () => {
  return (
    <StyledSectionFlex>
      <StyledGoal>
        <h1>Mission</h1>
        <p>Uniswap is transparent, censorship resistant infrastructure for the crypto economy.</p>
        <p>
          We are reimagining financial markets and reinventing how users engage with liquidity. Uniswap removes barriers
          to entry and single points of failure, leveling the playing field while improving security for all.
        </p>
        <p>
          We build unbreakable, unstoppable products that enable the creation of markets which could not have existed
          before.
        </p>
      </StyledGoal>
    </StyledSectionFlex>
  )
}
