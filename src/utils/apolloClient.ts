import { useMemo } from 'react'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { getAuth } from 'firebase/auth'
import { IncomingMessage, ServerResponse } from 'http'
import { merge } from 'lodash'
import FirebaseApp from './firebaseClient'

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined

export type ResolverContext = {
  req?: IncomingMessage
  res?: ServerResponse
}
// Using  Next.js example
// Eslint disabled to keep custom Next.js bundling functionality
function createIsomorphLink(context: ResolverContext = {}) {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { schema } = require('api/utils/schema')
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/naming-convention
    const { SchemaLink } = require('@apollo/client/link/schema')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new SchemaLink({ schema, context })
    // eslint-disable-next-line no-else-return
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/naming-convention
    const { HttpLink } = require('@apollo/client')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { setContext } = require('@apollo/client/link/context')
    const firebaseAuth = getAuth(FirebaseApp)
    // @ts-ignore
    const authLink = setContext(async (_, ctx) => {
      const { headers } = ctx
      try {
        const token = await firebaseAuth.currentUser?.getIdToken()
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        }
      } catch {
        return {
          headers,
        }
      }
    })
    const httpLink = new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return ApolloLink.from([authLink, httpLink])
  }
}

function createApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(context),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}
export function initializeApollo(
  initialState?: NormalizedCacheObject,
  context?: ResolverContext
) {
  const apolloClient = globalApolloClient ?? createApolloClient(context)
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    let mergedCache = initialState
    if (globalApolloClient) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = apolloClient.extract()
      // Merge the existing cache into data passed from getStaticProps/getServerSideProps
      mergedCache = merge({}, initialState, existingCache)
    }
    apolloClient.cache.restore(mergedCache)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return apolloClient
  }
  // Create the Apollo Client once in the client
  if (!globalApolloClient) {
    globalApolloClient = apolloClient
  }
  return apolloClient
}
export function useApollo(initialState?: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
