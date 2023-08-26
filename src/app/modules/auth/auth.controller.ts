import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { signUpService } from './auth.service'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { User } from '@prisma/client'

export const signUp = tryCatch(async (req: Request, res: Response) => {
  const result = await signUpService(req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sign up successfully',
    data: result,
  })
})
