import { mergeTypeDefs } from '@graphql-tools/merge'
import hello from './hello.graphql'

export default mergeTypeDefs([hello])
