import { ObjectType, Field } from "type-graphql";
import { User } from "../../../entities/User";
import { Response } from "../../Object/Response";

@ObjectType()
export class UserResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User | null;
}
