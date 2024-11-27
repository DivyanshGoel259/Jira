import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import * as controller from "./controller";
const router = Router();
router.use(authMiddleware);
router.post("/", controller.createIssue);
router.get("/:sprintId", controller.getAllIssues);
router.put("/", controller.updateIssues);

export default router;
