import { z } from "zod";

const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const addressCreateSchema = addressSchema.omit({
  id: true,
});

const realEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z
    .number()
    .min(0)
    .max(9999999999.99)
    .transform((value) => parseFloat(value.toFixed(2)))
    .or(z.string()),
  size: z.number().int().positive(),
  createdAt: z.date().or(z.string()).nullish(),
  updatedAt: z.date().or(z.string()).nullish(),
});

const realEstateWithoutIdSchema = realEstateSchema.omit({
  id: true,
});

const realEstateCreateSchema = realEstateSchema
  .omit({
    id: true,
    sold: true,
    updatedAt: true,
    createdAt: true,
  })
  .extend({
    address: addressCreateSchema,
    categoryId: z.number().positive().int(),
  });

const realEstateListSchema = z.array(realEstateSchema);

const fullRealEstateReturnSchema = realEstateSchema.extend({
  address: addressSchema,
  category: z.object({
    id: z.number(),
    name: z.string().max(45),
  }),
});

const realEstateListWithoutCategorySchema = z.array(
  fullRealEstateReturnSchema.omit({
    category: true,
  })
);

export {
  addressSchema,
  addressCreateSchema,
  realEstateSchema,
  realEstateListSchema,
  realEstateCreateSchema,
  fullRealEstateReturnSchema,
  realEstateWithoutIdSchema,
  realEstateListWithoutCategorySchema,
};
