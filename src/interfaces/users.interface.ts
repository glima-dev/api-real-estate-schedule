import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";
import {
  userCreateSchema,
  userListSchema,
  userReturnSchema,
  userUpdateSchema,
} from "../schemas/users.schema";

type IUserCreate = z.infer<typeof userCreateSchema>;
type IUserReturn = z.infer<typeof userReturnSchema>;
type IUserRepo = Repository<User>;
type IUserList = z.infer<typeof userListSchema>;
type IUserUpdate = DeepPartial<typeof userUpdateSchema>;

export { IUserCreate, IUserReturn, IUserRepo, IUserList, IUserUpdate };
