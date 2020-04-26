import { MiddlewareFn, NextFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context, Payload } from "../types";
import { User } from "../entities/User";
import { notAuthenticated, wrongTokenVersion } from "../constants";
import { IErrorResponse } from "../resolvers/types";

export const ValidateUser: MiddlewareFn<Context> = async (
  { context },
  next
): Promise<NextFn | IErrorResponse> => {
  const { authorization } = context.req.headers;
  if (!authorization) throw new Error(notAuthenticated);

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET!
    ) as Payload;

    const user = await User.findOne({
      where: { id: payload.id },
      relations: ["pets", "requests"]
    });
    if (!user) throw new Error("Could not find user");

    if (payload.tokenVersion !== user.tokenVersion) {
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
