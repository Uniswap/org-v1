import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../layouts'
import SEO from '../components/seo'
import BG from '../components/bg'
import { Button } from '../components/button'
import Wizard from '../components/wizard'
import ProtocolData from '../components/protocolData'

import { useDarkMode } from '../contexts/Application'

import { CardBGImage, CardFade, CardNoise, StyledLink, StyledExternalLink } from '../components/utils'

import Discord from '../images/discord.inline.svg'

const BGCard = styled.span`
  width: 100vw;
  height: 100vh;
  /* max-width: 1200px; */
  max-height: 1220px;
  user-select: none;
  background-repeat: no-repeat;
  background: ${({ theme }) => theme.heroBG};
  background-size: contain;
  opacity: 0.2;
  @media (max-width: 960px) {
    width: 100vw;
    height: 100vh;
    max-height: 1220px;
  }
`

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  @media (max-width: 960px) {
    margin-bottom: 2rem;
    padding: 2rem;
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
  font-size: 104px;
  margin: 4rem 0 3rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  text-align: center;
  font-family: 'Garamond', 'GT Haptik', 'Inferi Normal', 'Times New Roman', serif;
  @media (max-width: 1024px) {
    margin: 2rem 0 3rem 0;
  }

  @media (max-width: 640px) {
    width: 100%;
    margin: 2rem 0 2rem 0;
    font-weight: 500;
    text-align: left;
    font-size: 58px;
  }
`
const StyledBodySubTitle = styled.h2`
  @media (max-width: 640px) {
    text-align: left;
  }
`

const StyledBodySubText = styled.h3`
  max-width: 960px;
  text-align: center;
  line-height: 160%;
  @media (max-width: 640px) {
    text-align: left;
  }
`

const StyledBannerImage = styled(Img)`
  width: 100%;
  height: 100%;
  min-width: 260px;
  max-width: 720px;
  background-color: none;
  margin-top: 1rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
  @media (max-width: 960px) {
    min-width: unset;
  }
`

const StyledProductImage = styled(Img)`
  width: 100%;
  height: 100%;
  min-width: 220px;
  max-width: 220px;
  background-color: none;
  /* margin-top: 1rem; */
  border-radius: 12px;
  /* margin: 1rem; */
  box-shadow: ${({ theme }) => theme.shadows.huge};

  @media (max-width: 960px) {
    max-width: 320px;
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

const StyledItemRow = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  transition: right 0.25s ease;
  @media (max-width: 960px) {
    justify-content: flex-start;
    margin-left: 0rem;
    gap: 12px;
    flex-direction: column;
  }
`

const IndexPage = props => {
  const isDark = useDarkMode()

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      newYear: file(relativePath: { eq: "newyear.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      banner: file(relativePath: { eq: "Banner.jpg" }) {
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
      sybil: file(relativePath: { eq: "sybil.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tokenlists: file(relativePath: { eq: "tokenlists.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      discord: file(relativePath: { eq: "discord.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      twitter: file(relativePath: { eq: "twitter.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      reddit: file(relativePath: { eq: "reddit.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      discourse: file(relativePath: { eq: "discourse.png" }) {
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
      <BGCard>
        <CardNoise />
        <CardBGImage isDark={isDark} />
        <CardFade />
      </BGCard>
      <SEO
        title="Home"
        path={props.location.pathname}
        description={'A fully decentralized protocol for automated liquidity provision on Ethereum'}
      />
      <StyledBody>
        <StyledTitle style={{ marginBottom: '12rem' }}>
          <StyledBodyTitle>Automated Liquidity Protocol.</StyledBodyTitle>
          <StyledBodySubTitle style={{ marginBottom: '3rem' }}>
            Unstoppable liquidity for millions of users and hundreds of Ethereum applications.
          </StyledBodySubTitle>

          <StyledItemRow>
            <Button
              style={{
                background: `linear-gradient(128.17deg, #BD00FF -14.78%, #FF1F8A 110.05%)`,
                color: 'white'
              }}
              href="https://app.uniswap.org/"
            >
              Use Uniswap
            </Button>
            <Button outlined to="/docs" as={Link}>
              Documentation
            </Button>
            <Button outlined to="/faq" as={Link}>
              FAQ
            </Button>
          </StyledItemRow>
        </StyledTitle>
        <ProtocolData />

        <DeveloperSection data={data} props={props} />
        <ProductsSection data={data} props={props} />
      </StyledBody>
      <BG />
    </Layout>
  )
}

export default IndexPage

const StyledSectionTitle = styled.h1`
  font-size: 48px;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  text-align: center;
  font-family: 'GT Haptik', 'Times New Roman', serif;
  margin-top: 12rem;

  @media (max-width: 960px) {
    width: 100%;
    font-size: 2rem;
    line-height: 2.5rem;
    max-width: 600px;
    margin-top: 4rem;
  }
  @media (max-width: 640px) {
    width: 100%;
    font-weight: 400;
    margin-top: 4rem;
    text-align: left;
  }
`

const DeveloperSection = props => {
  return (
    <>
      <StyledSectionTitle>A growing protocol ecosystem.</StyledSectionTitle>
      <StyledBodySubText>
        The Uniswap protocol empowers developers, liquidity providers and traders to participate in a financial
        marketplace that is open and accessible to all.
      </StyledBodySubText>
      <StyledBannerImage fadeIn={false} fluid={props.data.banner.childImageSharp.fluid} />
    </>
  )
}

const ProductsSection = props => {
  return (
    <>
      <StyledSectionTitle>A suite of tools for a tokenized world.</StyledSectionTitle>
      <StyledBodySubText>
        We build state of the art open source apps to access the Uniswap protocol and contribute to the world of
        decentralized finance.
      </StyledBodySubText>
      <StyledItemRow>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.socks.childImageSharp.fluid} />
        </StyledExternalLink>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.info.childImageSharp.fluid} />
        </StyledExternalLink>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.swap.childImageSharp.fluid} />
        </StyledExternalLink>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.tokenlists.childImageSharp.fluid} />
        </StyledExternalLink>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.sybil.childImageSharp.fluid} />
        </StyledExternalLink>
      </StyledItemRow>

      <StyledSectionTitle>Superpowers for DEFI developers.</StyledSectionTitle>
      <StyledBodySubText>
        Check out the <Link to="/docs/v2/">documentation</Link> or start with a guide below to integrate your project
        with thousands of tokens and billions in liquidity.
      </StyledBodySubText>
      <StyledSectionFlex style={{ paddingBottom: '0px', paddingTop: '1rem' }}>
        <Wizard />
      </StyledSectionFlex>

      <StyledSectionTitle>A global community.</StyledSectionTitle>
      <StyledBodySubText>
        Learn more about Uniswap, chat with the team, others in the community, and have your say in shaping the future
        of the Uniswap protocol.
      </StyledBodySubText>
      <StyledItemRow>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.discord.childImageSharp.fluid} />
        </StyledExternalLink>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.twitter.childImageSharp.fluid} />
        </StyledExternalLink>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.discourse.childImageSharp.fluid} />
        </StyledExternalLink>
        <StyledExternalLink href={'https://app.uniswap.org'}>
          <StyledProductImage fadeIn={false} fluid={props.data.reddit.childImageSharp.fluid} />
        </StyledExternalLink>
      </StyledItemRow>
    </>
  )
}
