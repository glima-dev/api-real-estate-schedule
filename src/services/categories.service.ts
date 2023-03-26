import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { Category } from "../entities";
import {
  ICategoriesList,
  ICategoryCreate,
  ICategoryRealEstateList,
  ICategoryRepo,
  ICategoryReturn,
} from "../interfaces/categories.interfaces";
import {
  categoryListSchema,
  categoryRealEstateListSchema,
  categorySchema,
} from "../schemas/categories.schemas";

const create = async (
  categoryData: ICategoryCreate
): Promise<ICategoryReturn> => {
  const categoryRepository: ICategoryRepo =
    AppDataSource.getRepository(Category);

  const findDuplicateCategory: Category | null =
    await categoryRepository.findOne({
      where: {
        name: categoryData.name,
      },
    });

  if (findDuplicateCategory) throw new AppError("Category already exists", 409);

  const newCategory: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(newCategory);

  return categorySchema.parse(newCategory);
};

const read = async (): Promise<ICategoriesList> => {
  const categoryRepository: ICategoryRepo =
    AppDataSource.getRepository(Category);

  const findCategories: Array<Category> = await categoryRepository.find();

  return categoryListSchema.parse(findCategories);
};

const readRealEstates = async (
  categoryId: number
): Promise<ICategoryRealEstateList> => {
  const categoryRepository: ICategoryRepo =
    AppDataSource.getRepository(Category);

  const findRealEstatesByCategory: Category | null =
    await categoryRepository.findOne({
      where: {
        id: categoryId,
      },
      relations: ["realEstate"],
    });

  if (!findRealEstatesByCategory) throw new AppError("Category not found", 404);

  return categoryRealEstateListSchema.parse(findRealEstatesByCategory!);
};

export default { create, read, readRealEstates };
