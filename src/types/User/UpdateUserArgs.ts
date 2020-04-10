import { ArgsType, Field, ID } from "type-graphql";
import { UserArgs } from "./UserArgs";
import { IsString, Length } from "class-validator";

@ArgsType()
export class UpdateUserArgs extends UserArgs {
  @Field(() => ID)
  @IsString()
  @Length(1, 255)
  id: string;
}
