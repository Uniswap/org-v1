import React from 'react'
import { Redirect } from '@reach/router'

export default function Redirector({ path }) {
  return (
    <Redirect
      from={path}
      to={`https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleSlidingWindowOracle.sol`}
      noThrow
    />
  )
}
