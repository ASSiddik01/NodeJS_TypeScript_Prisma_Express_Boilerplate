import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { createProfileService, getProfileService } from './profile.services'
import { IExtendProfile } from './profile.interfaces'

// create profile controller
export const createProfile = tryCatch(async (req: Request, res: Response) => {
  const { user, body } = req
  const result = await createProfileService(user, body)
  sendRes<Partial<IExtendProfile>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create profile successfully',
    data: result,
  })
})

// get profile controller
export const getProfile = tryCatch(async (req: Request, res: Response) => {
  const { user } = req
  const result = await getProfileService(user)
  sendRes<Partial<IExtendProfile>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrive successfully',
    data: result,
  })
})
