import React from "react"
import { Redirect } from "@reach/router" // highlight-line

const IndexPage = props => (
  <Redirect from={props.path} to={props.path + `get-started/`} noThrow />
) // highlight-line

export default IndexPage
