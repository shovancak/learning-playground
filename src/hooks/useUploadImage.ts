import { useState } from 'react'
import { useGenerateUploadUrlMutation } from 'generated/generated-graphql'

export const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(false)

  const [generateUploadUrl] = useGenerateUploadUrlMutation()

  const uploadImage = async (
    image: File
  ): Promise<{
    imageBucketKey: string
  }> => {
    setIsUploading(true)

    const generateUploadUrlResponse = await generateUploadUrl()

    const { data: generateUploadUrlData, errors: generateUploadUrlErrors } =
      generateUploadUrlResponse

    if (generateUploadUrlData) {
      const { bucketKey, signedUploadUrl: uploadUrl } =
        generateUploadUrlData.generateUploadUrl

      const uploadResponse = await fetch(uploadUrl, {
        body: image,
        method: 'PUT',
        headers: {
          'content-type': 'application/octet-stream',
        },
      })

      if (uploadResponse.ok && uploadResponse.status === 200) {
        setIsUploading(false)
        return {
          imageBucketKey: bucketKey,
        }
      }
      console.log('uploadResponse', uploadResponse)

      return Promise.reject(
        new Error(`Could not upload files. Status: ${uploadResponse.status}`)
      ).finally(() => {
        setIsUploading(false)
      })
    }

    return Promise.reject(
      new Error(
        `Could not upload files. Error: ${generateUploadUrlErrors![0].message}`
      )
    ).finally(() => {
      setIsUploading(false)
    })
  }

  return {
    uploadImage,
    isUploading,
  }
}
