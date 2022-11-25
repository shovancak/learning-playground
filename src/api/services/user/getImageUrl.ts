import { AwsS3Client } from 'api/utils/awsS3Client'

export const getImageUrl = (bucketKey: string | null) => {
  if (!bucketKey) {
    return null
  }

  return AwsS3Client.getSignedDownloadUrl({
    bucketKey,
  })
}
