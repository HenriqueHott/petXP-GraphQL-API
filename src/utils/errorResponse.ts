import { FieldError } from "../gql-types/Object/FieldError";
import { IErrorResponse } from "../resolvers/types";

export const errorResponse = (errors: FieldError[]): IErrorResponse => ({
  ok: false,
  errors
});
