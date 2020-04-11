import { ArgsType, Field, ID } from "type-graphql";
import { IsString, Length, IsEnum } from "class-validator";
import { RequestStatusInput } from "../../entities/Request";

@ArgsType()
export class UpdateRequestArgs {
  @Field(() => ID)
  @IsString()
  @Length(1, 255)
  id: string;

  @Field(() => RequestStatusInput)
  @IsEnum(RequestStatusInput)
  status: RequestStatusInput;
}
