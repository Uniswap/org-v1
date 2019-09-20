import styled from 'styled-components'

import { transparentize } from 'polished'

const StyledA = styled.a`
  min-width: 14rem;
  min-height: 3rem;
  border-radius: 3.5rem;
  border: 1px solid ${({ theme }) => transparentize(0.25, theme.colors.white)};
  background-color: ${({ theme }) => transparentize(0.5, theme.colors.button)};
  transition: background-color 150ms ease-in-out;
  text-decoration: none;
  line-height: 3rem;
  text-align: center;
  user-select: none;
  outline: none;

  :hover {
    cursor: pointer;
    text-decoration: none;
    background-color: ${({ theme }) => transparentize(0.1, theme.colors.button)};
    border: 1px solid ${({ theme }) => transparentize(0, theme.colors.white)};
  }

  :focus {
    background-color: ${({ theme }) => transparentize(0.1, theme.colors.button)};
    border: 1px solid ${({ theme }) => transparentize(0, theme.colors.white)};
  }
`

export default function A({ href, ...rest }) {
  return <StyledA href={href} target="_blank" rel="noopener noreferrer" {...rest} />
}
