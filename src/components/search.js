import { Link } from 'gatsby'
import styled from 'styled-components'
import React, { useState } from 'react'
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'
import { useStaticQuery, graphql } from 'gatsby'

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
const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.grey1};
  border: 1px solid ${({ theme }) => theme.colors.grey1};
`

const StyledFormField = styled(Field)`
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
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.04);
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
  font-weight: ${({ active }) => active && 600};
  /* background-color: ${({ active }) => active && '#F7F8FA'}; */
  border-radius: 8px;
  text-decoration: none;
  margin: 0;
  /* opacity: ${({ active }) => (active ? 1 : 0.6)}; */
  color: ${({ theme }) => theme.colors.textColor};
  padding: .5rem;
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

const Search = props => {
  const data = useStaticQuery(graphql`
    {
      localSearchDocs {
        index
        store
      }
    }
  `)

  const index = data.localSearchDocs.index /* a Lunr index */

  const store = data.localSearchDocs.store
  const [query, setQuery] = useState('')
  const results = useLunr(query, index, store)

  return (
    <SearchWrapper>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setQuery(values.query)
        }}
      >
        <StyledForm
          style={{ display: 'relative' }}
          onChange={e => {
            e.target.value !== '' && setQuery(e.target.value + '~1')
          }}
        >
          <StyledFormField
            type="text"
            autoComplete="off"
            name="query"
            placeholder={'Search ' + props.parent + '...'}
          />
          <ClearButton
            isActive={query !== '' && query}
            type="reset"
            onClick={() => setQuery('')}
          >
            <CloseIcon />
          </ClearButton>
        </StyledForm>
      </Formik>
      {query !== '' && query && results.length > 0 ? (
        <SearchList>
          {results.map(result => {
            return (
              <StyledLink to={result.path}>
                <SearchListItemHeader
                  dangerouslySetInnerHTML={{
                    __html: result.title.replace(
                      new RegExp(query, 'gi'),
                      match => `<mark>${match}</mark>`
                    )
                  }}
                />
                <SearchListItemExcerpt
                  dangerouslySetInnerHTML={{
                    __html: result.excerpt.replace(
                      new RegExp(query, 'gi'),
                      match => `<mark>${match}</mark>`
                    )
                  }}
                />
              </StyledLink>
            )
          })}
        </SearchList>
      ) : (
        <SearchList>
          <SearchListItemHeader>No results</SearchListItemHeader>
        </SearchList>
      )}
    </SearchWrapper>
  )
}

export default Search
