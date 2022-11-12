import { Button, Flex, HStack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Routes } from 'constants/routes'

const LandingPage: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Learning playground</title>
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
          height="250px"
          width="350px"
          borderRadius="2xl"
          direction="column"
          justify="space-between"
          align="center"
          py="30px"
          px="20px"
        >
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">
            Welcome to my Learning Playground
          </Text>
          <HStack w="full" spacing="4">
            <Button
              w="full"
              colorScheme="green"
              onClick={() => {
                void router.push(Routes.SignUp())
              }}
            >
              Sign up
            </Button>
            <Button
              w="full"
              colorScheme="messenger"
              onClick={() => {
                void router.push(Routes.SignIn())
              }}
            >
              Sign in
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </>
  )
}

export default LandingPage
