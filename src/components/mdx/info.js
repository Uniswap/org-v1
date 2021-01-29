import React from 'react'
import styled from 'styled-components'
import { Info as InfoIcon } from 'react-feather'

const StyledInfo = styled.div`
  color: ${({ theme }) => theme.textColor};
  padding: 1rem;
  /* background-color: ${({ theme }) => theme.colors.yellow2}; */
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.textColor};
  margin-bottom: 1.5rem;
  font-weight: 350;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    padding: 0 0.25rem;
    display: contents;
  }
`

const StyledInfoIcon = styled(InfoIcon)`
  width: 16px;
  margin-right: 16px;
  min-width: 16px;
  path {
    fill: ${({ theme }) => theme.colors.grey9};
  }
`

const Info = ({ children }) => (
  <StyledInfo>
    <StyledInfoIcon />
    {children}
  </StyledInfo>
)

export default Info
