import { Request, Response, NextFunction } from "express";
import * as service from "./service";

export const createSprint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, startDate, endDate, projectId } = req.body;
    const userId = (req as any).userId;
    const data = await service.createSprint({
      name,
      startDate,
      endDate,
      projectId,
      userId,
    });
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};


export const getAllSprint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;
    const project_id = req.params.id
    const data = await service.getAllSprint(project_id);
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};


export const updateSprintStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId
    const {id,end_date:endDate,start_date:startDate,status,newStatus} = req.body
    const data = await service.updateSprintStatus({id,userId,endDate,startDate,status,newStatus});
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};
