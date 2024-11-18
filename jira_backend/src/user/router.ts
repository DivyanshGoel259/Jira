import { Router } from "express";
import * as controller from "./controller";
const userRouter = Router();

userRouter.post("/signin", controller.signin);
userRouter.post("/signup", controller.signup);
userRouter.post("/glogin", controller.gLogin);

export default userRouter;
