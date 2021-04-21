import React from 'react'
import styled from 'styled-components'

import Slugger from 'github-slugger'

const slugger = new Slugger()

const StyledHeadingListElement = styled.li`
  margin-left: ${({ depth }) => depth && depth / 2 + 'rem'};
  margin-bottom: 0px;
  margin-top: 0.125rem;

  margin-bottom: 0.125rem;
`

const StyledHeadingLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};
  white-space: pre;
  text-overflow: ellipsis;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`

const StyledTOC = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: -webkit-sticky;
  position: sticky;
  align-self: flex-start;
  top: 6rem;
  min-width: 180px;
  max-height: 70vh;
  overflow: auto;
  font-size: 0.75rem;
  margin: 0 2rem 0 0;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  list-style: none;
  text-decoration: none;
  border-left: 1px solid ${({ theme }) => theme.colors.grey2};

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

const Heading = ({ heading }) => {
  const slug = slugger.slug(heading.value.replace(/\d+-/g, ''))
  slugger.reset()
  return (
    <StyledHeadingListElement key={heading.value} depth={heading.depth}>
      <StyledHeadingLink
        onClick={() => {
          // scrollTo('#' + slug)
          const id = '#' + slug
          const anchor = document.querySelector(id)
          const offset = anchor.getBoundingClientRect().top + window.scrollY
          window.scroll({ top: offset - 80, left: 0 })
          window.history.pushState({}, '', '#' + slug)
        }}
      >
        {heading.value}
      </StyledHeadingLink>
    </StyledHeadingListElement>
  )
}

const TableofContents = ({ headings }) => (
  <StyledTOC>
    {headings.map((heading, i) => (
      <Heading key={i} heading={heading} />
    ))}
  </StyledTOC>
)

export default TableofContents
