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

const { min, max } = validationStringLength;

@ArgsType()
export class CreatePetArgs {
  @Field()
  @IsString()
  @Length(min, max)
  name: string;

  @Field()
  @IsString()
  @Length(min, max)
  type: string;

  @Field()
  @IsString()
  @Length(min, max)
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
