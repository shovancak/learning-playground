import { PrismaClient } from '@prisma/client'
import { QueryHelloArgs } from 'api/generated/resolvers-types'

const Prisma = new PrismaClient()

export default {
  Query: {
    hello: async (_: unknown, { name }: QueryHelloArgs) => {
      const user = await Prisma.user.findUnique({
        where: {
          id: 12,
        },
      })

      console.log('user', user)
      return `Hello ${name}!`
    },
  },
}
