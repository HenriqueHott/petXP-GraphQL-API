import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = ({ id, tokenVersion }: User) => {
  return sign({ id, tokenVersion }, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = ({ id, tokenVersion }: User) => {
  return sign({ id, tokenVersion }, process.env.JWT_REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d"
  });
};

export const sendRefreshToken = (res: Response, user: User): void => {
  res.cookie(process.env.COOKIE_NAME!, createRefreshToken(user), {
    // domain: ".example.com",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
    httpOnly: true,
    path: "/refresh-access-token"
  });
};
