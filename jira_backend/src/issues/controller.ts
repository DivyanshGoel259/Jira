import { Request, Response, NextFunction } from "express";
import * as service from "./service";

export const createIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reporter_id = (req as any).userId;
    const payload = req.body;
    const data = await service.createIssue({ ...payload, reporter_id });
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};

export const getAllIssues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;
    const sprint_id = req.params.sprintId;
    const data = await service.getAllIssues({ userId, sprint_id });
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};

export const updateIssues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;
    const issues = req.body;
    const payload = { issues, userId };
    const data = await service.updateIssues(payload);
    return res.json({ data });
  } catch (err: any) {
    next(err);
  }
};
