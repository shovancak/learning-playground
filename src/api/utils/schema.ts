import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from '../resolvers'
import typeDefs from '../typeDefs'

export const GraphQLSchema = makeExecutableSchema({ resolvers, typeDefs })
