import { Request, Response } from "express";
import { ILogin } from "../interfaces/login.interfaces";
import { loginService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const loginData: ILogin = req.body;

  const token: string = await loginService.create(loginData);

  return res.status(200).json({
    token: token,
  });
};

export default { create };
