/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

if (process.argv.length < 2) {
  console.error('Command will be: node modulesGenerator.js your_folder_name')
  process.exit(1)
}

// Get folder and file names from command-line arguments
const name = process.argv[2]

// Define the target directory
const targetDirectory = path.join(__dirname, 'src', 'app', 'modules', name)

// Create the target directory
fs.mkdirSync(targetDirectory, { recursive: true })

// Create and write the files in the target directory

const routesTemplate = `
import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { USER_ROLE } from '@prisma/client'
import { auth } from '../../../middleware/auth'
import { changePasswordZod } from './auth.validation'

// example route

router
  .route('/change-password')
  .patch(
    auth(USER_ROLE.admin, USER_ROLE.user),
    reqValidate(changePasswordZod),
    changePassword
  )

export default router
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.routes.ts`),
  routesTemplate
)

const validationTemplate = `
import { z } from 'zod'

// example zod validation schema
export const changePasswordZod = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Z: Old password is required',
    }),
    newPassword: z.string({
      required_error: 'Z: New password is required',
    }),
  }),
})

`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.validations.ts`),
  validationTemplate
)

const controllerTemplate = `
import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { User } from '@prisma/client'
import {signUpService} from './auth.service'

// example controller
export const signUp = tryCatch(async (req: Request, res: Response) => {
  const result = await signUpService(req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sign up successfully',
    data: result,
  })
})

`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.controllers.ts`),
  controllerTemplate
)

const serviceTemplate = `
import { User } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'
import config from '../../../config'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'

export const signUpService = async (data: User): Promise<User | null> => {
  return result
}
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.services.ts`),
  serviceTemplate
)

const interfacesTemplate = `
// Example interfaces
export type IChangePassword = {
  oldPassword: string
  newPassword: string
}
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.interfaces.ts`),
  interfacesTemplate
)

const constantsTemplate = `
export const role = ['']
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.constants.ts`),
  constantsTemplate
)

console.log(
  `Folder '${name}' and files created successfully in 'src/app/modules'.`
)
