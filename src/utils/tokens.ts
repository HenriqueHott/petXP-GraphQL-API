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
  const date = new Date();
  date.setDate(date.getDate() + 7); // add 1 week

  res.cookie(process.env.COOKIE_NAME!, createRefreshToken(user), {
    // domain: ".example.com",
    expires: date,
    httpOnly: true,
    path: "/refresh-access-token",
    secure: process.env.NODE_ENV === "production"
  });
};
