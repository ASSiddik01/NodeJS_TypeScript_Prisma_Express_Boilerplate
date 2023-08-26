import prisma from '../../../utilities/prisma'

export const isExist = (payload: string) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: payload }, { phone: payload }],
    },
  })
