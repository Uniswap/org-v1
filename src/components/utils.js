import styled from 'styled-components'
import uImage from '../images/big_unicorn_fade.png'
import noise from '../images/noise.png'
import { Link } from 'gatsby'

export const CardBGImage = styled.span`
  mix-blend-mode: ${({ isDark }) => (isDark ? 'overlay' : 'lighten')};
  background: url(${uImage});
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-size: contain;
  position: absolute;
  left: 0;
  background-repeat: no-repeat;

  top: 0;
  ${({ desaturate }) => desaturate && `filter: saturate(0)`};
  @media (max-width: 960px) {
    background-repeat: no-repeat;
  }
`

export const CardNoise = styled.span`
  background: url(${noise});
  mix-blend-mode: overlay;
  width: 100%;
  height: 100%;
  /* max-width: 1000px; */
  opacity: 0.3;
  position: absolute;
  left: 0;
  top: 0;
  user-select: none;
  z-index: 99;
`

export const CardFade = styled.span`
  /* mix-blend-mode: overlay; */
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.gradientBG};
  /* max-width: 1000px; */
  position: absolute;
  left: 0;
  top: 0;
  user-select: none;
  z-index: 99;
  @media (max-width: 960px) {
    height: 125vh;
  }
`

export const StyledLink = styled(Link)`
  font-family: 'GT Haptik Regular';
  margin: 0;
  padding: 0;
  text-decoration: none;
  margin: 0.25rem 0;
  display: block;
  width: 100%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  width: fit-content;
  color: ${({ theme }) => theme.textColor};
  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);

  :hover {
    transform: translate3d(2px, 2px, 10px);
  }
  @media (max-width: 960px) {
    font-size: 20px;
  }
`
export const StyledExternalLink = styled.a`
  font-family: 'GT Haptik Regular';
  margin: 0;
  padding: 0;
  text-decoration: none;
  display: block;
  margin: 0.25rem 0;
  font-size: 24px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.cardBG};
  border-radius: 12px;
  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);

  :hover {
    transform: translate3d(2px, 2px, 10px);
  }
  @media (max-width: 960px) {
    font-size: 20px;
  }
`
