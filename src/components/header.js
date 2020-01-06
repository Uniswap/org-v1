import React from "react"
import { Link, navigate } from "gatsby"
import { Button, Box, Heading } from "rebass"
import styled from "styled-components"
import logo from "../../static/logo.svg"

const StyledHeader = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
`

const StyledHome = styled(Box)`
  display: flex;
  flex-direction: row;
`

const StyledSVG = styled.img`
  max-width: 24px;
  max-height: 24px;
  margin-right: 0.25rem;
  margin-bottom: 0px;
`

export default function Header() {
  return (
    <StyledHeader>
      <Link
        to="/"
        style={{
          textDecoration: `none`
        }}
      >
        <span style={{ display: "flex", flexDirection: "row" }}>
          <StyledSVG src={logo} alt={"Uniswap Icon"} />
          Uniswap
        </span>{" "}
      </Link>

      <Box style={{ display: "flex", flexDirection: "row" }}>
        <Box ml={2} variant="primary" onClick={() => navigate("/docs")}>
          Products
        </Box>
        <Box ml={2} variant="primary" onClick={() => navigate("/docs")}>
          <Link
            to="/docs"
            style={{
              textDecoration: `none`
            }}
          >
            Developers
          </Link>
        </Box>
        <Box ml={2} variant="primary" onClick={() => navigate("/docs")}>
          About
        </Box>
        <Box ml={2} variant="primary" onClick={() => navigate("/docs")}>
          Swap Tokens
        </Box>
      </Box>
    </StyledHeader>
  )
}
