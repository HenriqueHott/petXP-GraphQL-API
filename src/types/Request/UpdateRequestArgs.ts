import { ArgsType, Field, ID, registerEnumType } from "type-graphql";
import { IsUUID, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { RequestStatus } from "../../entities/Request";

enum RequestStatusInput {
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED"
}

registerEnumType(RequestStatusInput, {
  name: "RequestStatus",
  description: "Request status options"
});

@ArgsType()
export class UpdateRequestArgs {
  @Field(() => ID)
  @IsUUID("4")
  id: string;

  @Field(() => RequestStatusInput)
  @IsEnum(RequestStatusInput)
  status: Exclude<RequestStatus, "PENDING">;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1)
  cancelReason?: string | null;
}
