import { Router } from "express";
import * as controller from './controller'
const router = Router()

router.post("/",controller.createProject)
router.get("/:orgId",controller.getAllProjects)
export default router