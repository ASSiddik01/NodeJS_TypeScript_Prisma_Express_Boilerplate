import { User } from '@prisma/client'
import prisma from '../../../utilities/prisma'

export const createUserService = async (data: User): Promise<User | null> => {
  const result = await prisma.user.create({
    data,
  })

  if (!result) {
    throw new Error(`Sign up failed`)
  }

  return result
}
