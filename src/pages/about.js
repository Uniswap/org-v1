import React from 'react'
import styled from 'styled-components'

import { useStaticQuery, graphql, Link } from 'gatsby'

import Layout from '../layouts'
import SEO from '../components/seo'
import BG from '../components/bg'
import scrollTo from 'gatsby-plugin-smoothscroll'

import MiniCard from '../components/minicard'
import Discord from '../images/discord.inline.svg'

const StyledAbout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  justify-content: space-between;
  padding: 0 2rem;
  padding-bottom: 4rem;
  margin-bottom: 4rem;
  padding-top: 2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  border-top: 1px solid ${({ theme }) => theme.colors.grey2};

  @media (max-width: 960px) {
    flex-direction: column;
    grid-template-columns: 1fr;
    margin-top: 0rem;
  }
`

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: sticky;
  top: 6rem;
  align-self: flex-start;
  padding-right: 1rem;
  color: ${({ theme }) => theme.colors.link};
  @media (max-width: 960px) {
    top: 0px;
    position: relative;
    padding: 0rem;
    width: 100%;
    margin-bottom: 1rem;
    display: none;
  }
`

const StyledSectionFlex = styled.div`
  padding: 0 0 4rem 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  max-width: 960px;
  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 0rem;
    flex-direction: ${({ wrapSmall }) => (!wrapSmall ? 'row' : 'column')};
  }
  @media (max-width: 960px) {
    padding: 1rem;
    margin-top: 0rem;
    width: 100%;
    /* max-width: 450px; */
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
  /* font-size: 3rem; */
  margin-bottom: 1rem;
  font-size: 72px;

  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  /* text-align: center; */
  @media (max-width: 960px) {
    font-size: 3rem;
  }
`

const StyledHeadingLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.pink1};
  cursor: pointer;
  font-size: 1.25rem;

  :hover {
    text-decoration: underline;
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
        <StyledSidebar>
          <StyledHeadingLink
            onClick={() => {
              scrollTo('#about')
              window.history.pushState({}, '', '#about')
            }}
          >
            About
          </StyledHeadingLink>
          <StyledHeadingLink
            onClick={() => {
              scrollTo('#jobs')
              window.history.pushState({}, '', '#jobs')
            }}
          >
            Jobs
          </StyledHeadingLink>
          <StyledHeadingLink
            onClick={() => {
              scrollTo('#contact')
              window.history.pushState({}, '', '#contact')
            }}
          >
            Contact
          </StyledHeadingLink>
          <StyledHeadingLink
            onClick={() => {
              scrollTo('#community')
              window.history.pushState({}, '', '#community')
            }}
          >
            Community
          </StyledHeadingLink>

          <StyledHeadingLink
            onClick={() => {
              scrollTo('#brand')
              window.history.pushState({}, '', '#brand')
            }}
          >
            Brand Assets
          </StyledHeadingLink>
        </StyledSidebar>
        <span>
          <StyledSectionFlex id="about" style={{ flexDirection: 'column' }}>
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

          <StyledSectionFlex id="jobs" style={{ flexDirection: 'column' }}>
            <h1 style={{ width: '100%' }}>Jobs</h1>
            <p>We are looking for talented people to join our team!</p>

            <p>Browse the open roles below. </p>
            <span>
              <a href="https://angel.co/company/uniswap/jobs/888942-community-manager">
                {' '}
                <h3>Community Manager</h3>
              </a>
            </span>
            <span>
              <a href="https://angel.co/company/uniswap/jobs/889337-senior-front-end-engineer">
                {' '}
                <h3>Senior Front End Engineer</h3>
              </a>
            </span>
            <span>
              <a href="https://angel.co/company/uniswap/jobs/889341-data-engineer-scientist">
                {' '}
                <h3>Data Engineer/Scientist</h3>
              </a>
            </span>
            <p>
              Uniswap welcomes all qualified persons to apply regardless of race, religion, gender, gender identity or
              expression, sexual orientation, national origin, genetics, disability, age, or veteran status.
              Compensation will be competitive and commensurate with experience. This is a full time role which includes
              health insurance and other benefits.
            </p>
          </StyledSectionFlex>

          <StyledSectionFlex id="contact" style={{ flexDirection: 'column' }}>
            <h1 style={{ width: '100%' }}>Contact</h1>
            <p>
              To get in touch, please email <a href="mailto:contact@uniswap.org">contact@uniswap.org</a>
            </p>

            <p>
              As a small team <strong>we are unable to offer support</strong> in most cases but encourage anyone facing
              issues with their wallet, transaction or Uniswap related question to join our active community discord.
            </p>
          </StyledSectionFlex>
          <StyledSectionFlex id="community" style={{ paddingTop: '2rem' }}>
            <h1 style={{ width: '100%' }}>Community</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <MiniCard
                href="https://discord.gg/XErMcTq"
                title={'Discord'}
                small
                image={data.discord.childImageSharp.fluid}
                desc={'Real time discussion.'}
                color={'white'}
                backgroundColor={'#7289da'}
              />
              <MiniCard
                href="https://twitter.com/UniswapProtocol"
                title={'Twitter'}
                small
                image={data.twitter.childImageSharp.fluid}
                desc={'Updates from the Uniswap team.'}
                backgroundColor={'#B0D8F0'}
                color={'black'}
              />
              <MiniCard
                href="https://www.reddit.com/r/Uniswap"
                title={'Reddit'}
                small
                image={data.reddit.childImageSharp.fluid}
                desc={'Slow form discussion'}
                backgroundColor={'white'}
                color={'black'}
              />
            </div>
          </StyledSectionFlex>

          <StyledSectionFlex id="brand" style={{ flexDirection: 'column' }}>
            <h1 style={{ width: '100%' }}>Brand Assets</h1>
            <p>
              Download the logo and other brand assets samples <a href="/Uniswap_brand_assets.zip">here</a>.
            </p>
          </StyledSectionFlex>
        </span>
      </StyledAbout>
    </Layout>
  )
}

export default About
