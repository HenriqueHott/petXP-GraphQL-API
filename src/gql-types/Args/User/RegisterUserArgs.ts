import { ArgsType, Field } from "type-graphql";
import { UserArgs } from "./UserArgs";
import { IsEmail, IsString, Length } from "class-validator";
import { validationStringLength, minPasswordLength } from "../../../constants";

@ArgsType()
export class RegisterUserArgs extends UserArgs {
  @Field()
  @IsEmail()
  @Length(validationStringLength.min, validationStringLength.max)
  email: string;

  @Field()
  @IsString()
  @Length(minPasswordLength, validationStringLength.max)
  password: string;
}
