import React from 'react'
import styled from 'styled-components'
import InlineBoxLink from '../inlineBoxLink'

const StyledIframe = styled.iframe`
  padding: 1rem;
  color: ${({ theme, outlined }) => (outlined ? theme.colors.link : theme.textColor)};
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  width: 100%;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  overflow: hidden;
  pointer-events: none;
`

const Iframe = ({ src, height }) => (
  <>
    <StyledIframe style={{ height: height }} src={src} />
    <InlineBoxLink style={{ marginTop: '-120px' }} title="Read more" to={'src'} />
  </>
)

export default Iframe
