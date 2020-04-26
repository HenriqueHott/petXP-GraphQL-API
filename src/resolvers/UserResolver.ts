import {
  Resolver,
  Query,
  Mutation,
  Args,
  Ctx,
  UseMiddleware
} from "type-graphql";
import { User } from "../entities/User";
import { ValidateUser } from "../middleware/ValidateUser";
import { Context } from "../types";
import { RegisterUserArgs } from "../gql-types/Args/User/RegisterUserArgs";
import { LoginArgs } from "../gql-types/Args/User/LoginArgs";
import { invalidLogin, unexpectedError, emailRegistered } from "../constants";
import { UserArgs } from "../gql-types/Args/User/UserArgs";
import { sendRefreshToken, createAccessToken } from "../utils/tokens";
import { verify } from "argon2";
import { RegisterLoginResponse } from "../gql-types/Response/User/RegisterLoginResponse";
import { validate } from "class-validator";
import { FieldError } from "../gql-types/Object/FieldError";
import { formatErrors } from "../utils/formatErrors";
import { UserResponse } from "../gql-types/Response/User/UserResponse";
import { errorResponse } from "../utils/errorResponse";
import {
  IResolverResponse,
  IUserResponse,
  IRegisterLoginResponse
} from "./types";

const registerLoginGoodResponse = (user: User): IRegisterLoginResponse => ({
  ok: true,
  user,
  accessToken: createAccessToken(user)
});

@Resolver(User)
export class UserResolver {
  @UseMiddleware(ValidateUser)
  @Query(() => UserResponse)
  me(@Ctx() { user }: Context): IResolverResponse<IUserResponse> {
    return {
      ok: true,
      user: user!
    };
  }

  @Mutation(() => RegisterLoginResponse)
  async register(
    @Args() args: RegisterUserArgs,
    @Ctx() { res }: Context
  ): Promise<IResolverResponse<IRegisterLoginResponse>> {
    const validationErrors = await validate(args);
    if (validationErrors.length) {
      return errorResponse(formatErrors(validationErrors));
    }

    try {
      const user = await User.create(args).save();
      Object.assign(user, { pets: [], requests: [] });

      sendRefreshToken(res, user);

      return registerLoginGoodResponse(user);
    } catch (err) {
      const errors: FieldError[] = [];
      if (err.detail.includes("already exists")) {
        errors.push({
          path: "email",
          message: emailRegistered
        });
      } else {
        console.log(err);
        errors.push({ message: unexpectedError });
      }

      return errorResponse(errors);
    }
  }

  @Mutation(() => RegisterLoginResponse)
  async login(
    @Args() args: LoginArgs,
    @Ctx() { res }: Context
  ): Promise<IResolverResponse<IRegisterLoginResponse>> {
    const validationErrors = await validate(args);
    if (validationErrors.length) {
      return errorResponse(formatErrors(validationErrors));
    }

    const user = await User.findOne({
      where: { email: args.email },
      relations: ["pets", "requests"],
      select: [
        "id",
        "createdAt",
        "updatedAt",
        "name",
        "email",
        "password",
        "state",
        "city",
        "tokenVersion"
      ]
    });

    if (!user || !(await verify(user.password, args.password))) {
      return errorResponse([
        {
          message: invalidLogin
        }
      ]);
    }

    sendRefreshToken(res, user);

    return registerLoginGoodResponse(user);
  }

  @UseMiddleware(ValidateUser)
  @Mutation(() => UserResponse)
  async updateMe(
    @Args() args: UserArgs,
    @Ctx() { user }: Context
  ): Promise<IResolverResponse<IUserResponse>> {
    const validationErrors = await validate(args);
    if (validationErrors.length) {
      return errorResponse(formatErrors(validationErrors));
    }

    Object.assign(user!, args);
    await user!.save();

    return {
      ok: true,
      user: user!
    };
  }
}
