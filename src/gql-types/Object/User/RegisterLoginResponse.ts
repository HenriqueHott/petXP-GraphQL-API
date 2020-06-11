import { ObjectType, Field } from "type-graphql";
import { UserResponse } from "./UserResponse";
import { AccessToken } from "../../../types";

@ObjectType()
export class RegisterLoginResponse extends UserResponse {
  @Field(() => String, { nullable: true })
  accessToken?: AccessToken;
}
