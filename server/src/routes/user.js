import express from 'express'
import UserController from '../Controllers/userController.js'

const user = new UserController()
const router = express.Router()

router.post('/signup', user.signup)

router.post('/signin', user.signin)
router.get('/', user.get)

export default router
