import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

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

export default function Ticker() {
  const { loading, error, data } = useQuery(APOLLO_QUERY)

  if (!loading && !error) {
    console.log(Number.parseFloat(data.uniswap.totalVolumeUSD))
    console.log(Number.parseFloat(data.uniswap.totalLiquidityUSD))
    console.log(Number.parseFloat(data.uniswap.exchangeCount))
    console.log(Number.parseFloat(data.exchanges[0].price))
  }

  return loading || error ? null : <p>replace me!</p>
}
