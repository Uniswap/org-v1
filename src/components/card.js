import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme, index }) =>
    index === 0 ? theme.shadows.huge : 'none'};
  padding: 1.5rem;
  width: 336px;
  min-height: 356px;
  border-radius: 0.5rem;
  margin-right: 2rem;
  text-decoration: none;
  transform: scale(0.99);
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  transition: transform 0.25s ease;

  :hover {
    box-shadow: ${({ theme, index }) => theme.shadows.huge};
    transform: scale(1);
  }
`

const StyledCardTitle = styled.p`
  color: ${({ theme }) => theme.colors.grey9};
  font-size: 1.5rem;
  font-weight: 500;
`

const StyledCardDesc = styled.p`
  color: ${({ theme }) => theme.colors.grey5};
  margin: 0;
`

const StyledArrowRight = styled.div`
  color: ${({ theme }) => theme.colors.link};
  width: 100%;
  height: 1rem;
  text-align: right;
  margin: 0;
`

const NewPill = styled.p`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.link};
  padding: 0rem 0.5rem;
  position: absolute;
  top: 0;
  left: -1rem;
  border-radius: 1rem;
  text-align: center;
  margin: 0;
  transform: rotateZ(-25deg);
  box-shadow: ${({ theme, index }) => theme.shadows.small};
`

const Card = ({ node, index }) => {
  return (
    <StyledCard index={index} to={'/guides' + node.fields.slug}>
      {node.frontmatter.type === 'New' ? <NewPill>New</NewPill> : null}
      <StyledCardTitle>{node.frontmatter.cardTitle}</StyledCardTitle>
      <StyledCardDesc>
        {node.frontmatter.cardDesc}
        <StyledArrowRight>→</StyledArrowRight>
      </StyledCardDesc>
    </StyledCard>
  )
}
export default Card
