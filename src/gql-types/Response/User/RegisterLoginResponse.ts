import { ObjectType, Field } from "type-graphql";
import { UserResponse } from "./UserResponse";

@ObjectType()
export class RegisterLoginResponse extends UserResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string | null;
}
