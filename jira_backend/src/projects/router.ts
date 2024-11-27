import { Router } from "express";
import * as controller from "./controller";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();
router.use(authMiddleware)

router.post("/", controller.createProject);
router.get("/:id", controller.getProject)
router.get("/bulk/:orgId", controller.getAllProjects);
router.delete("/:id", controller.deleteProject);
export default router;
