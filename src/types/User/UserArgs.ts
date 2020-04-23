import { ArgsType, Field } from "type-graphql";
import { IsString, Length, IsEmail } from "class-validator";

@ArgsType()
export abstract class UserArgs {
  @Field()
  @IsString()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @Field()
  @IsString()
  @Length(1, 255)
  state: string;

  @Field()
  @IsString()
  @Length(1, 255)
  city: string;
}
