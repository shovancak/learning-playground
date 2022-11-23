import { useState } from 'react'
import { Avatar, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ImageUploader } from 'components/ImageUploader'
import { useAuth } from 'providers/UserProvider'

const ProfilePicture: NextPage = () => {
  const { isLoading } = useAuth()
  const [fileToPreview, setFileToPreview] = useState<
    (File & { preview: string }) | undefined
  >(undefined)

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
              Add New Profile Picture
            </Text>
            <Avatar src={fileToPreview?.preview} h="250px" w="250px" />
            <Button isDisabled={!fileToPreview} colorScheme="green">
              Save New Profile Picture
            </Button>
          </Flex>
          <ImageUploader
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
