import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from '../resolvers'
import typeDefs from '../typeDefs'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const schema = makeExecutableSchema({ resolvers, typeDefs })
