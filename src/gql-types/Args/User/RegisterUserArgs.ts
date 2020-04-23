import { ArgsType, Field } from "type-graphql";
import { UserArgs } from "./UserArgs";
import { IsEmail, IsString, Length } from "class-validator";

@ArgsType()
export class RegisterUserArgs extends UserArgs {
  @Field()
  @IsEmail()
  @Length(3, 255)
  email: string;

  @Field()
  @IsString()
  @Length(8, 255)
  password: string;
}
