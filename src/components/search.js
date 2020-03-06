import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import React, { useState, useMemo } from 'react'
import lunr from 'lunr'

import CloseIcon from '../images/x.inline.svg'

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  @media (max-width: 960px) {
    form {
      margin-bottom: 0px;
    }
  }
`
const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.grey1};
  border: 1px solid ${({ theme }) => theme.colors.grey1};
`

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.grey1};
  color: ${({ theme }) => theme.textColor};
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  width: 100%;
  border: none;
  @media (max-width: 960px) {
    padding: 0.5rem 0.75rem;
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey8};
  }
  :focus {
    outline: none;
  }
`

const SearchList = styled.div`
  position: absolute;
  top: 60px;
  list-style: none;
  margin: 0;
  min-width: 256px;
  width: 100%;
  z-index: 99;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.menuBG};
  backface-visibility: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.04);
  max-height: 400px;
  overflow: scroll;
  padding: 0.5rem;
  a {
    color: ${({ theme }) => theme.textColor};
  }
  mark {
    color: rgba(0, 0, 0, 1);
  }
`

const SearchListItemExcerpt = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.grey6};
  text-decoration: none;
`

const SearchListItemHeader = styled.h5`
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.textColor};
`

const StyledLink = styled(Link)`
  display: block;
  border-radius: 8px;
  text-decoration: none;
  margin: 0;
  color: ${({ theme }) => theme.colors.textColor};
  padding: 0.5rem;
  margin: 0;
  :hover {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`

const ClearButton = styled.button`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.2)};
  background-color: unset;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.colors.textColor};
  }
  :focus {
    outline: none;
  }
`

const Search = ({ isV1 }) => {
  const queryResults = useStaticQuery(graphql`
    {
      allMdx(filter: { fileAbsolutePath: { regex: "/docs/" } }) {
        nodes {
          id
          excerpt
          fields {
            topLevelDir
          }
        }
      }

      localSearchV1 {
        index
        store
      }

      localSearchV2 {
        index
        store
      }
    }
  `)

  const data = queryResults.allMdx.nodes
    .filter(node => node.fields.topLevelDir === 'docs')
    .reduce((accumulator, node) => Object.assign({ [node.id]: node.excerpt }, accumulator), {})

  const version = isV1 ? queryResults.localSearchV1 : queryResults.localSearchV2

  const index = lunr.Index.load(JSON.parse(version.index))
  const store = JSON.parse(version.store)

  const [query, setQuery] = useState('')
  const results = useMemo(
    () =>
      index && store && query !== ''
        ? index.search(`${query}~2`).map(result => ({
            match: {
              ...store[result.ref],
              excerpt: data[result.ref]
            },
            score: result.score,
            metadata: result.matchData.metadata
          }))
        : [],
    [query]
  )

  return (
    <SearchWrapper>
      <StyledForm>
        <StyledInput
          type="text"
          name="query"
          autoComplete="off"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search"
        />
        <ClearButton disabled={query === ''} isActive={query !== '' && query} onClick={() => setQuery('')}>
          <CloseIcon />
        </ClearButton>
      </StyledForm>

      {query !== '' && (
        <SearchList>
          {results.length > 0 ? (
            results.map(result => (
              <StyledLink key={result.match.path} to={result.match.path}>
                <SearchListItemHeader
                  dangerouslySetInnerHTML={{
                    __html: result.match.title.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`)
                  }}
                />
                <SearchListItemExcerpt
                  dangerouslySetInnerHTML={{
                    __html: result.match.excerpt.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`)
                  }}
                />
              </StyledLink>
            ))
          ) : (
            <SearchListItemHeader>No results</SearchListItemHeader>
          )}
        </SearchList>
      )}
    </SearchWrapper>
  )
}

export default Search
