import { AuthGraphqlContext } from 'api'
import { MutationSignUpArgs, Resolvers } from 'api/generated/resolvers-types'
import { UserService } from 'api/services'

const UserResolvers: Resolvers = {
  Query: {
    me: (_, __, { user }: AuthGraphqlContext) =>
      UserService.getUserById(user.id),
  },
  Mutation: {
    signUp: (_, { input }: MutationSignUpArgs) => UserService.signUp(input),
  },
}

export default UserResolvers
