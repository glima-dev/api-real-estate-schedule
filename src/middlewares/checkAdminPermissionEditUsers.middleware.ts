import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const checkAdminPermissionEditUsersMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = req.user.admin;
  const idLoggedUser = req.user.id;
  const idTargetUser = parseInt(req.params.id);

  if (idLoggedUser !== idTargetUser)
    if (!isAdmin) throw new AppError("Insufficient permission", 403);

  return next();
};

export default checkAdminPermissionEditUsersMiddleware;
