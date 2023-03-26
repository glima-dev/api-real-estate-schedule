import { Request, Response } from "express";
import {
  IFullRealEstateReturn,
  IRealEstateListWithoutCategory,
} from "../interfaces/realEstates.interfaces";
import realEstateService from "../services/realEstate.service";

const create = async (req: Request, res: Response): Promise<Response> => {
  const newRealEstate: IFullRealEstateReturn = await realEstateService.create(
    req.body
  );

  return res.status(201).json(newRealEstate);
};

const read = async (_: Request, res: Response): Promise<Response> => {
  const allRealEstatesList: IRealEstateListWithoutCategory =
    await realEstateService.read();

  return res.status(200).json(allRealEstatesList);
};

export default { create, read };
