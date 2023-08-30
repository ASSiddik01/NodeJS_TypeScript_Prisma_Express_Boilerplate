import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { User } from '@prisma/client'
import { getUsersService } from './user.services'
import { pick } from '../../../utilities/pick'
import { paginationFields } from '../../../constants/pagination'
import { userFilterableFields } from './user.constants'

export const getUsers = tryCatch(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const filters = pick(req.query, userFilterableFields)

  const result = await getUsersService(paginationOptions, filters)

  sendRes<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semster data fetched!!',
    meta: result.meta,
    data: result.data,
  })
})
