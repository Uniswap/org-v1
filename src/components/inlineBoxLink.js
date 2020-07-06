import React from 'react'
// import Img from 'gatsby-image'
import { Link } from 'gatsby'

import styled from 'styled-components'

const StyledBoxLink = styled(Link)`
  padding: 1rem;
  color: ${({ theme, outlined }) => (outlined ? theme.colors.link : theme.textColor)};
  border: 1px solid ${({ theme }) => theme.colors.pink2};
  width: 100%;
  margin-right: 1rem;
  margin-bottom: 1.45rem;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: transform 0.3s ease;
  will-change: transform;
  :hover {
    transform: scale(1.01);
  }

  @media (max-width: 960px) {
    width: 100%;
    max-width: 450px;
    margin: 1rem 0;
    height: ${({ small }) => !small && '200px'};
    /* height: 200px; */
  }
`
const StyledCardBG = styled.img`
  width: 80px;
  height: 220px;
  position: absolute !important;
  top: 0px;
  right: 0px;
  background-size: auto;
  background-position: center;
  z-index: -1;
`

const StyledMiniCardHeader = styled.p`
  /* line-height: 130%; */
  margin-top: 0px;
  font-weight: 500;
  font-size: 1.25rem;
  font-family: 'Inter Roman';
  margin: 0;
`

const StyledMiniCardDesc = styled.p`
  font-size: 1rem;
  line-height: 140%;
  font-weight: 400;
  padding-bottom: 1.5rem;
`

const StyledArrow = styled.span`
  position: absolute;
  right: 1.5rem;
  top: 1rem;
`

const InlineCard = props => {
  return (
    <StyledBoxLink {...props} style={{ backgroundColor: props.backgroundColor, color: props.color }} to={props.to}>
      {props.image && <StyledCardBG src={props.image} />}
      <StyledMiniCardHeader style={{ color: props.color }}>{props.title}</StyledMiniCardHeader>
      {props.desc && <StyledMiniCardDesc>{props.desc}</StyledMiniCardDesc>}
      <StyledArrow>{'->'}</StyledArrow>
      {props.children}
    </StyledBoxLink>
  )
}

export default InlineCard
