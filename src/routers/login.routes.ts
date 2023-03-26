import { Router } from "express";
import { loginController } from "../controllers";
import { validateBodyMiddleware } from "../middlewares";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  validateBodyMiddleware(createLoginSchema),
  loginController.create
);

export default loginRoutes;
