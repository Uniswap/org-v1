import React from 'react'
import Img from 'gatsby-image'

import styled from 'styled-components'

const StyledMiniCards = styled.a`
  padding: 1.5rem;
  color: ${({ theme, outlined }) => (outlined ? theme.textColor : theme.textColor)};
  width: 300px;
  height: ${({ small }) => (small ? '160px' : '320px')};
  max-width: 450px;
  margin: 0.5rem;
  box-shadow: ${({ theme, outlined }) => (!outlined ? theme.shadows.huge : 'none')};
  border-radius: 8px;
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
    margin: 1rem 0;
    height: ${({ small }) => !small && '200px'};
    /* height: 200px; */
  }

  border: 1px solid ${({ theme }) => theme.colors.grey2};

  transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);

  :hover {
    transform: translate3d(2px, 2px, 10px);
    border: 1px solid ${({ theme }) => theme.colors.grey3};
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
`

const MiniCard = props => {
  return (
    <StyledMiniCards {...props} outlined={true} href={props.href}>
      {props.image && <StyledCardBG fluid={props.image} />}
      <StyledMiniCardHeader>{props.title}</StyledMiniCardHeader>
      <StyledMiniCardDesc>{props.desc}</StyledMiniCardDesc>
    </StyledMiniCards>
  )
}

export default MiniCard
