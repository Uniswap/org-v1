import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import styled from 'styled-components'

import { Link } from 'gatsby'

import { InstantSearch, connectSearchBox, connectStateResults, connectHits, Highlight } from 'react-instantsearch-dom'

import { X } from 'react-feather'

const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY)

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  form {
    margin-bottom: 0px;
  }
  @media (max-width: 960px) {
    display: none;
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
  color: ${({ theme }) => theme.colors.grey2};
  background-color: ${({ theme }) => theme.colors.grey1};
  margin: 0px;
  margin-right: 12px;
  /* border: 1px solid ${({ theme }) => theme.colors.grey1}; */
`

const StyledInput = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  width: 100%;
  border: none;
  @media (max-width: 960px) {
    padding: 0.5rem 0.75rem;
  }
  ::placeholder {
    /* color: ${({ theme }) => theme.colors.link}; */
  }
  :focus {
    outline: none;
  }
`

const SearchList = styled.div`
  position: absolute;
  top: 60px;
  right: 16px;
  list-style: none;
  margin: 0;
  min-width: 256px;
  width: 456px;
  z-index: 99;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grey1};
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
  border: 1px solid rgba(0, 0, 0, 0);

  padding: 0.75rem;
  margin: 0;
  :hover {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.grey2};
    border: 1px solid ${({ theme }) => theme.inputBackground};
  }
`

const ClearButton = styled.button`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.2)};
  background-color: unset;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: ${({ isActive }) => (isActive ? 'initial' : 'none')};
  path {
    stroke: ${({ theme }) => theme.colors.textColor};
  }
  :focus {
    outline: none;
  }
  :hover {
    cursor: ${({ isActive }) => (isActive ? 'pointer' : 'initial')};
  }
`

const handleTagType = (tag, theme) => {
  // console.log(theme)
  switch (tag) {
    case 'SDK':
      return theme.colors.blue5
    case 'API':
      return theme.colors.yellow1
    case 'smart-contracts':
      return theme.colors.green2
    default:
      return theme.colors.pink1
  }
}

const Tag = styled.li`
  list-style: none;
  margin: 0.25rem 0 0.25rem 0;
  padding: 0.1rem 0.25rem 0rem 0.25rem;
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 11px;
  text-transform: uppercase;
  border: 1px solid ${({ theme, tag }) => handleTagType(tag, theme)};
  color: ${({ theme, tag }) => handleTagType(tag, theme)};
  border-radius: 8px;
  display: flex;
  align-items: center;
  width: fit-content;
`

const SmallLink = styled.small`
  color: ${({ theme }) => theme.colors.grey4};
`

const SearchBox = ({ currentRefinement, refine }) => (
  <StyledForm noValidate action="" role="search">
    <StyledInput
      type="text"
      name="query"
      autoComplete="off"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
      placeholder="Search Docs.."
    />
    <ClearButton
      disabled={currentRefinement === ''}
      isActive={currentRefinement !== '' && currentRefinement}
      onClick={() => refine('')}
    >
      <X size={20} />
    </ClearButton>
  </StyledForm>
)

const CustomSearchBox = connectSearchBox(SearchBox)

const LoadingIndicator = connectStateResults(({ isSearchStalled }) => (isSearchStalled ? 'Loading...' : null))

const Hits = connectHits(({ hits }) => (
  <>
    {hits.length ? (
      <SearchList>
        {/* Here is the crux of the component */}
        <LoadingIndicator />

        {hits.map(hit => {
          return (
            <StyledLink key={hit.objectID} to={hit.path}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'start',
                  width: '100%'
                }}
              >
                <h4 style={{ marginBottom: 0 }}>
                  <Highlight attribute="title" hit={hit} tagName="strong" />
                </h4>
                <Tag tag={hit.parentDir}>
                  {hit.parentDir &&
                    hit.parentDir
                      .replace(/\d+-/g, '')
                      .replace(/-/g, ' ')
                      .replace(/(^|\s)\S/g, function(t) {
                        return t.toUpperCase()
                      })}
                </Tag>
              </div>

              {hit.subtitle ? (
                <h5 style={{ marginBottom: 0 }}>
                  <Highlight attribute="subtitle" hit={hit} tagName="strong" />
                </h5>
              ) : null}
              <div>
                <Highlight attribute="excerpt" hit={hit} tagName="strong" />
              </div>

              <SmallLink>
                <i>
                  <Highlight attribute="path" hit={hit} tagName="strong" />
                </i>
              </SmallLink>
            </StyledLink>
          )
        })}
      </SearchList>
    ) : (
      <SearchListItemHeader>There were no results for your query. Please try again.</SearchListItemHeader>
    )}
  </>
))

const Results = connectStateResults(({ searchState, searchResults, children }) =>
  searchState.query && searchResults && searchResults.nbHits !== 0 ? (
    children
  ) : searchState.query !== '' ? (
    <SearchList>
      <center>
        <p style={{ padding: '1rem 2rem 0 2rem' }}>
          <i>
            There were no results for <code>{searchState.query}</code>
          </i>
        </p>
      </center>
    </SearchList>
  ) : (
    ''
  )
)

const StyledInputNew = styled.input`
  color: black;
`

export default function Search() {
  const [activeSearch, setActiveSearch] = useState(false)

  return (
    <SearchWrapper onClick={() => setActiveSearch(true)}>
      {/* <InstantSearch
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
        style={{ position: 'relative' }}
      >
        <CustomSearchBox autoFocus={true} />
        {activeSearch && (
          <Results>
            <Hits />
          </Results>
        )}
      </InstantSearch> */}

      <StyledInputNew className="docsearch" id="docusearch" />
    </SearchWrapper>
  )
}
