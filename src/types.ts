import { Request, Response } from "express";
import { User } from "./entities/User";

export type AccessToken = string | null;

export interface Context {
  req: Request;
  res: Response;
  user?: User;
}

export interface TokenPayload {
  id: User["id"];
  tokenVersion: User["tokenVersion"];
  iat: number;
  exp: number;
}
