import { ArgsType, Field, ID } from "type-graphql";
import { UserArgs } from "./UserArgs";
import { IsUUID } from "class-validator";

@ArgsType()
export class UpdateUserArgs extends UserArgs {
  @Field(() => ID)
  @IsUUID("4")
  id: string;
}
