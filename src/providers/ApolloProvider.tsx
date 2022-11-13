import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'utils/apolloClient'

const CustomApolloProvider: React.FC = ({ children }) => {
  const apolloClient = useApollo()
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default CustomApolloProvider
