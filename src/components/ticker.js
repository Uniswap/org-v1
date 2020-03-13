import React, { useState, useRef, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import styled, { keyframes } from 'styled-components'

const APOLLO_QUERY = gql`
  {
    uniswap(id: "1") {
      totalVolumeUSD
      totalLiquidityUSD
      exchangeCount
    }

    exchanges(where: { tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" }) {
      price
    }
  }
`

const moveHorizonatally = props => keyframes`
100% { transform: translateX(-50%); }
`

const MarqueeWrapper = styled.a`
  position: fixed;
  z-index: 99;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  animation: ${props => moveHorizonatally(props)} ${props => props.time}s linear infinite;
  font-size: 1rem;

  :hover {
    animation-play-state: paused;
  }
`

const Stats = styled.div`
  color: ${({ theme }) => theme.invertedTextColor};
  background-color: black;
  padding: 0rem 0.5rem;
  background-color: ${({ theme }) => theme.marqueeBG};
  align-items: center;
  text-transform: uppercase;
  letter-spacing: -0.03rem;
  white-space: pre;
  font-weight: 300;
  transform: translateX(0%);
`

const NP = styled.span`
  font-weight: 500;
`

const AnimatingEl = props => {
  const ref = useRef()

  return (
    <Stats ref={ref}>
      <NP>{props.stat[0]}</NP>
      {props.stat[1]}
    </Stats>
  )
}

export default function Ticker() {
  const { loading, error, data } = useQuery(APOLLO_QUERY)
  const node = useRef()
  const [totalElements, setTotalElements] = useState(20)

  let UniStats = {
    key: function(n) {
      return this[Object.keys(this)[n]]
    }
  }

  useEffect(() => {
    if (window.innerWidth > node.current.offsetWidth) {
      setTotalElements(totalElements + 1)
    }
  }, [totalElements, setTotalElements])

  if (!loading && !error) {
    UniStats.volume = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumSignificantDigits: 5
      }).format(data.uniswap.totalVolumeUSD),
      ' 24h Volume'
    ]
    UniStats.liquidity = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumSignificantDigits: 5
      }).format(data.uniswap.totalLiquidityUSD),
      ' Total Liquidity'
    ]
    UniStats.exchanges = [Number.parseFloat(data.uniswap.exchangeCount), ' Total Exchanges']
    UniStats.ETHprice = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumSignificantDigits: 5
      }).format(data.exchanges[0].price),
      ' Uni ETH Price'
    ]
  }

  return loading || error ? (
    <MarqueeWrapper href="https://uniswap.info" ref={node} />
  ) : (
    <MarqueeWrapper href="https://uniswap.info" ref={node} time={100}>
      {Array.from({ length: totalElements }).map((_, idx) => {
        return <AnimatingEl stat={UniStats.key((idx % 4) + 1)} key={idx} />
      })}
    </MarqueeWrapper>
  )
}
