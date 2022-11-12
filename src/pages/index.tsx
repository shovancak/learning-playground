import { Button, Flex, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Routes } from 'constants/routes'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Flex>
      <Text>Welcome to my Learning Playground</Text>
      <Button
        onClick={() => {
          void router.push(Routes.SignUp())
        }}
      >
        SignUp
      </Button>
      <Button
        onClick={() => {
          void router.push(Routes.SignIn())
        }}
      >
        SignIn
      </Button>
    </Flex>
  )
}

export default Home
