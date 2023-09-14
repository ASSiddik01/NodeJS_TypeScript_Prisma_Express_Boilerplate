import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'
import profileRoute from '../modules/profile/profile.routes'

const appRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/profile',
    route: profileRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
