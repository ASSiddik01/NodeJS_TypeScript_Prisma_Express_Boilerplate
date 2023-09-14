import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { Profile } from '@prisma/client'
import { IExtendProfile } from './profile.interfaces'
import { JwtPayload } from 'jsonwebtoken'
import { userPolulate } from './profile.constants'

// create profile service
export const createProfileService = async (
  user: JwtPayload | null,
  data: Profile
): Promise<Partial<IExtendProfile> | null> => {
  data.userId = user?.id

  const isExist = await prisma.profile.findFirst({
    where: {
      userId: user?.id,
    },
  })

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Profile already exist`)
  }
  const result = await prisma.profile.create({
    data,
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `Create profile failed`)
  }

  return result
}

// get profile service
export const getProfileService = async (
  reqUser: JwtPayload | null
): Promise<Partial<Omit<IExtendProfile, 'about'>> | null> => {
  const result = await prisma.profile.findUnique({
    where: {
      userId: reqUser?.id,
    },
    include: userPolulate,
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `Profile retrive failed`)
  }

  return result
}
