import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { createProfileZod } from './profile.validations'
import { createProfile, getProfile } from './profile.controllers'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

// example route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    reqValidate(createProfileZod),
    createProfile
  )
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    reqValidate(createProfileZod),
    getProfile
  )

export default router
