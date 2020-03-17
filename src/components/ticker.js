import React, { useState, useRef, useEffect } from 'react'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useQuery } from '@apollo/react-hooks'
import styled, { keyframes } from 'styled-components'

const moveHorizontally = () => keyframes`
100% { transform: translateX(-100%); }
`

const MarqueeWrapper = styled.a`
  position: fixed;
  z-index: 99;
  bottom: 0px;
  left: 0px;
  display: flex;
  max-width: 150vw;
  flex-direction: row;
  flex-wrap: no-wrap;
  transform: translateX(-50%);
  animation: ${props => moveHorizontally(props)} ${props => props.time}s linear infinite;
  font-size: 1rem;

  @media (max-width: 960px) {
    max-width: 100vw;
    animation: ${props => moveHorizontally(props)} 10s linear infinite;
  }

  :hover {
    animation-play-state: paused;
  }
`

const Stats = styled.span`
  color: ${({ theme }) => theme.colors.white};
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
  font-weight: 600;
`

const AnimatingEl = props => {
  const ref = useRef()

  return (
    <Stats ref={ref}>
      <NP>{props.stat && props.stat[0]}</NP>
      {props.stat && props.stat[1]}
    </Stats>
  )
}

const APOLLO_QUERY = gql`
  {
    uniswap(id: "1") {
      totalVolumeUSD
      totalLiquidityUSD
      exchangeCount
    }

    usdcPrice: exchanges(where: { tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" }) {
      price
    }

    daiPrice: exchanges(where: { tokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f" }) {
      price
    }
  }
`
export const UNISWAP_GLOBALS_24HOURS_AGO_QUERY = gql`
  query uniswapHistoricalDatas($date: Int!) {
    uniswapHistoricalDatas(where: { timestamp_lt: $date }, first: 1, orderBy: timestamp, orderDirection: desc) {
      totalVolumeUSD
      totalLiquidityUSD
    }
  }
`

export default function Ticker() {
  //setup time constants
  dayjs.extend(utc)
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day')
  const [initialized, updateInitialized] = useState(false)

  const { loading, error, data } = useQuery(APOLLO_QUERY, { pollInterval: 1000 })

  const { loading: loadingHistoric, error: errorHistoric, data: dataHistorical } = useQuery(
    UNISWAP_GLOBALS_24HOURS_AGO_QUERY,
    {
      variables: {
        date: utcOneDayBack.unix()
      }
    }
  )

  const node = useRef()
  const [totalElements, setTotalElements] = useState(2)

  let UniStats = {
    key: function(n) {
      return this[Object.keys(this)[n]]
    }
  }

  if (!loading && !error && !loadingHistoric && !errorHistoric) {
    const volume24Hour = data.uniswap.totalVolumeUSD - dataHistorical.uniswapHistoricalDatas[0].totalVolumeUSD

    UniStats.volume = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short'
        // maximumSignificantDigits: 5
      }).format(volume24Hour),
      ' 24h Volume'
    ]
    UniStats.liquidity = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short'
        // maximumSignificantDigits: 5
      }).format(data.uniswap.totalLiquidityUSD),
      ' Total Liquidity'
    ]
    UniStats.exchanges = [Number.parseFloat(data.uniswap.exchangeCount), ' Total Exchanges']

    let averagePrice = 0
    const usdcPrice = data && data.usdcPrice && data.usdcPrice[0].price
    const daiPrice = data && data.daiPrice && data.daiPrice[0].price
    if (usdcPrice && daiPrice) {
      averagePrice = (parseFloat(usdcPrice) + parseFloat(daiPrice)) / 2
    }

    UniStats.ETHprice = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumSignificantDigits: 5
      }).format(averagePrice),
      ' Uni ETH Price'
    ]
  }

  useEffect(() => {
    !loading && updateInitialized(true)
  }, [loading])

  useEffect(() => {
    if (window.innerWidth > node.current.offsetWidth) {
      setTotalElements(totalElements + 1)
    }
  }, [totalElements, setTotalElements])

  useEffect(() => {
    /**
     *
     * could trigger some animation here on, we know the price changed
     *
     * usually the price change is so small that it actualy
     * doesnt display the display amount, so many we'd want to
     * detect a price percent change
     *
     */
  }, [UniStats.ETHprice])

  return (loading && !initialized) || error ? (
    <MarqueeWrapper href="https://uniswap.info" ref={node} />
  ) : (
    <MarqueeWrapper href="https://uniswap.info" ref={node} time={100}>
      {Array.from({ length: totalElements }).map((_, idx) => {
        return <AnimatingEl stat={UniStats.key((idx % 4) + 1)} key={idx} />
      })}
    </MarqueeWrapper>
  )
}
