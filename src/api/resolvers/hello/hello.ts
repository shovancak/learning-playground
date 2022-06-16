import { QueryHelloArgs } from 'api/generated/resolvers-types'

export default {
  Query: {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    hello: (_: unknown, name: QueryHelloArgs) => `Hello ${name}!`,
  },
}
