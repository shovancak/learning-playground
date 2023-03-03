import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'

const ONE_HOUR_IN_SECONDS = 10 * 60

const AwsS3ClientInstance = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  },
})

const getSignedUploadUrl = async () => {
  const bucketKey = uuidv4()

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_PRIVATE_BUCKET_NAME,
    Key: bucketKey,
  })

  const signedUploadUrl = await getSignedUrl(
    AwsS3ClientInstance,
    putObjectCommand,
    {
      expiresIn: ONE_HOUR_IN_SECONDS,
    }
  )

  return {
    signedUploadUrl,
    bucketKey,
  }
}

const getSignedDownloadUrl = async ({ bucketKey }: { bucketKey: string }) => {
  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.AWS_S3_PRIVATE_BUCKET_NAME,
    Key: bucketKey,
  })

  const signedDownloadUrl = await getSignedUrl(
    AwsS3ClientInstance,
    getObjectCommand,
    {
      expiresIn: ONE_HOUR_IN_SECONDS,
    }
  )

  return signedDownloadUrl
}

const deleteObject = async ({ bucketKey }: { bucketKey: string }) => {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_PRIVATE_BUCKET_NAME,
    Key: bucketKey,
  })

  return AwsS3ClientInstance.send(deleteObjectCommand)
}

export const AwsS3Client = {
  getSignedUploadUrl,
  getSignedDownloadUrl,
  deleteObject,
}
