import { ObjectType, Field } from "type-graphql";
import { User } from "../../../entities/User";
import { ResolverResponse } from "../../Object/Response";

@ObjectType()
export class UserResponse extends ResolverResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;
}
