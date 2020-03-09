import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const StyledCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  max-width: 300px;
  border-radius: 20px;
  text-decoration: none;
  transform: scale(0.99);
  background-color: ${({ theme }) => theme.cardBG};
  opacity: 0.9;
  transition: transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
  will-change: transform;
  /* backdrop-filter: blur(40px); */
  cursor: pointer;

  @media (max-width: 960px) {
    margin-bottom: 2rem;
    padding: 1rem;
    max-width: 100%;
    width: 100%;
  }

  :hover {
    transform: scale(1);
  }

  ::after {
    content: '';
    position: absolute;
    border-radius: 20px;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: ${({ theme }) => theme.shadows.huge};
    opacity: 0;
    transition: opacity 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
    will-change: opacity;
  }

  :hover::after {
    opacity: 1;
  }
`

const StyledExternalCard = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  max-width: 300px;
  border-radius: 20px;
  text-decoration: none;
  transform: scale(0.99);
  background-color: ${({ theme }) => theme.cardBG};
  transition: transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0.9;
  backdrop-filter: blur(40px);
  will-change: transform;

  @media (max-width: 960px) {
    padding: 1rem;
    margin-bottom: 2rem;
    max-width: 100%;
    width: 100%;
  }

  :hover {
    transform: scale(1);
  }
  ::after {
    content: '';
    position: absolute;
    border-radius: 20px;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: ${({ theme }) => theme.shadows.huge};
    opacity: 0;
    transition: opacity 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
    will-change: opacity;
  }

  :hover::after {
    opacity: 1;
  }
`

const StyledCardTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 800;

  @media (max-width: 1024px) {
    font-size: 1.75rem;
    line-height: 2rem;
  }
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
  color: ${({ theme }) => theme.invertedTextColor};
  background-color: ${({ theme }) => theme.colors.link};
  padding: 0rem 0.5rem;
  position: absolute;
  left: -1rem;
  top: -0.75rem;
  border-radius: 1rem;
  text-align: center;
  margin: 0;
  transform: rotateZ(-20deg);
`

const Card = ({ node, index }) => {
  return (
    <>
      {node.slug.split('/')[0] === '' ? (
        <StyledCard index={index} to={node.slug}>
          {node.type === 'New' ? <NewPill>New</NewPill> : null}
          <StyledCardTitle>{node.cardTitle}</StyledCardTitle>
          <div>
            <StyledCardDesc>{node.cardDesc}</StyledCardDesc>
            <StyledArrowRight>Learn more →</StyledArrowRight>
          </div>
        </StyledCard>
      ) : (
        <StyledExternalCard index={index} href={node.slug}>
          {node.type === 'New' ? <NewPill>New</NewPill> : null}
          <StyledCardTitle>{node.cardTitle}</StyledCardTitle>
          <div>
            <StyledCardDesc>{node.cardDesc}</StyledCardDesc>
            <StyledArrowRight>Learn more →</StyledArrowRight>
          </div>
        </StyledExternalCard>
      )}
    </>
  )
}
export default Card
