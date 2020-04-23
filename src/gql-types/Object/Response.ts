import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType({ isAbstract: true })
export abstract class Response {
  @Field()
  ok: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[] | null;
}
