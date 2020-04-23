import { ArgsType, Field } from "type-graphql";
import { IsString, Length } from "class-validator";

@ArgsType()
export abstract class UserArgs {
  @Field()
  @IsString()
  @Length(1, 255)
  name: string;

  @Field()
  @IsString()
  @Length(1, 255)
  state: string;

  @Field()
  @IsString()
  @Length(1, 255)
  city: string;
}
