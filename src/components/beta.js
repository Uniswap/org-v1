import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.p`
  position: fixed;
  right: 2rem;
  bottom: 4px;
  font-size: 14px;
  font-style: italic;
  max-width: 200px;
  color: ${({ theme }) => theme.colors.link};
  padding: 0.75rem;
  border-radius: 12px 12px 0 0;
  background-color: ${({ theme }) => theme.menuBG};
  border: 1px solid ${({ theme }) => theme.colors.grey2};

  z-index: 60;

  @media (max-width: 960px) {
    position: relative;
    width: 100%;
    left: 0.5rem;
    bottom: 1rem;
    border: none;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      This site is a work in progress.{' '}
      <a href="https://github.com/Uniswap/uniswap-site-v2/issues">
        <u>Found an issue?</u>
      </a>
    </StyledFooter>
  )
}
export default Footer
