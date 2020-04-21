import { ArgsType, Field } from "type-graphql";
import { IsString, Length, IsEmail, IsOptional } from "class-validator";

@ArgsType()
export abstract class UserArgs {
  @Field()
  @IsString()
  @Length(1, 255)
  name: string;

  @Field()
  @IsString()
  @Length(1, 255)
  surname: string;

  @Field()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  address?: string | null;
}
