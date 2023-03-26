import { Request, Response } from "express";
import { IScheduleCreateSuccessfull } from "../interfaces/schedules.interface";
import { schedulesService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const newScheduleSuccess: IScheduleCreateSuccessfull =
    await schedulesService.create(req.user.id, req.body);

  return res.status(201).json(newScheduleSuccess);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const realEstateId = Number(req.params.id);

  const schedulesByRealEstate = await schedulesService.read(realEstateId);

  return res.status(200).json(schedulesByRealEstate);
};

export default { create, read };
