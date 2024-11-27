import { Router } from "express";
import * as controller from "./controller";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();
router.use(authMiddleware);

router.post("/", controller.createSprint);
router.get("/:id", controller.getAllSprint);
router.put("/", controller.updateSprintStatus);
export default router;
