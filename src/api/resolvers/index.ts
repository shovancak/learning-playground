import { mergeResolvers } from '@graphql-tools/merge'
import hello from './hello/hello'

export default mergeResolvers([hello])
