import { Router } from "express";
import * as controller from "./controller";
const router = Router();

router.post("/", controller.createProject);
router.get("/:orgId", controller.getAllProjects);
router.delete("/:id", controller.deleteProject);
export default router;
