import { UserRepository } from 'api/repositories'

export const getUserById = (userId: string) =>
  UserRepository.getUserById(userId)
