import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h2`
  font-size: 64px;
  margin: 2rem 0 4rem 0;
  pointer-events: none;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  text-align: center;
  @media (max-width: 960px) {
    width: 100%;
    font-size: 4rem;
    line-height: 4.5rem;
    margin: 2rem 0 2rem 0;
    max-width: 600px;
  }
  @media (max-width: 375px) {
    width: 100%;
    font-size: 3.25rem;
    line-height: 3.5rem;
    margin: 2rem 0 4rem 0;
    font-weight: 400;
  }
`

const Title = ({ children }) => <StyledTitle>{children}</StyledTitle>

export default Title
