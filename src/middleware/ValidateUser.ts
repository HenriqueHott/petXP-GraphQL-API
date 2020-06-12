import { MiddlewareFn, NextFn } from "type-graphql";
import { Context, TokenPayload } from "../types";
import { IErrorResponse } from "../resolvers/types";
import { verify } from "jsonwebtoken";
import { User } from "../entities/User";
import {
  noAuthorizationToken,
  userNotFound,
  wrongTokenVersion,
  notAuthenticated
} from "../constants";

export const ValidateUser: MiddlewareFn<Context> = async (
  { context },
  next
): Promise<NextFn | IErrorResponse> => {
  const { authorization } = context.req.headers;
  if (!authorization) throw new Error(noAuthorizationToken);

  try {
    const token = authorization.split(" ")[1];
    const { id, tokenVersion } = verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET
    ) as TokenPayload;

    const user = await User.findOne({
      where: { id },
      relations: ["pets", "requests"]
    });

    if (!user) throw new Error(userNotFound);
    if (tokenVersion !== user.tokenVersion) {
      throw new Error(wrongTokenVersion);
    }

    context.user = user;
  } catch (err) {
    console.log(err);

    return {
      ok: false,
      errors: [
        {
          message: notAuthenticated
        }
      ]
    };
  }

  return next();
};
