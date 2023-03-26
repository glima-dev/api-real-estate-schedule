import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import {
  scheduleCreateSchema,
  scheduleCreateSuccessfullSchema,
} from "../schemas/schedules.schemas";

type IScheduleCreate = z.infer<typeof scheduleCreateSchema>;
type IScheduleCreateSuccessfull = z.infer<
  typeof scheduleCreateSuccessfullSchema
>;
type IScheduleRepo = Repository<Schedule>;

export { IScheduleCreate, IScheduleRepo, IScheduleCreateSuccessfull };
