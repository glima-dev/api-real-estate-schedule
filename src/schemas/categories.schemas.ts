import { z } from "zod";
import { realEstateListSchema } from "./realEstates.schemas";

const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const categoryCreateSchema = categorySchema.omit({
  id: true,
});

const categoryListSchema = categorySchema.array();

const categoryRealEstateListSchema = categorySchema.extend({
  realEstate: realEstateListSchema,
});

export {
  categorySchema,
  categoryCreateSchema,
  categoryListSchema,
  categoryRealEstateListSchema,
};
