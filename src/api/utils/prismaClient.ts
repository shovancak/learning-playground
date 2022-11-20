import { PrismaClient as Prisma } from '@prisma/client'

type GlobalWithPrisma = typeof global & {
  prismaClient: Prisma
}

const TypedGlobal = global as GlobalWithPrisma

export const PrismaClient = TypedGlobal.prismaClient || new Prisma()

if (process.env.NODE_ENV !== 'production') {
  TypedGlobal.prismaClient = PrismaClient
}
