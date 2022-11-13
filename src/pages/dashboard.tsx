import { Button, Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuth } from 'providers/UserProvider'

const Dashboard: NextPage = () => {
  const { userData, logOut, isLoading } = useAuth()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Flex
        direction="column"
        align="center"
        h="100vh"
        justify="center"
        bgColor="gray.100"
      >
        <Flex
          bgColor="white"
          shadow="lg"
          borderColor="gray.200"
          borderWidth="1px"
          height="fit-content"
          width="350px"
          borderRadius="2xl"
          direction="column"
          justify="space-between"
          align="center"
          py="30px"
          px="20px"
        >
          <VStack w="full">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              {`Hello ${
                userData?.name ?? ''
              }, welcome. Plski don‘t break something.`}
            </Text>
            <Button
              w="full"
              colorScheme="red"
              onClick={async () => {
                await logOut()
              }}
            >
              Log out
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}

export default Dashboard
