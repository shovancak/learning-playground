import { SignUpInput } from 'api/generated/resolvers-types'
import { firebaseAdminClient } from 'api/utils/firebaseAdmin'
import { PrismaClient } from 'api/utils/prismaClient'

export const signUp = async (input: SignUpInput) => {
  const { email, name, password, role } = input
  const user = await PrismaClient.user.findUnique({
    where: {
      email,
    },
  })

  // TODO: error handling
  if (user) {
    throw new Error('User already exists')
  }
  const { uid } = await firebaseAdminClient.auth().createUser({
    email,
    password,
  })
  const newUser = await PrismaClient.user.create({
    data: {
      name,
      email,
      role,
      firebaseId: uid,
    },
  })

  return newUser
}
