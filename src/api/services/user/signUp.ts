import { SignUpInput } from 'api/generated/resolvers-types'
import { UserRepository } from 'api/repositories'
import { firebaseAdminClient } from 'api/utils/firebaseAdmin'

export const signUp = async (input: SignUpInput) => {
  const { email, name, password, role } = input
  const user = await UserRepository.getUserByEmail(email)

  // TODO: error handling
  if (user) {
    throw new Error('User already exists')
  }
  const { uid } = await firebaseAdminClient.auth().createUser({
    email,
    password,
  })
  const newUser = await UserRepository.createUser({
    email,
    name,
    role,
    firebaseId: uid,
  })

  return newUser
}
