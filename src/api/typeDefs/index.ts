import { mergeTypeDefs } from '@graphql-tools/merge'
import date from './date.graphql'
import hello from './hello.graphql'
import user from './user.graphql'

export default mergeTypeDefs([hello, user, date])
