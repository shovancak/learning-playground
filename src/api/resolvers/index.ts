import { mergeResolvers } from '@graphql-tools/merge'
import UserResolvers from './UserResolvers'

export default mergeResolvers([UserResolvers])
