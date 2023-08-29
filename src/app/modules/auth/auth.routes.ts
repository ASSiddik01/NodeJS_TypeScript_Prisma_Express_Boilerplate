import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import {
  changePassword,
  forgetPassword,
  refreshToken,
  signIn,
  signUp,
} from './auth.controller'
import {
  changePasswordZod,
  forgetPasswordZod,
  refreshTokenZod,
  signInZod,
  signUpZod,
} from './auth.validation'
import { USER_ROLE } from '@prisma/client'
import { auth } from '../../../middleware/auth'
const router = express.Router()

router.route('/signup').post(reqValidate(signUpZod), signUp)

router.route('/signin').post(reqValidate(signInZod), signIn)

router.route('/refresh-token').post(reqValidate(refreshTokenZod), refreshToken)

router
  .route('/change-password')
  .patch(
    auth(USER_ROLE.admin, USER_ROLE.user),
    reqValidate(changePasswordZod),
    changePassword
  )

router
  .route('/forget-password')
  .patch(reqValidate(forgetPasswordZod), forgetPassword)
export default router
