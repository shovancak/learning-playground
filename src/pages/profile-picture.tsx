import { useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import {
  Avatar,
  Button,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  useAddUserImageMutation,
  useRemoveUserImageMutation,
} from 'generated/generated-graphql'
import { useUploadImage } from 'hooks/useUploadImage'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ImageUploader } from 'components/ImageUploader'
import { useAuth } from 'providers/UserProvider'

const ProfilePicture: NextPage = () => {
  const { isLoading, refetchAndSetUserData, userData } = useAuth()
  const [fileToPreview, setFileToPreview] = useState<
    (File & { preview: string }) | undefined
  >(undefined)
  const { isUploading, uploadImage } = useUploadImage()

  const [addUserImage, { loading: isAddUserImageLoading }] =
    useAddUserImageMutation()
  const [removeUserImage, { loading: isRemoveUserImageLoading }] =
    useRemoveUserImageMutation()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Change Profile Picture</title>
      </Head>
      <Flex
        direction="column"
        align="center"
        h="full"
        minH="100vh"
        justify="center"
        bgColor="gray.100"
        py="40px"
      >
        <Flex direction="column" gap="24px">
          <Flex direction="column" align="center" gap="24px">
            <Text fontSize="3xl" fontWeight="bold">
              Profile Picture
            </Text>
            <HStack spacing="32px">
              <VStack>
                <Text fontSize="xl" fontWeight="semibold">
                  Current Profile Picture
                </Text>
                <Avatar
                  src={userData?.imageUrl ?? undefined}
                  h="200px"
                  w="200px"
                />
                <Button
                  isDisabled={!userData?.imageUrl}
                  colorScheme="red"
                  isLoading={isRemoveUserImageLoading || isUploading}
                  onClick={async () => {
                    await removeUserImage({
                      onCompleted: async () => {
                        await refetchAndSetUserData()
                      },
                    })
                  }}
                >
                  Remove Current Profile Picture
                </Button>
              </VStack>
              <VStack>
                <Text fontSize="xl" fontWeight="semibold">
                  New Profile Picture
                </Text>
                <HStack align="start" spacing="0">
                  <Avatar src={fileToPreview?.preview} h="200px" w="200px" />
                  {fileToPreview && (
                    <IconButton
                      aria-label="close"
                      rounded="full"
                      m="0"
                      icon={<RiCloseFill size="30px" />}
                      onClick={() => {
                        setFileToPreview(undefined)
                      }}
                    />
                  )}
                </HStack>
                <Button
                  isDisabled={!fileToPreview}
                  colorScheme="green"
                  isLoading={isAddUserImageLoading || isUploading}
                  onClick={async () => {
                    const { imageBucketKey } = await uploadImage(fileToPreview!)
                    await addUserImage({
                      variables: {
                        input: {
                          bucketKey: imageBucketKey,
                        },
                      },
                      onCompleted: async () => {
                        setFileToPreview(undefined)
                        await refetchAndSetUserData()
                      },
                    })
                  }}
                >
                  Save New Profile Picture
                </Button>
              </VStack>
            </HStack>
          </Flex>
          <ImageUploader
            isDisabled={isUploading}
            onSuccess={(file) => {
              setFileToPreview(
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            }}
          />
        </Flex>
      </Flex>
    </>
  )
}

export default ProfilePicture
