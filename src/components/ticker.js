import React, { useState, useLayoutEffect } from 'react'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import Marquee3k from 'marquee3000'

const MarqueeWrapper = styled.a`
  position: fixed;
  z-index: 99;
  bottom: 0px;
  left: 0px;
  width: 100%;
  font-size: 1rem;

  .marquee3k__wrapper {
    will-change: transform;
  }
  .ticker__copy {
    background-color: black;
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
`

const NP = styled.span`
  font-weight: 600;
`

const AnimatingEl = props => {
  return (
    <Stats>
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

  // const { loading, error, data } = useQuery(APOLLO_QUERY, { pollInterval: 5000 })
  const { loading, error, data } = useQuery(APOLLO_QUERY, { pollInterval: 10000 })

  // const { loading, error, data } = useQuery(APOLLO_QUERY)

  const { loading: loadingHistoric, error: errorHistoric, data: dataHistorical } = useQuery(
    UNISWAP_GLOBALS_24HOURS_AGO_QUERY,
    {
      variables: {
        date: utcOneDayBack.unix()
      }
    }
  )

  const [totalElements] = useState(8)

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
    UniStats.exchanges = [Number.parseFloat(data.uniswap.exchangeCount), ' Total Pools']

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

  useLayoutEffect(() => {
    if (loading === false && UniStats.volume !== undefined) {
      updateInitialized(true)
    }
  }, [loading, UniStats.volume])

  useLayoutEffect(() => {
    initialized &&
      Marquee3k.init({
        selector: 'ticker' // define a custom classname
      })
  }, [initialized])

  return (
    initialized && (
      <MarqueeWrapper className="ticker" data-speed="0.25" data-pausable="true">
        <div>
          {Array.from({ length: totalElements }).map((_, idx) => {
            console.log('rendering...')
            return <AnimatingEl stat={UniStats.key((idx % 4) + 1)} key={idx} />
          })}
        </div>
      </MarqueeWrapper>
    )
  )
}
