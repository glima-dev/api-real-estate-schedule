import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { IUserRepo } from "../interfaces/users.interface";

const ensureUserExistsMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const id = Number(req.params.id);
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOneBy({
    id,
  });

  if (!findUser) throw new AppError("User not found", 404);

  return next();
};

export default ensureUserExistsMiddleware;
