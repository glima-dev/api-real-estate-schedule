import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  password: z.string().min(4).max(20),
  admin: z.boolean().optional().default(false),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  deletedAt: z.date().or(z.string()).nullable(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userReturnSchema = userSchema.omit({
  password: true,
});

const userListSchema = z.array(userReturnSchema);

const userUpdateSchema = userCreateSchema
  .omit({
    admin: true,
  })
  .partial();

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userListSchema,
  userUpdateSchema,
};
