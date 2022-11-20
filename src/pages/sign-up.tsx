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
import { yupResolver } from '@hookform/resolvers/yup'
import { Role } from 'generated/generated-graphql'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Routes } from 'constants/routes'
import { FormInput } from 'components/FormInput'
import { FormSelect } from 'components/FormSelect'
import { useAuth } from 'providers/UserProvider'

const RoleLabel = {
  [Role.User]: 'User',
  [Role.CourseOwner]: 'Course Owner',
  [Role.Admin]: 'Admin',
}

enum FieldName {
  Email = 'email',
  Name = 'name',
  UserRole = 'userRole',
  Password = 'password',
}

type FormValues = {
  [FieldName.Email]: string
  [FieldName.Name]: string
  [FieldName.UserRole]?: Role
  [FieldName.Password]: string
}

const FormValidationSchema = yup.object({
  [FieldName.Email]: yup.string().email().required(),
  [FieldName.Name]: yup.string().required(),
  [FieldName.UserRole]: yup.string().oneOf(Object.keys(RoleLabel)).required(),
  [FieldName.Password]: yup.string().min(6).required(),
})

const SignUp: NextPage = () => {
  // TODO: unify names createuser/login, signin/login
  const { createUser } = useAuth()
  const router = useRouter()
  const formMethods = useForm<FormValues>({
    defaultValues: {
      [FieldName.Email]: '',
      [FieldName.Name]: '',
      [FieldName.UserRole]: undefined,
      [FieldName.Password]: '',
    },
    resolver: yupResolver(FormValidationSchema),
  })

  const handleSignUp = async (formData: FormValues) => {
    const typedFormValues = formData as Required<FormValues>
    const { email, name, password, userRole } = typedFormValues
    await createUser({
      email,
      name,
      password,
      role: userRole,
    })
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
