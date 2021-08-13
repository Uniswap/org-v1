import styled, { css } from 'styled-components'

const ButtonStyles = css`
  padding: 0.35rem 0.85rem;
  text-decoration: none;
  border-radius: 12px;
  display: inline-block;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 1.125rem;
  cursor: pointer;
  width: fit-content;
  @media (max-width: 960px) {
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
    border: ${({ outlined, theme }) => (outlined ? `1px solid ${theme.buttonBorderHover}` : 'initial')};
  }
  background-color: ${({ outlined, theme }) => (outlined ? theme.cardBG : theme.textColor)};
  color: ${({ outlined, theme }) => (outlined ? theme.textColor : theme.invertedTextColor)};
  border: ${({ outlined, theme }) => (outlined ? `1px solid ${theme.buttonBorder}` : 'initial')};
`

export const Button = styled.a`
  ${ButtonStyles};
`

export default Button
