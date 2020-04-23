import { ArgsType, Field } from "type-graphql";
import { UserArgs } from "./UserArgs";
import { IsString, Length, IsEmail } from "class-validator";

@ArgsType()
export class CreateUserArgs extends UserArgs {
  @Field()
  @IsString()
  @Length(1, 255)
  password: string;

  @Field()
  @IsEmail()
  @Length(1, 255)
  email: string;
}
