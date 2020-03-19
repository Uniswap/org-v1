import React from 'react'
import Img from 'gatsby-image'

import styled from 'styled-components'

const StyledMiniCards = styled.a`
  padding: 1.5rem;
  /* font-size: 20px; */
  color: ${({ theme }) => theme.textColor};
  width: 260px;
  height: 360px;
  margin: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.huge};
  border-radius: 12px;
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
  /* z-index: -1; */
`

const StyledMiniCardHeader = styled.p`
  color: ${({ theme }) => theme.textColor};
  max-width: 130px;
  line-height: 130%;
  margin-top: 0px;
  font-weight: 500;
  font-size: 1.25rem;
  font-family: 'Inter';
`

const StyledMiniCardDesc = styled.p`
  font-size: 1rem;
  line-height: 140%;
  font-weight: 400;
  max-width: 90%;
  margin-bottom: 0px;
`

const MiniCard = props => {
  return (
    <StyledMiniCards style={{ backgroundColor: props.backgroundColor, color: props.color }} href={props.href}>
      <StyledCardBG fluid={props.image} />
      <StyledMiniCardHeader style={{ color: props.color }}>{props.title}</StyledMiniCardHeader>
      <StyledMiniCardDesc>{props.desc}</StyledMiniCardDesc>
    </StyledMiniCards>
  )
}

export default MiniCard
