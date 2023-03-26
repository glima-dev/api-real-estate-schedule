import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import "dotenv/config";
import { ILogin } from "../interfaces/login.interfaces";
import { IUserRepo } from "../interfaces/users.interface";

const create = async (loginData: ILogin): Promise<string> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) throw new AppError("Invalid credentials", 401);

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) throw new AppError("Invalid credentials", 401);

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return token;
};

export default { create };
