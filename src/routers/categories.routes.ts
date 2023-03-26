import { Router } from "express";
import { categoriesController } from "../controllers";
import {
  checkAdminPermissionMiddleware,
  ensureTokenIsValidMiddleware,
  validateBodyMiddleware,
} from "../middlewares";
import { categoryCreateSchema } from "../schemas/categories.schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  checkAdminPermissionMiddleware,
  validateBodyMiddleware(categoryCreateSchema),
  categoriesController.create
);

categoriesRoutes.get("", categoriesController.read);
categoriesRoutes.get("/:id/realEstate", categoriesController.readRealEstates);

export default categoriesRoutes;
