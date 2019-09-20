import styled from 'styled-components'

const StyledA = styled.a`
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

export default function A({ href, ...rest }) {
  return <StyledA href={href} target="_blank" rel="noopener noreferrer" {...rest} />
}
