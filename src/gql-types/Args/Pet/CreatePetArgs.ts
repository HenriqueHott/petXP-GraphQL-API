import { ArgsType, Field, Int } from "type-graphql";
import {
  IsString,
  Length,
  IsNumber,
  IsPositive,
  IsInt,
  IsOptional
} from "class-validator";
import { validationStringLength } from "../../../constants";

@ArgsType()
export class CreatePetArgs {
  @Field()
  @IsString()
  @Length(validationStringLength.min, validationStringLength.max)
  name: string;

  @Field()
  @IsString()
  @Length(validationStringLength.min, validationStringLength.max)
  type: string;

  @Field()
  @IsString()
  @Length(validationStringLength.min, validationStringLength.max)
  breed: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  age: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number | null;
}
