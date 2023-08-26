import { User } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { isExist } from '../../../helpers/isExist'

export const signUpService = async (data: User): Promise<User | null> => {
  // existency check
  const [email, phone] = await Promise.all([
    isExist(data.email),
    isExist(data.phone),
  ])

  if (email || phone) {
    throw new Error(
      `${email ? 'Email' : ''}${email && phone ? ' & ' : ''}${
        phone ? 'Phone number' : ''
      } already ${email || phone ? 'exists' : ''}`
    )
  }
  // save new user
  const { password } = data
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_solt_round)
  )
  data.role = 'user'
  data.password = hashedPassword

  const result = await prisma.user.create({
    data,
  })

  if (!result) {
    throw new Error(`User create failed`)
  }

  return result
}
