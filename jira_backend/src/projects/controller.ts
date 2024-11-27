import { Request, Response, NextFunction } from "express";
import * as service from "./service";
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId
    const data = await service.createProject(req.body,userId);
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
    const userId = (req as any).userId
    const projectId = req.params.id
    const data = await service.deleteProject(projectId,userId);
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};


export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = await service.getProject(id);
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};
