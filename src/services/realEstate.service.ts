import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { Address, Category, RealEstate } from "../entities";
import { ICategoryRepo } from "../interfaces/categories.interfaces";
import {
  IAddressCreate,
  IAddressRepo,
  IFullRealEstateReturn,
  IRealEstateCreate,
  IRealEstateListWithoutCategory,
  IRealEstateRepo,
} from "../interfaces/realEstates.interfaces";
import {
  addressCreateSchema,
  fullRealEstateReturnSchema,
  realEstateListWithoutCategorySchema,
  realEstateWithoutIdSchema,
} from "../schemas/realEstates.schemas";

const create = async (
  realEstateData: IRealEstateCreate
): Promise<IFullRealEstateReturn> => {
  const realEstateRepository: IRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const categoryRepository: ICategoryRepo =
    AppDataSource.getRepository(Category);

  const addressRepository: IAddressRepo = AppDataSource.getRepository(Address);

  let searchParamKey;
  let searchParamValue;

  if (realEstateData.address.number) {
    searchParamKey = "number";
    searchParamValue = realEstateData.address.number;
  } else {
    searchParamKey = "city";
    searchParamValue = realEstateData.address.city;
  }

  const checkExistingAddress: Address | null = await addressRepository.findOne({
    where: {
      zipCode: realEstateData.address.zipCode,
      [searchParamKey]: searchParamValue,
    },
  });

  if (checkExistingAddress) throw new AppError("Address already exists", 409);

  const existingCategory: Category | null = await categoryRepository.findOne({
    where: {
      id: realEstateData.categoryId,
    },
  });
  if (!existingCategory) throw new AppError("Category not found", 404);

  const newAddress: IAddressCreate = addressCreateSchema.parse(
    realEstateData.address
  );
  const address: Address = addressRepository.create(newAddress);
  await addressRepository.save(address);

  const { size, value, sold } = realEstateWithoutIdSchema.parse(realEstateData);

  const newRealEstate: RealEstate = realEstateRepository.create({
    sold: sold,
    value: value,
    size: size,
    address: address,
    category: existingCategory,
  });

  await realEstateRepository.save(newRealEstate);

  return fullRealEstateReturnSchema.parse(newRealEstate);
};

const read = async (): Promise<IRealEstateListWithoutCategory> => {
  const realEstateRepository: IRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const findAllRealEstates: RealEstate[] | null =
    await realEstateRepository.find({
      relations: ["address"],
    });

  return realEstateListWithoutCategorySchema.parse(findAllRealEstates!);
};

export default { create, read };
