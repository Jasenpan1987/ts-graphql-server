import { Request, Response } from "express";

export interface LoginContext {
  req: Request;
  res: Response;
}
