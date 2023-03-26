import { Router } from "express";
import { realEstateController } from "../controllers";
import {
  checkAdminPermissionMiddleware,
  ensureTokenIsValidMiddleware,
  validateBodyMiddleware,
} from "../middlewares";
import { realEstateCreateSchema } from "../schemas/realEstates.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  checkAdminPermissionMiddleware,
  validateBodyMiddleware(realEstateCreateSchema),
  realEstateController.create
);

realEstateRoutes.get("", realEstateController.read);

export default realEstateRoutes;
