import { ObjectType, Field } from "type-graphql";
import { User } from "../../../entities/User";
import { ResolverResponse } from "../ResolverResponse";

@ObjectType()
export class UserResponse extends ResolverResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;
}
