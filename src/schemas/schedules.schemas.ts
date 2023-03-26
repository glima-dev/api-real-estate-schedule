import { z } from "zod";
import { fullRealEstateReturnSchema } from "./realEstates.schemas";
import { userReturnSchema } from "./users.schema";

const scheduleSchema = z.object({
  id: z.number(),
  date: z
    .string()
    .regex(/^\d{4}\/\d{2}\/\d{2}$/)
    .transform((value) => {
      return value.replace(/\//g, "-");
    }),
  hour: z.string(),
  realEstateId: z.number().int(),
  userId: z.number(),
});

const scheduleCreateSchema = scheduleSchema.omit({
  id: true,
  userId: true,
});

const scheduleCreateSuccessfullSchema = z.object({
  message: z.string(),
});

export {
  scheduleSchema,
  scheduleCreateSchema,
  scheduleCreateSuccessfullSchema,
};
