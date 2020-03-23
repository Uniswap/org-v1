import React from 'react'
import Img from 'gatsby-image'

import styled from 'styled-components'

const StyledMiniCards = styled.a`
  padding: 1.5rem;
  color: ${({ theme, outlined }) => (outlined ? theme.colors.link : theme.textColor)};
  width: 260px;
  height: ${({ small }) => (small ? '260px' : '320px')};
  max-width: 450px;
  margin: 1rem;
  box-shadow: ${({ theme, outlined }) => (!outlined ? theme.shadows.huge : 'none')};
  border: 1px solid ${({ outlined }) => (!outlined ? 'rgba(0, 0)' : 'rgba(255, 0, 122, 0.3)')};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
  will-change: transform;
  :hover {
    transform: scale(1.03);
  }

  @media (max-width: 960px) {
    width: 100%;
    max-width: 450px;
    height: 200px;
  }
`
const StyledCardBG = styled(Img)`
  width: 80px;
  height: 250px;
  position: absolute !important;
  top: 0px;
  right: 0px;
  background-size: auto;
  background-position: center;
  z-index: -1;
`

const StyledMiniCardHeader = styled.p`
  line-height: 130%;
  margin-top: 0px;
  font-weight: 500;
  font-size: 1.25rem;
  font-family: 'Inter Roman';
`

const StyledMiniCardDesc = styled.p`
  font-size: 1rem;
  line-height: 140%;
  font-weight: 400;
  padding-bottom: 1.5rem;
`

const StyledArrow = styled.span`
  position: absolute;
  left: 1.5rem;
  bottom: 1rem;
`

const MiniCard = props => {
  console.log(props.image)
  return (
    <StyledMiniCards
      {...props}
      style={{ backgroundColor: props.backgroundColor, color: props.color }}
      href={props.href}
    >
      {props.image && <StyledCardBG fluid={props.image} />}
      <StyledMiniCardHeader style={{ color: props.color }}>{props.title}</StyledMiniCardHeader>
      <StyledMiniCardDesc>{props.desc}</StyledMiniCardDesc>
      <StyledArrow>{'->'}</StyledArrow>
    </StyledMiniCards>
  )
}

export default MiniCard
