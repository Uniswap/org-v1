import React from 'react'
import styled from 'styled-components'

import { useStaticQuery, graphql, Link } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import BG from '../components/bg'

import MiniCard from '../components/minicard'

const StyledAbout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
`

const StyledSectionFlex = styled.div`
  padding: 4rem 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
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
    /* flex-direction: column; */
  }
  h1,
  h2 {
    /* margin-bottom: 0.5rem; */
    max-width: 650px;
  }
  p {
    /* margin-bottom: 0.5rem; */
    max-width: 650px;
  }
`

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-size: 72px;
  margin: 2rem 0 3rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  /* text-align: center; */
  @media (max-width: 960px) {
    font-size: 3rem;
  }
`

const About = props => {
  const data = useStaticQuery(graphql`
    {
      twitter: file(relativePath: { eq: "twitter.png" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      discord: file(relativePath: { eq: "discord.png" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      reddit: file(relativePath: { eq: "reddit.png" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout path={props.location.pathname}>
      <BG />

      <SEO title="About" path={props.location.pathname} />
      <StyledAbout>
        <StyledSectionFlex style={{ flexDirection: 'column', paddingBottom: '0px' }}>
          <Title style={{ width: '100%' }}>About</Title>
          <p>
            The Uniswap protocol is developed by a small team in Brooklyn, NY alongside collaborators all across the
            world.
          </p>
          <p>We are committed to open source software and building on the decentralized web.</p>
          <p>
            You can read about how Uniswap got started
            <Link to="/blog/uniswap-history/"> here.</Link>
          </p>
        </StyledSectionFlex>

        <StyledSectionFlex style={{ flexDirection: 'column', paddingBottom: '0px' }}>
          <h1 style={{ width: '100%' }}>Contact</h1>
          <p>
            To get in touch, please email <a href="mailto:contact@uniswap.org">contact@uniswap.org</a>
          </p>

          <p>
            As a small team <strong>we are unable to offer support</strong> in most cases but encourage anyone facing
            issues with their wallet, transaction or Uniswap related question to join our active community discord.
          </p>
        </StyledSectionFlex>
        <StyledSectionFlex wrapSmall={false} style={{ paddingTop: '2rem' }}>
          <MiniCard
            href="https://discord.gg/Y7TF6QA"
            title={'Discord'}
            image={data.discord.childImageSharp.fluid}
            desc={'Real time discussion.'}
            color={'white'}
            backgroundColor={'#7289da'}
          />
          <MiniCard
            href="https://twitter.com/UniswapProtocol"
            title={'Twitter'}
            image={data.twitter.childImageSharp.fluid}
            desc={'Updates from the Uniswap team.'}
            backgroundColor={'#B0D8F0'}
            color={'black'}
          />
          <MiniCard
            href="https://www.reddit.com/r/Uniswap"
            title={'Reddit'}
            image={data.reddit.childImageSharp.fluid}
            desc={'Slow form discussion'}
            backgroundColor={'white'}
            color={'black'}
          />
        </StyledSectionFlex>

        <StyledSectionFlex style={{ flexDirection: 'column', paddingBottom: '0px' }}>
          <h1 style={{ width: '100%' }}>Jobs</h1>
          <p>We are looking for talented people to join our team!</p>
          <p>
            {"If you think you'd be a good fit for a job at Uniswap"}{' '}
            <a href="mailto:contact@uniswap.org">get in touch.</a>
          </p>

          <h1 id="brand-assets" style={{ width: '100%' }}>
            Brand Assets
          </h1>
          <p>
            Download the logo and other brand assets samples <a href="/Uniswap_brand_assets.zip">here</a>.
          </p>
        </StyledSectionFlex>
      </StyledAbout>
    </Layout>
  )
}

export default About
