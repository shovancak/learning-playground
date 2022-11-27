import { User } from 'api/generated/resolvers-types'
import { AwsS3Client } from 'api/utils/awsS3Client'
import { PrismaClient } from 'api/utils/prismaClient'

export const addUserImage = async ({
  imageBucketKey,
  user,
}: {
  imageBucketKey: string
  user: User
}) => {
  const updateUserImage = PrismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      imageBucketKey,
    },
  })

  if (user.imageBucketKey) {
    const response = await Promise.all([
      AwsS3Client.deleteObject({ bucketKey: user.imageBucketKey }),
      updateUserImage,
    ])

    return response[1]
  }

  return updateUserImage
}
