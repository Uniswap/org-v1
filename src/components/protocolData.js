import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { client } from '../apollo/client'
import { GLOBAL_QUERY } from '../apollo/queries'
import Glimmer from '../images/glimmer_center.svg'
import GlimmerGray from '../images/glimmer_gray.svg'

const StyledSectionFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  max-width: 960px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 0rem;
    flex-direction: ${({ wrapSmall }) => (!wrapSmall ? 'row' : 'column')};
  }
  @media (max-width: 960px) {
    padding: 1rem;
    margin-left: 0;
    margin-top: 0rem;
    width: 100%;
    flex-direction: column;
  }
  @media (max-width: 640px) {
    display: none;
  }
  h1,
  h2 {
    max-width: 650px;
  }
  p {
    max-width: 650px;
  }
`

const Numbers = styled(StyledSectionFlex)`
  @media (max-width: 960px) {
    /* display: none; */
  }
`

const BigNumbers = styled(StyledSectionFlex)`
  font-size: 48px;
  font-weight: 700;
  flex-direction: column;
  position: relative;
  overflow: visisble;
  p {
    font-weight: 300;
  }
  @media (max-width: 960px) {
    font-size: 32px;
  }
`

export const Sparkle = styled.div`
  background: url(${Glimmer});
  width: 60px;
  height: 60px;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;

  top: -30px;
  left: -30px;
`

export const SparkleBottom = styled.div`
  background: url(${Glimmer});
  width: 60px;
  height: 60px;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  right: -30px;
  bottom: -30px;
`

export const SparkleGray = styled.div`
  background: url(${GlimmerGray});
  width: 60px;
  height: 60px;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  right: -30px;
  bottom: -30px;
`

export const SparkleTopRight = styled.div`
  background: url(${GlimmerGray});
  width: 60px;
  height: 60px;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  top: -30px;
  right: -30px;
`

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

const ProtocolData = () => {
  const { data: globalData } = useQuery(GLOBAL_QUERY, { pollInterval: 10000, client: client })

  // hardcode at 1B in case of data failure
  // const volume = globalData ? globalData?.uniswapFactory?.totalVolumeUSD : 100000000000
  const transactions = globalData ? globalData?.uniswapFactory?.txCount : 29000000

  // const formattedVol = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   notation: 'compact',
  //   compactDisplay: 'short'
  //   // maximumSignificantDigits: 5
  // }).format(volume)

  const formattedTransactions = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
    // maximumSignificantDigits: 5
  }).format(transactions)

  return (
    <Numbers id="about" style={{ flexDirection: 'column' }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}>
        <BigNumbers>
          <Sparkle />
          <span>$386B</span>
          <p style={{ fontSize: '14px' }}>Trade Volume</p>
          <SparkleGray />
        </BigNumbers>
        <BigNumbers>
          <SparkleTopRight />

          <SparkleGray />
          <span>1.5M+</span>
          <p style={{ fontSize: '14px' }}>All Time Users</p>
        </BigNumbers>
        <BigNumbers>
          <span>{formattedTransactions}</span>
          <p style={{ fontSize: '14px' }}>All Time Trades</p>
          <SparkleGray />
        </BigNumbers>

        <BigNumbers>
          <SparkleBottom />
          <span>8,400+</span>
          <p style={{ fontSize: '14px' }}>Community Delegates</p>
        </BigNumbers>
      </div>
    </Numbers>
  )
}

export default ProtocolData
