import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import {
  ApolloError,
  ApolloServer as ApolloServerClass,
} from 'apollo-server-micro'
import { once } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from './generated/resolvers-types'
import { checkUserTokenFromRequest } from './utils/auth'
import { PrismaClient } from './utils/prismaClient'
import { GraphQLSchema } from './utils/schema'

interface RequestContext {
  req: NextApiRequest
  res: NextApiResponse
}

export interface AuthGraphqlContext extends RequestContext {
  user: User
}

const ApolloServer = new ApolloServerClass({
  schema: GraphQLSchema,
  plugins: [
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  formatError: (error) => {
    if (!(error.originalError instanceof ApolloError)) {
      return new Error('Something went wrong.')
    }
    return error
  },
  context: async (context: RequestContext) => {
    try {
      const { req } = context
      const verifiedToken = await checkUserTokenFromRequest(req)
      if (!verifiedToken) {
        return context
      }

      let user: User | null = null
      if (verifiedToken.uid) {
        user = await PrismaClient.user.findUnique({
          where: {
            firebaseId: verifiedToken.uid,
          },
        })
      }

      return {
        ...context,
        ...(user && { user }),
      }
    } catch {
      return context
    }
  },
})

export const start = once(async () => ApolloServer.start())

export default ApolloServer
