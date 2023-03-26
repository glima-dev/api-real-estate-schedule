import { Request, Response } from "express";
import {
  ICategoriesList,
  ICategoryRealEstateList,
  ICategoryReturn,
} from "../interfaces/categories.interfaces";
import { categoryService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const newCategory: ICategoryReturn = await categoryService.create(req.body);

  return res.status(201).json(newCategory);
};

const read = async (_: Request, res: Response): Promise<Response> => {
  const categories: ICategoriesList = await categoryService.read();

  return res.status(200).json(categories);
};

const readRealEstates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId = Number(req.params.id);

  const realEstatesByCategory: ICategoryRealEstateList =
    await categoryService.readRealEstates(categoryId);

  return res.status(200).json(realEstatesByCategory);
};

export default { create, read, readRealEstates };
