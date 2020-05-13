import { ArgsType, Field } from "type-graphql";
import { IsString, Length } from "class-validator";
import { validationStringLength } from "../../../constants";

const { min, max } = validationStringLength;

@ArgsType()
export class UserArgs {
  @Field()
  @IsString()
  @Length(min, max)
  name: string;

  @Field()
  @IsString()
  @Length(min, max)
  state: string;

  @Field()
  @IsString()
  @Length(min, max)
  city: string;
}
