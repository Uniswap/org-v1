import React, { useState, useLayoutEffect, useEffect } from 'react'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { client, blockClient } from '../apollo/client'

import Marquee3k from 'marquee3000'

const MarqueeWrapper = styled.a`
  position: fixed;
  z-index: 10000;
  bottom: 0px;
  left: 0px;
  width: 100%;

  @media (max-width: 375px) {
    font-size: 1.75rem;
  }
  .marquee3k__wrapper {
    will-change: transform;
  }
  .ticker__copy {
    background-color: transparent;
    color: ${({ theme }) => theme.textColor};
  }
`

const Stats = styled.span`
  color: ${({ theme }) => theme.textColor};
  background-color: transparent;
  padding: 0rem 0.5rem;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: -0.03rem;
  white-space: pre;
  font-weight: 300;
  font-style: normal;
  font-weight: lighter;
  font-size: 20px;
  line-height: 145.23%;
`

const NP = styled.span`
  font-weight: 500;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
`

const AnimatingEl = props => {
  return (
    <Stats>
      <NP>{props.stat && props.stat[0]}</NP>
      {props.stat && props.stat[1]}
    </Stats>
  )
}

export const GET_BLOCK = gql`
  query blocks($timestamp: Int!) {
    blocks(first: 1, orderBy: timestamp, orderDirection: asc, where: { timestamp_gt: $timestamp }) {
      id
      number
      timestamp
    }
  }
`

export const ETH_PRICE = block => {
  const queryString = block
    ? `
    query bundles {
      bundles(where: { id: ${1} } block: {number: ${block}}) {
        id
        ethPrice
      }
    }
  `
    : ` query bundles {
      bundles(where: { id: ${1} }) {
        id
        ethPrice
      }
    }
  `
  return gql(queryString)
}

const APOLLO_QUERY = gql`
  {
    uniswapFactory(id: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f") {
      totalVolumeUSD
      totalLiquidityUSD
      pairCount
    }
    bundle(id: 1) {
      ethPrice
    }
  }
`

export const UNISWAP_GLOBALS_24HOURS_AGO_QUERY = block => {
  let queryString = `
  query uniswapFactory {
    uniswapFactory(id: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", block: { number: ${block} }) {
      totalVolumeUSD
      totalLiquidityUSD
      pairCount
    
    }
  }
  `
  return gql(queryString)
}

export default function Ticker() {
  //setup time constants
  dayjs.extend(utc)
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').unix()
  const [initialized, updateInitialized] = useState(false)

  const { data: blockData } = useQuery(GET_BLOCK, {
    client: blockClient,
    variables: {
      timestamp: utcOneDayBack
    }
  })
  const oneDayBackBlock = blockData?.blocks?.[0]?.number
  const { loading, data } = useQuery(APOLLO_QUERY, { pollInterval: 10000, client: client })

  const [oneDayResult, setOnedayResult] = useState()

  useEffect(() => {
    async function getData() {
      let result = await client.query({
        query: UNISWAP_GLOBALS_24HOURS_AGO_QUERY(oneDayBackBlock),

        fetchPolicy: 'cache-first'
      })
      if (result) {
        setOnedayResult(result?.data?.uniswapFactory)
      }
    }
    if (oneDayBackBlock) {
      getData()
    }
  }, [oneDayBackBlock])

  const [totalElements] = useState(8)

  let UniStats = {
    key: function(n) {
      return this[Object.keys(this)[n]]
    }
  }

  if (data && oneDayResult) {
    const volume24Hour = parseFloat(data?.uniswapFactory?.totalVolumeUSD) - parseFloat(oneDayResult?.totalVolumeUSD)

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
      }).format(data.uniswapFactory.totalLiquidityUSD),
      ' Total Liquidity'
    ]
    UniStats.exchanges = [Number.parseFloat(data?.uniswapFactory?.pairCount), ' Total Pools']

    UniStats.ETHprice = [
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumSignificantDigits: 5
      }).format(parseFloat(data?.bundle?.ethPrice)),
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
      <MarqueeWrapper href="https://uniswap.info/" className="ticker" data-speed="0.25" data-pausable="true">
        <div>
          {Array.from({ length: totalElements }).map((_, idx) => {
            return <AnimatingEl stat={UniStats.key((idx % 4) + 1)} key={idx} />
          })}
        </div>
      </MarqueeWrapper>
    )
  )
}
