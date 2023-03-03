import { AuthGraphqlContext } from 'api'
import { Resolvers } from 'api/generated/resolvers-types'
import { UserService } from 'api/services'

const UserResolver: Resolvers = {
  User: {
    imageUrl: (user) => UserService.getImageUrl(user.imageBucketKey ?? null),
  },
  Query: {
    me: (_, __, { user }: AuthGraphqlContext) =>
      UserService.getUserById(user.id),
  },
  Mutation: {
    signUp: (_, { input }) => UserService.signUp(input),

    addUserImage: (_, { input: { bucketKey } }, { user }: AuthGraphqlContext) =>
      UserService.addUserImage({ imageBucketKey: bucketKey, user }),

    removeUserImage: (_, __, { user }: AuthGraphqlContext) =>
      UserService.removeUserImage({ user }),
  },
}

export default UserResolver
