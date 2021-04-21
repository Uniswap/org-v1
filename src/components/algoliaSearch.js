import React, { useEffect } from 'react'
import styled from 'styled-components'

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  form {
    margin-bottom: 0px;
  }
`

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.grey5};
  background-color: ${({ theme }) => theme.colors.grey3};
  margin: 0px;
  margin-right: 12px;
  @media (max-width: 960px) {
    margin-right: 0;
  }

  :hover {
    color: ${({ theme }) => theme.colors.grey3};
    background-color: ${({ theme }) => theme.colors.grey4};
  }

  :focus {
    color: ${({ theme }) => theme.colors.grey3};
    background-color: ${({ theme }) => theme.colors.grey4};
  }
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
  :focus {
    outline: none;
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

export default function Search(props) {
  const isV2 = props.path.slice(0, 8) === '/docs/v2'

  // filter based on the version of the docs
  function handleResults(hits) {
    return hits.filter(hit => {
      if (hit.version) {
        return isV2 ? hit.version?.[0] === 'v2' : hit.version?.[0] === 'v1'
      } else {
        return isV2 ? hit.url.includes('v2') : hit.url.includes('v1')
      }
    })
  }

  // based on version, reset docsearch to use right facet filter
  useEffect(() => {
    if (window.docsearch) {
      try {
        window.docsearch({
          apiKey: '8962240e69e6d23a88432f501c115470',
          indexName: 'uniswap_v2_docs',
          appId: 'VZ0CVS8XCW',
          inputSelector: '.docsearch', // the selector of my search input
          transformData: handleResults
        })
      } catch (e) {
        console.log(e)
        console.log('Error loading algolia search')
      }
    }
  }, [])

  return (
    <SearchWrapper>
      <StyledForm>
        <StyledInput className="docsearch" placeholder="Search Docs..." />
        <ClearButton />
      </StyledForm>
    </SearchWrapper>
  )
}
