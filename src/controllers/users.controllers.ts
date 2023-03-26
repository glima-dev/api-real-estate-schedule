import { Request, Response } from "express";
import {
  IUserList,
  IUserReturn,
  IUserUpdate,
} from "../interfaces/users.interface";
import { userService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const newUser: IUserReturn = await userService.create(req.body);

  return res.status(201).json(newUser);
};

const read = async (_: Request, res: Response): Promise<Response> => {
  const users: IUserList = await userService.read();

  return res.status(200).json(users);
};

const update = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body;
  const userId = parseInt(req.params.id);

  const updatedUser = await userService.update(userId, userData);

  return res.status(200).json(updatedUser);
};

const destroy = async (req: Request, res: Response) => {
  await userService.destroy(Number(req.params.id));

  return res.status(204).send();
};

export default { create, read, update, destroy };
