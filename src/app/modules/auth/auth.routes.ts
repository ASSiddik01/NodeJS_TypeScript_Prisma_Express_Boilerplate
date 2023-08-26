import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { refreshToken, signIn, signUp } from './auth.controller'
import { refreshTokenZod, signInZod, signUpZod } from './auth.validation'
const router = express.Router()

router.route('/signup').post(reqValidate(signUpZod), signUp)
router.route('/signin').post(reqValidate(signInZod), signIn)
router.route('/refresh-token').post(reqValidate(refreshTokenZod), refreshToken)

export default router
