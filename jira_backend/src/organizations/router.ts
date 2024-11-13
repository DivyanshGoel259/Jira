import { Router } from "express";
import * as controller from "./controller"
const orgRouter = Router()

orgRouter.post("/",controller.createOrganization)

export default orgRouter