import { QueryHelloArgs } from 'api/generated/resolvers-types'

export default {
  Query: {
    hello: (_: unknown, { name }: QueryHelloArgs) => `Hello ${name ?? ''}!`,
  },
}
