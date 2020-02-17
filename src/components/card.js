import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme, index }) =>
    index === 0 ? theme.colors.white : 'none'};
  box-shadow: ${({ theme, index }) =>
    index === 0 ? theme.shadows.huge : 'none'};
  padding: 1.5rem;
  max-width: 300px;

  /* min-height: 350px; */
  border-radius: 20px;
  /* margin: 2rem; */
  text-decoration: none;
  transform: scale(0.99);
  background-color: rgba(255,255,255,0.4);

  /* box-shadow: ${({ theme, index }) => theme.shadows.small}; */
  border: 1px solid
    ${({ theme, index }) => (index === 0 ? 'none' : theme.colors.grey2)};
  transition: transform 0.25s ease;

  :hover {
    background-color: ${({ theme }) => theme.colors.white};
    /* box-shadow: ${({ theme, index }) => theme.shadows.huge}; */
    transform: scale(1);
  }
`

const StyledCardTitle = styled.p`
  color: ${({ theme }) => theme.colors.grey9};
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 800;
`

const StyledCardDesc = styled.p`
  color: ${({ theme }) => theme.colors.grey6};
  margin: 0;
  padding-top: 2rem;
  font-size: 1rem;
`

const StyledArrowRight = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-top: 1rem;
`

const NewPill = styled.p`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.link};
  padding: 0rem 0.5rem;
  position: absolute;
  left: -1rem;
  top: -0.75rem;
  border-radius: 1rem;
  text-align: center;
  margin: 0;
  transform: rotateZ(-30deg);
`

const Card = ({ node, index }) => {
  return (
    <StyledCard index={index} to={node.slug}>
      {node.type === 'New' ? <NewPill>New</NewPill> : null}
      <StyledCardTitle>{node.cardTitle}</StyledCardTitle>
      <div>
        <StyledCardDesc>{node.cardDesc}</StyledCardDesc>
        <StyledArrowRight>Learn more -></StyledArrowRight>
      </div>
    </StyledCard>
  )
}
export default Card
