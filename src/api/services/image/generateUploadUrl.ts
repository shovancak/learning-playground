import { AwsS3Client } from 'api/utils/awsS3Client'

export const generateUploadUrl = () => AwsS3Client.getSignedUploadUrl()
