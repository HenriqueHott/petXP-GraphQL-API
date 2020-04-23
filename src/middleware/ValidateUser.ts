import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context, Payload } from "../types";
import { User } from "../entities/User";
import { notAuthenticated } from "../constants";

export const ValidateUser: MiddlewareFn<Context> = async (
  { context },
  next
) => {
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
      throw new Error("Wrong token version");
    }

    context.user = user;
  } catch (err) {
    console.log(err);
    context.res.status(401);
    throw new Error(notAuthenticated);
  }

  return await next();
};
