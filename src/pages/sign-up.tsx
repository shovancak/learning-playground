import { FormProvider, useForm } from 'react-hook-form'
import {
  Button,
  chakra,
  Flex,
  FormLabel,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Role } from 'generated/generated-graphql'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Routes } from 'constants/routes'
import { FormInput } from 'components/FormInput'
import { FormSelect } from 'components/FormSelect'
import { useAuth } from 'providers/User'

const RoleLabel = {
  [Role.User]: 'User',
  [Role.CourseOwner]: 'Course Owner',
  [Role.Admin]: 'Admin',
}

type FormValues = {
  email: string
  name: string
  role: Role | undefined
  password: string
}

const SignUp: NextPage = () => {
  // TODO: unify names createuser/login, signin/login
  const { createUser } = useAuth()
  const router = useRouter()
  // TODO: add proper form handling + validation
  const formMethods = useForm<FormValues>({
    defaultValues: {
      email: '',
      name: '',
      role: undefined,
      password: '',
    },
  })

  const handleSignUp = async (formData: FormValues) => {
    const { email, name, password, role } = formData
    // TODO: replace by form validation
    if (email && name && password && role) {
      await createUser({
        email,
        name,
        password,
        role,
      })
    }
  }

  const roleOptions = Object.values(Role)
    .filter((role) => role !== Role.Admin)
    .map((role) => ({
      label: RoleLabel[role],
      value: role,
    }))

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Flex
        direction="column"
        align="center"
        h="100vh"
        justify="center"
        bgColor="gray.100"
      >
        <FormProvider {...formMethods}>
          <chakra.form
            onSubmit={async (event) => {
              await formMethods.handleSubmit(async (formData) => {
                await handleSignUp(formData)
              })(event)
            }}
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
                  Create account
                </Text>
                <VStack w="full" align="start" spacing={0}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormInput id="name" />
                </VStack>
                <VStack w="full" align="start" spacing={0}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput id="email" />
                </VStack>
                <VStack w="full" align="start" spacing={0}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormInput id="password" />
                </VStack>
                <VStack w="full" align="start" spacing={0}>
                  <FormLabel htmlFor="role">User Role</FormLabel>
                  <FormSelect id="role" placeholder="Choose your role">
                    {roleOptions.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </FormSelect>
                </VStack>
              </VStack>
              <HStack w="full" mt="40px" spacing="4">
                <Button
                  w="full"
                  colorScheme="red"
                  onClick={() => {
                    void router.push(Routes.LandingPage())
                  }}
                >
                  Back
                </Button>
                <Button type="submit" w="full" colorScheme="green">
                  Sign up
                </Button>
              </HStack>
            </Flex>
          </chakra.form>
        </FormProvider>
      </Flex>
    </>
  )
}

export default SignUp
