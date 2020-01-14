import { Link } from 'gatsby'
import styled from 'styled-components'
import React, { useState } from 'react'
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'
import { useStaticQuery, graphql } from 'gatsby'

const StyledFormField = styled(Field)`
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
`

const SearchList = styled.div`
  position: absolute;
  top: 100px;
  list-style: none;
  margin: 0;
  min-width: 256px;
  padding: 0.5rem;
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

const SearchListItem = styled.li``

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

const Search = () => {
  const data = useStaticQuery(graphql`
    {
      localSearchDocs {
        index
        store
      }
    }
  `)

  const index = data.localSearchDocs.index /* a FlexSearch index */
  const store = data.localSearchDocs.store
  const [query, setQuery] = useState('')
  const results = useLunr(query, index, store)

  console.log(results)

  return (
    <div>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setQuery(values.query + '*')
          setSubmitting(false)
        }}
      >
        <Form
          onChange={e => {
            setQuery(e.target.value + '*')
          }}
        >
          <StyledFormField
            type="text"
            autoComplete="off"
            name="query"
            placeholder="Search docs..."
          />
        </Form>
      </Formik>
      {query !== '' && query && (
        <SearchList>
          {results.map(result => (
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
          ))}
        </SearchList>
      )}
    </div>
  )
}

export default Search
