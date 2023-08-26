import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { createUser } from './auth.controller'
import { signUpZod } from './auth.validation'
const router = express.Router()

router.route('/signup').post(reqValidate(signUpZod), createUser)

export default router
