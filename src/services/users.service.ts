import { AppDataSource } from "../data-source";
import { User } from "../entities";
import {
  IUserCreate,
  IUserList,
  IUserRepo,
  IUserReturn,
  IUserUpdate,
} from "../interfaces/users.interface";
import { userReturnSchema, userListSchema } from "../schemas/users.schema";

const create = async (userData: IUserCreate): Promise<IUserReturn> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);
  const newUser: User = userRepository.create(userData);

  await userRepository.save(newUser);

  return userReturnSchema.parse(newUser);
};

const read = async (): Promise<IUserList> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find();

  return userListSchema.parse(findUsers);
};

const update = async (
  userId: number,
  newUserData: IUserUpdate
): Promise<IUserReturn> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const updatedUser = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(updatedUser);

  return userReturnSchema.parse(updatedUser);
};

const destroy = async (userId: number): Promise<void> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  await userRepository.softRemove(user!);
};

export default { create, read, update, destroy };
