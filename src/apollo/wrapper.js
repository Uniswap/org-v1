import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './client'
import Helmet from 'react-helmet'
import { DOCSEARCH_STYLESHEET_URL } from '../utils/constants'
import ApplicationContextProvider, { Updater as ApplicationContextUpdater } from '../contexts/Application'

export function wrapRootElement({ element }) {
  return (
    <ApolloProvider client={client}>
      <ApplicationContextProvider>
        <ApplicationContextUpdater />
        <Helmet>
          <link rel="stylesheet" href={DOCSEARCH_STYLESHEET_URL} />
        </Helmet>
        {element}
      </ApplicationContextProvider>
    </ApolloProvider>
  )
}
