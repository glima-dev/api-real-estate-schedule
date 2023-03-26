import { Router } from "express";
import { usersController } from "../controllers";
import {
  checkAdminPermissionEditUsersMiddleware,
  checkAdminPermissionMiddleware,
  checkExistingEmailMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  validateBodyMiddleware,
} from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schema";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateBodyMiddleware(userCreateSchema),
  checkExistingEmailMiddleware,
  usersController.create
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  checkAdminPermissionMiddleware,
  usersController.read
);

userRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  checkAdminPermissionEditUsersMiddleware,
  validateBodyMiddleware(userUpdateSchema),
  checkExistingEmailMiddleware,
  usersController.update
);

userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  checkAdminPermissionMiddleware,
  usersController.destroy
);

export default userRoutes;
