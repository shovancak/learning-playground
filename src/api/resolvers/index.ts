import { mergeResolvers } from '@graphql-tools/merge'
import hello from './hello/hello'
import user from './user/user'

export default mergeResolvers([hello, user])
