import React from 'react'
import styled from 'styled-components'

const StyledCode = styled.code`
  color: inherit !important;
  cursor: inherit !important;
`

export default function InlineCode({ children }) {
  return <StyledCode>{children}</StyledCode>
}
