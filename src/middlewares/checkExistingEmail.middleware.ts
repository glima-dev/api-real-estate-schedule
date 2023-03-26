import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { IUserRepo } from "../interfaces/users.interface";

const checkExistingEmailMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  if (req.body.email) {
    const findEmail: User | null = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (findEmail) throw new AppError("Email already exists", 409);
  }

  return next();
};

export default checkExistingEmailMiddleware;
