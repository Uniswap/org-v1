import styled, { css } from 'styled-components'

const ButtonStyles = css`
  padding: 0.35rem 0.85rem;
  text-decoration: none;
  border-radius: 12px;
  display: inline-block;
  transform: scale(0.98);
  transition: transform 0.25s ease;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  width: fit-content;
  @media (max-width: 960px) {
    /* margin: 0 0.5rem 0 0.5rem; */
    text-align: center;
    text-decoration: none;
    padding: 0.25rem 1rem;
  }
  @media (max-width: 640px) {
    width: 100%;
    padding: 0.85rem 0.85rem;
  }
  :hover {
    transform: scale(1);
  }
  background-color: ${({ outlined, theme }) => (outlined ? 'none' : theme.textColor)};
  color: ${({ outlined, theme }) => (outlined ? theme.textColor : theme.invertedTextColor)};
  border: ${({ outlined, theme }) => (outlined ? `1px solid ${theme.buttonBorder}` : 'initial')};
`

export const Button = styled.a`
  ${ButtonStyles};
`

export default Button
