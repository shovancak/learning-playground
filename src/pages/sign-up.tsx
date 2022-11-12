import { FormProvider, useForm } from 'react-hook-form'
import { Button, chakra, Flex, FormLabel } from '@chakra-ui/react'
import { Role } from 'generated/generated-graphql'
import type { NextPage } from 'next'
import { FormInput } from 'components/FormInput'
import { FormSelect } from 'components/FormSelect'
import { useAuth } from 'providers/User'

type FormValues = {
  email: string
  name: string
  role: Role | undefined
  password: string
}

const SignUp: NextPage = () => {
  // TODO: unify names createuser/login, signin/login
  const { createUser } = useAuth()
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

  return (
    <Flex>
      <FormProvider {...formMethods}>
        <chakra.form
          onSubmit={async (event) => {
            await formMethods.handleSubmit(async (formData) => {
              await handleSignUp(formData)
            })(event)
          }}
        >
          <FormLabel htmlFor="email">EMAIL</FormLabel>
          <FormInput id="email" />
          <FormLabel htmlFor="name">NAME</FormLabel>
          <FormInput id="name" />
          <FormLabel htmlFor="password">PASSWORD</FormLabel>
          <FormInput id="password" />
          <FormSelect id="role">
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </FormSelect>

          <Button type="submit">SignUp</Button>
        </chakra.form>
      </FormProvider>
    </Flex>
  )
}

export default SignUp
