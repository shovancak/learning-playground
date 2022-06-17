import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import {
  ApolloError,
  ApolloServer as ApolloServerClass,
} from 'apollo-server-micro'
import { once } from 'ramda'
import { schema } from './utils/schema'

const ApolloServer = new ApolloServerClass({
  schema,
  plugins: [
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  formatError: (error) => {
    if (!(error.originalError instanceof ApolloError)) {
      console.error(error.originalError)
      return new Error('Something went wrong.')
    }
    return error
  },
})

export const start = once(() => ApolloServer.start())

export default ApolloServer
