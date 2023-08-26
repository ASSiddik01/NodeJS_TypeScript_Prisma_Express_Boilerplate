import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { signUp } from './auth.controller'
import { signUpZod } from './auth.validation'
const router = express.Router()

router.route('/signup').post(reqValidate(signUpZod), signUp)

export default router
