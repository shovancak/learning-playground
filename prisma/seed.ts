import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

const main = async () => {
  const users = new Array(10).fill({})

  await Prisma.user.createMany({
    data: users.map((_, index) => ({
      name: `user${index + 1}`,
      email: `user${index + 1}@email.com`,
    })),
  })
}

main()
  .catch((e) => {
    console.error('seed error:', e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await Prisma.$disconnect()
  })
