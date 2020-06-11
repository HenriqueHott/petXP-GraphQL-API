import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import { AccessToken } from "../types";
import { cookiePath } from "../constants";

type TokenFn = (user: User) => NonNullable<AccessToken>;

export const createAccessToken: TokenFn = ({ id, tokenVersion }) =>
  sign({ id, tokenVersion }, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });

const cookieExpirationInSeconds = 60 * 60 * 24 * 7; // 7 days

export const createRefreshToken: TokenFn = ({ id, tokenVersion }) =>
  sign({ id, tokenVersion }, process.env.JWT_REFRESH_TOKEN_SECRET!, {
    expiresIn: cookieExpirationInSeconds
  });

export const sendRefreshToken = (res: Response, user: User): void => {
  res.cookie(process.env.COOKIE_NAME!, createRefreshToken(user), {
    // domain: ".example.com",
    httpOnly: true,
    maxAge: cookieExpirationInSeconds * 1000,
    path: cookiePath,
    secure: process.env.NODE_ENV === "production"
  });
};
