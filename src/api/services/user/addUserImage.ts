import { PrismaClient } from 'api/utils/prismaClient'

export const addUserImage = ({
  imageBucketKey,
  userId,
}: {
  imageBucketKey: string
  userId: string
}) =>
  PrismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      imageBucketKey,
    },
  })
