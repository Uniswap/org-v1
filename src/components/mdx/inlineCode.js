import React from 'react'
import styled from 'styled-components'

const StyledCode = styled.code`
  color: inherit !important;
  cursor: inherit !important;
  background-color: ${({ theme }) => theme.colors.grey1};
`

export default function InlineCode({ children }) {
  return <StyledCode>{children}</StyledCode>
}
