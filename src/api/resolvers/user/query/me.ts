import { PrismaClient } from 'api/utils/prismaClient'

export const me = async (id: string) => {
  const user = await PrismaClient.user.findUniqueOrThrow({
    where: {
      id,
    },
  })

  return user
}
