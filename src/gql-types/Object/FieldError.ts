import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field(() => String, { nullable: true })
  path?: string | null;

  @Field()
  message: string;
}
