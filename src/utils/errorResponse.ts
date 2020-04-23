import { FieldError } from "../gql-types/Object/FieldError";
import { ResolverResponse } from "../gql-types/Object/Response";

export const errorResponse = (errors: FieldError[]): ResolverResponse => ({
  ok: false,
  errors
});
