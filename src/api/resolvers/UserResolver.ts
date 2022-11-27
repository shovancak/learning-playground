import { AuthGraphqlContext } from 'api'
import {
  MutationAddUserImageArgs,
  MutationSignUpArgs,
  Resolvers,
} from 'api/generated/resolvers-types'
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
    signUp: (_, { input }: MutationSignUpArgs) => UserService.signUp(input),
    addUserImage: (
      _,
      { input: { bucketKey } }: MutationAddUserImageArgs,
      { user }: AuthGraphqlContext
    ) =>
      UserService.addUserImage({ imageBucketKey: bucketKey, userId: user.id }),
  },
}

export default UserResolver
