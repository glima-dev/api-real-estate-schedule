import { z } from "zod";
import { Repository } from "typeorm";
import { Category } from "../entities";
import {
  categoryCreateSchema,
  categoryListSchema,
  categoryRealEstateListSchema,
  categorySchema,
} from "../schemas/categories.schemas";

type ICategoryCreate = z.infer<typeof categoryCreateSchema>;
type ICategoryReturn = z.infer<typeof categorySchema>;
type ICategoriesList = z.infer<typeof categoryListSchema>;
type ICategoryRealEstateList = z.infer<typeof categoryRealEstateListSchema>;
type ICategoryRepo = Repository<Category>;

export {
  ICategoryCreate,
  ICategoryReturn,
  ICategoriesList,
  ICategoryRepo,
  ICategoryRealEstateList,
};
