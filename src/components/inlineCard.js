import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import styled from 'styled-components'

const StyledMiniCards = styled(Link)`
  padding: 1.25rem;
  color: ${({ theme, outlined }) => (outlined ? theme.colors.link : theme.textColor)};
  background-color: ${({ theme }) => theme.invertedTextColor};
  height: 300px;
  max-width: 450px;
  min-width: 260px;
  width: 260px;
  margin-right: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
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
    margin: 1rem 0;
    height: ${({ small }) => !small && '200px'};
    /* height: 200px; */
  }
`
const StyledCardBG = styled(Img)`
  width: 80px;
  height: 220px;
  position: absolute !important;
  top: 0px;
  right: 0px;
  background-size: auto;
  background-position: center;
  z-index: -1;
`

const TagWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  padding: 1.5rem 0 0 0;
`

const handleTagType = (tag, theme) => {
  // console.log(theme)
  switch (tag) {
    case 'guide':
      return theme.colors.blue5
    case 'tutorial':
      return theme.colors.pink1
    case 'reference':
      return theme.colors.green2
    default:
      return theme.colors.pink1
  }
}

const Tag = styled.li`
  list-style: none;
  margin: 0;
  padding: 0.15rem 0.5rem;
  margin-right: 0.5rem;
  font-weight: 500;
  font-size: 11px;
  text-transform: uppercase;
  border: 1px solid ${({ theme, tag }) => handleTagType(tag, theme)};
  color: ${({ theme, tag }) => handleTagType(tag, theme)};
  border-radius: 8px;
  display: flex;
  align-items: center;
`

const StyledMiniCardHeader = styled.p`
  line-height: 130%;
  margin-top: 0px;
  font-weight: 600;
  font-size: 1.125rem;
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
  right: 1.5rem;
  font-size: 0.825rem;
  bottom: 1rem;
`

const InlineCard = props => {
  const Tags = props.tags
    ? props.tags.map((tag, i) => {
        return (
          <Tag tag={tag} key={i}>
            {tag}
          </Tag>
        )
      })
    : ''

  return (
    <StyledMiniCards {...props} style={{ backgroundColor: props.backgroundColor, color: props.color }} to={props.to}>
      {props.image && <StyledCardBG fluid={props.image} />}
      <StyledMiniCardHeader style={{ color: props.color }}>{props.title}</StyledMiniCardHeader>
      <span>
        <StyledMiniCardDesc>{props.desc}</StyledMiniCardDesc>
        {props.tags && <TagWrapper>{Tags}</TagWrapper>}
      </span>
      <StyledArrow>{'->'}</StyledArrow>
    </StyledMiniCards>
  )
}

export default InlineCard
