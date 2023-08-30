import { User } from '@prisma/client'

export type IAuthSignin = {
  email: string
  password: string
}

export type IAuthSigninResponse = {
  accessToken: string
  refreshToken?: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
}

export type IExtendedUser = User & {
  role: string
}
