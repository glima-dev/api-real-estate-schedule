import { z } from "zod";

const createLoginSchema = z.object({
  email: z.string().email().max(45),
  password: z.string().max(20),
});

export { createLoginSchema };
