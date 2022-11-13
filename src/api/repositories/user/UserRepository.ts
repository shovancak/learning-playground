import { Prisma } from '@prisma/client'
import { PrismaClient } from 'api/utils/prismaClient'

const getUserById = (userId: string) =>
  PrismaClient.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  })

const getUserByEmail = (email: string) =>
  PrismaClient.user.findUnique({
    where: {
      email,
    },
  })

const createUser = (
  data: Pick<Prisma.UserCreateInput, 'name' | 'email' | 'role' | 'firebaseId'>
) =>
  PrismaClient.user.create({
    data,
  })

export const UserRepository = {
  createUser,
  getUserById,
  getUserByEmail,
}
