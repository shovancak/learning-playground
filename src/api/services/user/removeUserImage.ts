import { User } from 'api/generated/resolvers-types'
import { AwsS3Client } from 'api/utils/awsS3Client'
import { PrismaClient } from 'api/utils/prismaClient'

export const removeUserImage = async ({ user }: { user: User }) => {
  // TODO: error handling
  if (!user.imageBucketKey) {
    throw new Error('User has no profile picture.')
  }

  const response = await Promise.all([
    AwsS3Client.deleteObject({ bucketKey: user.imageBucketKey }),
    PrismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        imageBucketKey: null,
      },
    }),
  ])

  return response[1]
}
