import {Router} from "express"
import * as controller from './controller'
const userRouter = Router()

userRouter.post('/auth',controller.getUser)

export default userRouter