import { Router } from "express";
import * as controller from "./controller";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();
router.use(authMiddleware);
router.post("/", controller.createOrganization);
router.get("/:orgId", controller.getOrganization);
router.get("/user/all", controller.getAllOrganizationForUser);

export default router;
