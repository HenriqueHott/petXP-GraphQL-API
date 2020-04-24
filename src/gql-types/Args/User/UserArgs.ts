import { ArgsType, Field } from "type-graphql";
import { IsString, Length } from "class-validator";
import { validationStringLength } from "../../../constants";

@ArgsType()
export class UserArgs {
  @Field()
  @IsString()
  @Length(validationStringLength.min, validationStringLength.max)
  name: string;

  @Field()
  @IsString()
  @Length(validationStringLength.min, validationStringLength.max)
  state: string;

  @Field()
  @IsString()
  @Length(validationStringLength.min, validationStringLength.max)
  city: string;
}
