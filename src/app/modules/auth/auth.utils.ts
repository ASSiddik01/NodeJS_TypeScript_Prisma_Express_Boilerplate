import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { IExtendedUser } from './auth.interfaces'

export const isExist = async (
  payload: string
): Promise<IExtendedUser | null> => {
  const result = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload }, { phone: payload }],
    },
  })

  return result as IExtendedUser
}

export const isPasswordMatched = async (
  givenPassword: string,
  savedPassword: string
) => {
  return await bcrypt.compare(givenPassword, savedPassword)
}
