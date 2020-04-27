import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = ({ id, tokenVersion }: User) =>
  sign({ id, tokenVersion }, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });

const expirationSecs = 60 * 60 * 24 * 7; // 7 days

export const createRefreshToken = ({ id, tokenVersion }: User) =>
  sign({ id, tokenVersion }, process.env.JWT_REFRESH_TOKEN_SECRET!, {
    expiresIn: expirationSecs
  });

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie(process.env.COOKIE_NAME!, createRefreshToken(user), {
    // domain: ".example.com",
    maxAge: expirationSecs * 1000,
    httpOnly: true,
    path: "/refresh-access-token",
    secure: process.env.NODE_ENV === "production"
  });
};
