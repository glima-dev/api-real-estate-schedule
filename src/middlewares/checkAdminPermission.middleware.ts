import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const checkAdminPermissionMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = req.user.admin;

  if (!isAdmin) throw new AppError("Insufficient permission", 403);

  return next();
};

export default checkAdminPermissionMiddleware;
