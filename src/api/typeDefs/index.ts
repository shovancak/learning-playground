import { mergeTypeDefs } from '@graphql-tools/merge'
import Date from './date.graphql'
import User from './user.graphql'

export default mergeTypeDefs([User, Date])
