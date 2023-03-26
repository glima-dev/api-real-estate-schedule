import { Router } from "express";
import { schedulesController } from "../controllers";
import {
  checkAdminPermissionMiddleware,
  ensureTokenIsValidMiddleware,
  validateBodyMiddleware,
} from "../middlewares";
import { scheduleCreateSchema } from "../schemas/schedules.schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  validateBodyMiddleware(scheduleCreateSchema),
  schedulesController.create
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  checkAdminPermissionMiddleware,
  schedulesController.read
);

export default schedulesRoutes;
