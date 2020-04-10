import { ArgsType, Field, Int } from "type-graphql";
import {
  IsString,
  Length,
  IsNumber,
  IsPositive,
  IsInt,
  IsOptional
} from "class-validator";

@ArgsType()
export class CreatePetArgs {
  @Field()
  @IsString()
  @Length(1, 255)
  name: string;

  @Field()
  @IsString()
  @Length(1, 255)
  type: string;

  @Field()
  @IsString()
  @Length(1, 255)
  breed: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  age: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight: number | null;
}
