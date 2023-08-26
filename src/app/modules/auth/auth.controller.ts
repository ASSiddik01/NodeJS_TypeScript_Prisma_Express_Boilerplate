import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { signInService, signUpService } from './auth.service'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { User } from '@prisma/client'
import config from '../../../config'
import { IAuthSigninResponse } from './auth.interfaces'

export const signUp = tryCatch(async (req: Request, res: Response) => {
  const result = await signUpService(req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sign up successfully',
    data: result,
  })
})

export const signIn = tryCatch(async (req: Request, res: Response) => {
  const result = await signInService(req.body)

  if (result !== null) {
    const { refreshToken, ...others } = result
    // Set Refresh Token in Cookies
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendRes<IAuthSigninResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sign in successfully',
      data: others,
    })
  } else {
    sendRes<IAuthSigninResponse>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: true,
      message: 'Sign in failed',
      data: result,
    })
  }
})
