import React from 'react'
import styled from 'styled-components'

const StyledInfo = styled.div`
  color: ${({ theme }) => theme.colors.grey9};
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.grey1};
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
`

const Info = ({ children }) => <StyledInfo>{children}</StyledInfo>

export default Info
