import { mergeTypeDefs } from '@graphql-tools/merge'
import Date from './date.graphql'
import Image from './image.graphql'
import User from './user.graphql'

export default mergeTypeDefs([User, Date, Image])
