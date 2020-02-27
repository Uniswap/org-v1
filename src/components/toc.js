import scrollTo from 'gatsby-plugin-smoothscroll'
import React from 'react'
import styled from 'styled-components'

import Slugger from 'github-slugger'

const slugger = new Slugger()

const StyledHeadingListElement = styled.li`
  margin-left: ${({ depth }) => depth && depth / 2 + 'rem'};
`

const StyledHeadingLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

const Heading = ({ heading }) => {
  const slug = slugger.slug(heading.value.replace(/\d+-/g, ''))
  slugger.reset()
  return (
    <StyledHeadingListElement key={heading.value} depth={heading.depth}>
      <StyledHeadingLink
        onClick={() => {
          scrollTo('#' + slug)
          window.history.pushState({}, '', '#' + slug)
        }}
      >
        {heading.value}
      </StyledHeadingLink>
    </StyledHeadingListElement>
  )
}

const StyledTOC = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: -webkit-sticky;
  position: sticky;
  align-self: flex-start;
  top: 1rem;
  width: 160px;
  font-size: 0.75rem;
  margin: 0 4rem;
  opacity: 0.4;
  transition: opacity 0.3s ease;
  list-style: none;
  text-decoration: none;
  border-left: 1px solid ${({ theme }) => theme.textColor};

  :hover {
    opacity: 1;
  }

  li {
    padding: 0;
  }

  @media (max-width: 960px) {
    display: none;
  }
`

const TableofContents = ({ headings }) => (
  <StyledTOC>
    {headings
      .filter(heading => heading.depth !== 1)
      .map(heading => (
        <Heading key={heading.value} heading={heading} />
      ))}
  </StyledTOC>
)

export default TableofContents
