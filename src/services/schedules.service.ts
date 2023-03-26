import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { RealEstate, User, Schedule } from "../entities";
import {
  IScheduleCreate,
  IScheduleCreateSuccessfull,
  IScheduleRepo,
} from "../interfaces/schedules.interface";
import { scheduleCreateSuccessfullSchema } from "../schemas/schedules.schemas";
import { IRealEstateRepo } from "../interfaces/realEstates.interfaces";
import { IUserRepo } from "../interfaces/users.interface";

const create = async (
  userId: number,
  scheduleData: IScheduleCreate
): Promise<IScheduleCreateSuccessfull> => {
  const realEstateRepository: IRealEstateRepo =
    AppDataSource.getRepository(RealEstate);
  const scheduleRepository: IScheduleRepo =
    AppDataSource.getRepository(Schedule);
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const checkExistingRealEstate: RealEstate | null =
    await realEstateRepository.findOneBy({
      id: scheduleData.realEstateId,
    });
  if (!checkExistingRealEstate) throw new AppError("RealEstate not found", 404);

  const checkUserSchedule = await scheduleRepository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .andWhere("schedules_users_properties.user = :userId", { userId: userId })
    .getOne();
  if (checkUserSchedule)
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );

  const checkRealEstateSchedule = await scheduleRepository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .andWhere("schedules_users_properties.realEstateId = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .getOne();
  if (checkRealEstateSchedule)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  const dateFormat = new Date(`${scheduleData.date}T${scheduleData.hour}`);
  const hourIntValue = dateFormat.getHours();
  const minuteIntValue = dateFormat.getMinutes();

  const isBetween8And18 =
    hourIntValue >= 8 &&
    minuteIntValue >= 0 &&
    minuteIntValue < 60 &&
    (hourIntValue < 18 || (hourIntValue === 18 && minuteIntValue === 0));
  const isWeekday = dateFormat.getDay() > 0 && dateFormat.getDay() < 6;

  if (!isBetween8And18)
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  if (!isWeekday)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  const realEstate = checkExistingRealEstate;
  const user: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const newSchedule: Schedule = scheduleRepository.create({
    date: dateFormat,
    hour: scheduleData.hour,
    realEstate: realEstate!,
    user: user!,
  });

  await scheduleRepository.save(newSchedule);

  return scheduleCreateSuccessfullSchema.parse({ message: "Schedule created" });
};

const read = async (realEstateId: number): Promise<RealEstate> => {
  const realEstateRepository: IRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const schedulesByRealEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("realEstate")
    .innerJoinAndSelect("realEstate.address", "address")
    .innerJoinAndSelect("realEstate.category", "category")
    .innerJoinAndSelect("realEstate.schedules", "schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .where("realEstate.id = :id", { id: realEstateId })
    .getOne();

  if (!schedulesByRealEstate) throw new AppError("RealEstate not found", 404);

  return schedulesByRealEstate;
};

export default { create, read };

/* 
QUERY WITHOU RETURN USER PASSWORD:

 const schedulesByRealEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("real_estate")
    .innerJoinAndSelect("real_estate.address", "address")
    .innerJoinAndSelect("real_estate.category", "category")
    .innerJoinAndSelect("real_estate.schedules", "schedules")
    .innerJoin("schedules.user", "user")
    .where("real_estate.id = :id", { id: realEstateId })
    .addSelect([
      "real_estate.*",
      "address.*",
      "category.*",
      "schedules.*",
      "user.id",
      "user.name",
      "user.email",
      "user.admin",
      "user.createdAt",
      "user.updatedAt",
      "user.deletedAt",
    ])
    .getOne();

VERIFICATION WITH DATE QUERY

  const checkUserSchedule = await scheduleRepository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .andWhere("schedules_users_properties.date = :date", {
      date: scheduleData.date,
    })
    .andWhere("schedules_users_properties.user = :userId", { userId: userId })
    .getOne();

  const checkRealEstateSchedule = await scheduleRepository
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .andWhere("schedules_users_properties.date = :date", {
      date: scheduleData.date,
    })
    .andWhere("schedules_users_properties.realEstateId = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .getOne();

*/
