import { ArgsType, Field } from "type-graphql";
import { IsString, Length } from "class-validator";

@ArgsType()
export class UserArgs {
  @Field()
  @IsString()
  @Length(3, 255)
  name: string;

  @Field()
  @IsString()
  @Length(3, 255)
  state: string;

  @Field()
  @IsString()
  @Length(3, 255)
  city: string;
}
