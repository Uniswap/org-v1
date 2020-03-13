import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.p`
  position: fixed;
  right: 2rem;
  bottom: 0rem;
  font-size: 14px;
  font-style: italic;
  max-width: 200px;
  opacity: 0.4;
  color: ${({ theme }) => theme.colors.link};
`

const Footer = () => {
  return (
    <StyledFooter>
      This site is a work in progress. Found an issue?{' '}
      <a href="https://github.com/Uniswap/uniswap-site-v2/issues">
        <u>Get in touch.</u>
      </a>
    </StyledFooter>
  )
}
export default Footer
