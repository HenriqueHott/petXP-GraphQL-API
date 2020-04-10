import { ArgsType, Field, ID } from "type-graphql";
import { CreatePetArgs } from "./CreatePetArgs";
import { IsString, Length } from "class-validator";

@ArgsType()
export class UpdatePetArgs extends CreatePetArgs {
  @Field(() => ID)
  @IsString()
  @Length(1, 255)
  id: string;
}
