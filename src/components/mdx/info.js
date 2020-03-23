import React from 'react'
import styled from 'styled-components'

const StyledInfo = styled.div`
  color: ${({ theme }) => theme.textColor};
  padding: 1rem;
  /* background-color: ${({ theme }) => theme.colors.grey1}; */
  background-color: #FFF4D2;
  color: #5a3800;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 350;
`

const Info = ({ children }) => <StyledInfo>{children}</StyledInfo>

export default Info
