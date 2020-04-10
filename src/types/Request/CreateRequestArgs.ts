import { ArgsType, Field } from "type-graphql";
import { IsString, Length } from "class-validator";

@ArgsType()
export class CreateRequestArgs {
  @Field()
  @IsString()
  @Length(1, 255)
  userId: string;

  @Field()
  @IsString()
  @Length(1, 255)
  petId: string;
}
