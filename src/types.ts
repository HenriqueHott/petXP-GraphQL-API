import { Request, Response } from "express";
import { User } from "./entities/User";

export interface Context {
  req: Request;
  res: Response;
  user?: User;
}

export interface Payload {
  id: User["id"];
  tokenVersion: User["tokenVersion"];
  iat: number;
  exp: number;
}
