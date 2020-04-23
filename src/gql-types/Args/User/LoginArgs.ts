import { ArgsType, Field } from "type-graphql";
import { IsEmail, IsString, Length } from "class-validator";

@ArgsType()
export class LoginArgs {
  @Field()
  @IsEmail()
  @Length(3, 255)
  email: string;

  @Field()
  @IsString()
  @Length(8, 255)
  password: string;
}
