import { User } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { ApiError } from '../../../errorFormating/apiError'
import httpStatus from 'http-status'
import { createToken } from '../../../helpers/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import { IAuthSignin, IAuthSigninResponse } from './auth.interfaces'
import { isExist } from './auth.utils'

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

export const signInService = async (
  data: IAuthSignin
): Promise<IAuthSigninResponse | null> => {
  // existency check
  const user = await isExist(data.email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Password check
  const passwordMatch = await bcrypt.compare(data.password, user.password)
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // Create Access Token
  const { id, role, phone, name, email } = user
  const accessToken = createToken(
    { id, role, phone, name, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  // Create Refresh Token
  const refreshToken = createToken(
    { id, role, phone, name, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
  }
}
