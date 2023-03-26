import { z } from "zod";
import { Repository } from "typeorm";
import { Address, RealEstate } from "../entities";
import {
  addressCreateSchema,
  fullRealEstateReturnSchema,
  realEstateCreateSchema,
  realEstateListWithoutCategorySchema,
} from "../schemas/realEstates.schemas";

type IRealEstateRepo = Repository<RealEstate>;
type IAddressRepo = Repository<Address>;
type IRealEstateCreate = z.infer<typeof realEstateCreateSchema>;
type IFullRealEstateReturn = z.infer<typeof fullRealEstateReturnSchema>;
type IAddressCreate = z.infer<typeof addressCreateSchema>;
type IRealEstateListWithoutCategory = z.infer<
  typeof realEstateListWithoutCategorySchema
>;

export {
  IRealEstateRepo,
  IRealEstateCreate,
  IAddressCreate,
  IFullRealEstateReturn,
  IAddressRepo,
  IRealEstateListWithoutCategory,
};
