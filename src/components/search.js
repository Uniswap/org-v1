import { Link } from 'gatsby'
import styled from 'styled-components'
import React, { useState } from 'react'
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'
import { useStaticQuery, graphql } from 'gatsby'

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  @media (max-width: 960px) {
    form {
      margin-bottom: 0px;
    }
  }
`

const StyledFormField = styled(Field)`
  background-color: ${({ theme }) => theme.colors.grey1};
  border: none;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  width: 100%;
  @media (max-width: 960px) {
    padding: 0.5rem 0.75rem;
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
  background-color: white;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.04);
  max-height: 400px;
  overflow: scroll;
  mark {
    color: rgba(0, 0, 0, 1);
  }
`

const SearchListItemExcerpt = styled.div`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.4);
  text-decoration: none;
`

const SearchListItemHeader = styled.h5`
  margin-bottom: 0.25rem;
`

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ active }) => active && 600};
  /* background-color: ${({ active }) => active && '#F7F8FA'}; */
  border-radius: 8px;
  text-decoration: none;
  margin: 0;
  /* opacity: ${({ active }) => (active ? 1 : 0.6)}; */
  color: black;
  padding: 1rem;
  margin: 0;
  :hover {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.grey1};
`

const ClearButton = styled.button`
  background-color: unset;
  border: none;
  padding-right: 1rem;
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

  const index = data.localSearchDocs.index /* a FlexSearch index */

  // const newIndex = useMemo(() => {
  //   const modIndex = index
  //   modIndex.metadataWhitelist = ['position']

  //   return modIndex
  // }, [index])

  const store = data.localSearchDocs.store
  const [query, setQuery] = useState('')
  const results = useLunr(query, index, store)
  // console.log(index)
  // console.log(store)

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
          <ClearButton type="reset" onClick={() => setQuery('')}>
            ×
          </ClearButton>
        </StyledForm>
      </Formik>
      {query !== '' && query && (
        <SearchList>
          {results.map(result => {
            console.log(result)
            return (
              <StyledLink to={'/docs/' + result.path}>
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
      )}
    </SearchWrapper>
  )
}

export default Search
