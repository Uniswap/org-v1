import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { motion } from 'framer-motion'

import _A from '../components/A'
import _AButton from '../components/AButton'

const A = styled(_A)``
const AButton = styled(_AButton)``

const AppBackground = styled.div`
  background-size: cover;
  background-image: url('static/background.svg'), linear-gradient(to right, #dc6be5, #a41de4);
`

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 40rem;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  ${BodySection}:not(:last-child) {
    margin-bottom: 3rem;
  }

  ${css`
    padding: 4rem;
    @media only screen and (max-width: 40rem) {
      padding: 2rem;
    }
  `}
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${A} {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  margin-top: 5rem;
  background-color: ${({ theme }) => transparentize(0.95, theme.colors.white)};

  ${FooterSection}:not(:last-child) {
    margin-bottom: 2rem;
  }

  padding: 2rem;
`

const Img = styled.img`
  height: 4rem;
  user-select: none;
`

const H1 = styled.h1`
  margin: 0;
  font-size: 2.25rem;
  line-height: 3rem;
  font-weight: 500;
`

const Point = styled(motion.li)`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  list-style: none;

  :before {
    content: '→ ';
    opacity: 0.4;
  }

  ${A} {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
  }
`

const PointsWrapper = styled(motion.ul)`
  padding: 0;

  ${Point}:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`

const ButtonsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: -1rem;
  margin-right: -1rem;
  ${AButton} {
    margin-top: 1rem;
    margin-right: 1rem;
  }

  ${AButton} {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
  }
`

const FooterActions = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-top: -1rem;
  margin-right: -1rem;
  ${A} {
    margin-top: 1rem;
    margin-right: 1rem;
  }
`

const logoAnimation = {
  initial: {
    opacity: 0
  },
  final: {
    opacity: 1
  }
}

const pointAnimation = {
  initial: {
    opacity: 0,
    x: -24
  },
  final: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.075, delayChildren: 0.025 }
  }
}

const buttonAnimation = {
  initial: {
    opacity: 0
  },
  final: {
    opacity: 1,
    transition: { delay: 0.025 + 0.075 * 4 }
  }
}

export default function App() {
  return (
    <AppBackground>
      <AppWrapper>
        <Body>
          <BodySection as={motion.div} variants={logoAnimation} initial="initial" animate="final">
            <Img alt="logo" src="static/logo.svg" />
          </BodySection>

          <BodySection>
            <H1>Uniswap is a protocol for automated token exchange on Ethereum.</H1>
          </BodySection>

          <BodySection>
            <PointsWrapper variants={pointAnimation} initial="initial" animate="final">
              <Point variants={pointAnimation}>
                A <A href="https://github.com/Uniswap/contracts-vyper">simple smart contract</A> interface for swapping
                ERC20 tokens
              </Point>
              <Point variants={pointAnimation}>
                A{' '}
                <A href="https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf">
                  formalized model
                </A>{' '}
                for pooling liquidity reserves
              </Point>
              <Point variants={pointAnimation}>
                An <A href="https://github.com/Uniswap/uniswap-frontend">open source frontend</A> interface for traders
                and liquidity providers
              </Point>
              <Point variants={pointAnimation}>A commitment to free and decentralized asset exchange</Point>
            </PointsWrapper>
          </BodySection>

          <BodySection>
            <ButtonsWrapper variants={buttonAnimation} initial="initial" animate="final">
              <AButton
                forwardedAs={motion.a}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                href="https://uniswap.exchange"
              >
                Swap Tokens
              </AButton>
              <AButton
                forwardedAs={motion.a}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                href="https://docs.uniswap.io"
              >
                Read the Docs
              </AButton>
            </ButtonsWrapper>
          </BodySection>
        </Body>

        <Footer>
          <FooterSection>
            <A href={'https://blog.ethereum.org/2018/08/17/ethereum-foundation-grants-update-wave-3/'}>
              Ethereum Foundation grant recipient ↗
            </A>
          </FooterSection>

          <FooterSection>
            <FooterActions>
              <A href="https://github.com/Uniswap">GitHub</A>
              <A href="https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig">Whitepaper</A>
              <A href="https://twitter.com/UniswapExchange">Twitter</A>
              <A href="https://discord.gg/Y7TF6QA">Discord</A>
              <A href="https://www.reddit.com/r/UniSwap/">Reddit</A>
              <A href="mailto:contact@uniswap.io">Email</A>
            </FooterActions>
          </FooterSection>
        </Footer>
      </AppWrapper>
    </AppBackground>
  )
}
