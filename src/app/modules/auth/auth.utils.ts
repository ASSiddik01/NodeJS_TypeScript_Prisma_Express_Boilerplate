import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'

export const isExist = (payload: string) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: payload }, { phone: payload }],
    },
  })

export const isPasswordMatched = async (
  givenPassword: string,
  savedPassword: string
) => {
  return await bcrypt.compare(givenPassword, savedPassword)
}
