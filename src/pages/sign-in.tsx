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
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Routes } from 'constants/routes'
import { FormInput } from 'components/FormInput'
import { useAuth } from 'providers/UserProvider'

enum FieldName {
  Email = 'email',
  Password = 'password',
}

type FormValues = {
  [FieldName.Email]: string
  [FieldName.Password]: string
}

const FormValidationSchema = yup.object({
  [FieldName.Email]: yup.string().email().required(),
  [FieldName.Password]: yup.string().min(6).required(),
})

const SignIn: NextPage = () => {
  // TODO: unify names createuser/login, signin/login
  const { logIn } = useAuth()
  const router = useRouter()
  const formMethods = useForm<FormValues>({
    defaultValues: {
      [FieldName.Email]: '',
      [FieldName.Password]: '',
    },
    resolver: yupResolver(FormValidationSchema),
  })

  const handleSignIn = async (formData: FormValues) => {
    const { email, password } = formData
    await logIn({
      email,
      password,
    })
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
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
                await handleSignIn(formData)
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
                  Sign in to your account
                </Text>
                <VStack w="full" align="start" spacing={0}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput id="email" />
                </VStack>
                <VStack w="full" align="start" spacing={0}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormInput id="password" />
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
                  Sign in
                </Button>
              </HStack>
            </Flex>
          </chakra.form>
        </FormProvider>
      </Flex>
    </>
  )
}

export default SignIn
