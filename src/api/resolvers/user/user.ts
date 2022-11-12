import { AuthGraphqlContext } from 'api'
import { MutationSignUpArgs, Resolvers } from '../../generated/resolvers-types'
import { signUp } from './mutation/signUp'
import { me as meResolver } from './query/me'

// eslint-disable-next-line @typescript-eslint/naming-convention
const resolvers: Resolvers = {
  Query: {
    me: (_, __, { user }: AuthGraphqlContext) => meResolver(user.id),
  },
  Mutation: {
    signUp: (_, { input }: MutationSignUpArgs) => signUp(input),
  },
}

export default resolvers
