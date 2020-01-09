import React from "react"
import { Redirect } from "@reach/router" // highlight-line

const IndexPage = props => (
  <Redirect from={props.path} to={props.path + `connect-to-uniswap/`} noThrow />
) // highlight-line

export default IndexPage
