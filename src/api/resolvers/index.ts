import { mergeResolvers } from '@graphql-tools/merge'
import ImageResolver from './ImageResolver'
import UserResolver from './UserResolver'

export default mergeResolvers([UserResolver, ImageResolver])
