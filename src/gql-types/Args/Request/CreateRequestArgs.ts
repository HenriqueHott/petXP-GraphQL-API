import { ArgsType, Field } from "type-graphql";
import { IsUUID } from "class-validator";

@ArgsType()
export class CreateRequestArgs {
  @Field()
  @IsUUID("4")
  userId: string;

  @Field()
  @IsUUID("4")
  petId: string;
}
