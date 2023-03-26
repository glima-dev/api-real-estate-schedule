import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";

const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, _: Response, next: NextFunction): void => {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;

    const validatedKeys: Array<string> = Object.keys(validatedData);

    if (!validatedKeys.length)
      throw new AppError("Provide at least one updatable value", 400);

    return next();
  };

export default validateBodyMiddleware;
