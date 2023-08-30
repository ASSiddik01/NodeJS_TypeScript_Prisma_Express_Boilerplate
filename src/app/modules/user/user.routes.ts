import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { createUserZod } from './user.validations'
import { getUsers } from './user.controllers'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

// example route
router.route('/').get(getUsers)

export default router
