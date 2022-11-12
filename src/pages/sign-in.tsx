import { FormProvider, useForm } from 'react-hook-form'
import { Button, chakra, Flex, FormLabel } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FormInput } from 'components/FormInput'
import { useAuth } from 'providers/User'

type FormValues = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  // TODO: unify names createuser/login, signin/login
  const { logIn } = useAuth()
  // TODO: add proper form handling + validation
  const formMethods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = async (formData: FormValues) => {
    const { email, password } = formData
    // TODO: replace by form validation
    if (email && password) {
      await logIn({
        email,
        password,
      })
    }
  }

  return (
    <Flex>
      <FormProvider {...formMethods}>
        <chakra.form
          onSubmit={async (event) => {
            await formMethods.handleSubmit(async (formData) => {
              await handleSignIn(formData)
            })(event)
          }}
        >
          <FormLabel htmlFor="email">EMAIL</FormLabel>
          <FormInput id="email" />
          <FormLabel htmlFor="password">PASSWORD</FormLabel>
          <FormInput id="password" />

          <Button type="submit">SignIn</Button>
        </chakra.form>
      </FormProvider>
    </Flex>
  )
}

export default SignIn
