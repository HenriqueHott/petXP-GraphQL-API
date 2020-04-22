import { ArgsType, Field, ID } from "type-graphql";
import { CreatePetArgs } from "./CreatePetArgs";
import { IsUUID } from "class-validator";

@ArgsType()
export class UpdatePetArgs extends CreatePetArgs {
  @Field(() => ID)
  @IsUUID("4")
  id: string;
}
