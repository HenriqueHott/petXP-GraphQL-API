import { ArgsType, Field } from "type-graphql";
import { IsEmail, IsString, Length } from "class-validator";
import { validationStringLength, minPasswordLength } from "../../../constants";

const { min, max } = validationStringLength;

@ArgsType()
export class LoginArgs {
  @Field()
  @IsEmail()
  @Length(min, max)
  email: string;

  @Field()
  @IsString()
  @Length(minPasswordLength, max)
  password: string;
}
