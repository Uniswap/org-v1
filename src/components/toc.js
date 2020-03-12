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
  flex-wrap: nowrap;
  position: -webkit-sticky;
  position: sticky;
  align-self: flex-start;
  top: 8rem;
  width: 160px;
  max-height: 70vh;
  font-size: 0.75rem;
  margin: 0 4rem;
  opacity: 0.2;
  transition: opacity 0.3s ease;
  list-style: none;
  text-decoration: none;
  overflow: scroll;
  border-left: 1px solid ${({ theme }) => theme.colors.grey6};

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
    {headings.map((heading, i) => (
      <Heading key={i} heading={heading} />
    ))}
  </StyledTOC>
)

export default TableofContents
