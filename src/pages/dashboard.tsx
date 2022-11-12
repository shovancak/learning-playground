import { Button, Flex, Spinner, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuth } from 'providers/User'

const Dashboard: NextPage = () => {
  const { userData, logOut, isLoading } = useAuth()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Head>Dashboard</Head>

      <Flex flexDirection="column">
        <Text>DASHBOARD</Text>
        <Text>NAME: {userData?.name}</Text>
        <Text>EMAIL: {userData?.email}</Text>
        <Text>ROLE: {userData?.role}</Text>
        <Text>ID: {userData?.id}</Text>
        <Button
          onClick={async () => {
            await logOut()
          }}
        >
          Log out
        </Button>
      </Flex>
    </>
  )
}

export default Dashboard
