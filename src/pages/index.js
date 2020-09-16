import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Layout from '../layouts'
import SEO from '../components/seo'
import Ticker from '../components/ticker'
import BG from '../components/bg'
import { useDarkMode } from '../contexts/Application'
import { CardBGImage, CardNoise, StyledLink, StyledExternalLink } from '../components/utils'

const BGCard = styled.span`
  width: 80vw;
  height: 80vh;
  user-select: none;
  position: fixed;
  left: 10vw;
  top: 13vh;
  background: ${({ theme }) => theme.heroBG};
  opacity: 0.6;
  @media (max-width: 960px) {
    width: 100vw;
    height: 100vh;
    max-width: 1200px;
    max-height: 720px;
  }
  @media (min-width: 1441px) {
    width: 100%;
    height: 100%;
    max-width: 1200px;
    max-height: 720px;
    left: 120px;
    margin: 0 auto;
    position: absolute;
  }
`

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  padding: 4rem;
  @media (max-width: 375px) {
    margin-bottom: 2rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  @media (min-width: 1441px) {
    margin-top: 5rem;
  }
`

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  will-change: transform;

  @media (max-width: 960px) {
    margin: 0rem 0 1rem 0;
  }
`

const StyledBodyTitle = styled.h1`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 72px;
  margin: 4rem 0 3rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 1000px;
  letter-spacing: -0.05em;
  font-family: 'Inferi Light', 'Times New Roman', serif;
  @media (max-width: 1024px) {
    margin: 2rem 0 3rem 0;
  }

  @media (max-width: 960px) {
    width: 100%;
    font-size: 3rem;
    line-height: 3.5rem;
    margin: 2rem 0 2rem 0;
    max-width: 600px;
  }
  @media (max-width: 375px) {
    width: 100%;
    font-size: 2.5rem;
    line-height: 3rem;
    margin: 2rem 0 2rem 0;
    font-weight: 400;
  }
`

const StyledNav = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 32px;
  transition: right 0.25s ease;
  margin-left: 4rem;
  @media (max-width: 960px) {
    margin-left: 0rem;
    gap: 12px;
    flex-direction: column;
  }
`

const StyledImgSection = styled.div`
  color: ${({ theme }) => theme.colors.link};
  position: relative;
  width: 100%;

  margin-left: 2rem;
  margin-top: 4rem;
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
  color: ${({ theme }) => theme.textColor};
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.textColor};
  padding: 1rem;

  font-family: 'GT Haptik Regular';
  border-radius: 8px;
  transition: transform 0.3s ease;

  will-change: transform;
  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);

  :hover {
    transform: translate3d(2px, 2px, 10px);
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

const IndexPage = props => {
  const isDark = useDarkMode()

  return (
    <Layout path={props.location.pathname} nofooter={true}>
      <BGCard>
        <CardBGImage isDark={isDark} />
        <CardNoise />
      </BGCard>
      <Ticker />
      <BG />
      <SEO
        title=""
        path={props.location.pathname}
        description={'A fully decentralized protocol for automated liquidity provision on Ethereum'}
      />
      <StyledBody>
        <StyledTitle>
          <StyledBodyTitle>
            Uniswap is a decentralized protocol for automated liquidity provision on Ethereum.
          </StyledBodyTitle>
          <StyledNav>
            <StyledExternalLink href={'https://app.uniswap.org'}>
              Use the app <span style={{ fontSize: '11px' }}>↗</span>
            </StyledExternalLink>
            <StyledLink to={'/docs/v2/'}>Read the docs</StyledLink>
            <StyledLink to={'/faq'}>FAQ</StyledLink>
          </StyledNav>
          <StyledImgSection>
            <MiniNewInfo to="/blog/uni/">
              <NewPill>UNI</NewPill>
              Read the announcement ↗
            </MiniNewInfo>
          </StyledImgSection>
        </StyledTitle>
      </StyledBody>
    </Layout>
  )
}

export default IndexPage
