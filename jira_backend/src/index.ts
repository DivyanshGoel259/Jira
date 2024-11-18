import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from "./libs/env";
import userRouter from "./user/router";
import orgRouter from "./organizations/router";
import projectRouter from "./projects/router";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/organizations", orgRouter);
app.use("/api/v1/project", projectRouter);

app.use((err: Error, req: Request, res: Response) => {
  return res
    .status(400)
    .json({ error: { message: err.message || "something went wrong" } });
});
app.listen(PORT, () => {
  console.log(`Succesfully started on port ${PORT}`);
});
