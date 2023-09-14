import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { createProfileZod, updateProfileZod } from './profile.validations'
import { createProfile, getProfile, updateProfile } from './profile.controllers'
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
  .get(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), getProfile)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    reqValidate(updateProfileZod),
    updateProfile
  )

export default router
