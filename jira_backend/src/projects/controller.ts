import { Request, Response, NextFunction } from "express";
import * as service from "./service";
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await service.createProject(req.body);
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orgId = req.params.orgId;
    const data = await service.getAllProjects(orgId);
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = await service.deleteProject(id);
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};
