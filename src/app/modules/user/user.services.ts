/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'
import config from '../../../config'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { IPaginationOptions } from '../../../interface/pagination'
import { IUserFilters } from './user.interfaces'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { userSearchableFields } from './user.constants'

export const getUsersService = async (
  paginationOptions: IPaginationOptions,
  filters: IUserFilters
): Promise<IGenericResponse<User[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions)
  const { searchTerm, ...filterData } = filters

  const andConditons = []

  if (searchTerm) {
    andConditons.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditons: Prisma.UserWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {}

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.user.count()

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}
