import { ArgsType, Field } from "type-graphql";
import { UserArgs } from "./UserArgs";
import { IsEmail, IsString, Length } from "class-validator";
import { validationStringLength, minPasswordLength } from "../../../constants";

const { min, max } = validationStringLength;

@ArgsType()
export class RegisterUserArgs extends UserArgs {
  @Field()
  @IsEmail()
  @Length(min, max)
  email: string;

  @Field()
  @IsString()
  @Length(minPasswordLength, max)
  password: string;
}
