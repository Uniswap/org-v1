import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './client'

export function wrapRootElement({ element }) {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
