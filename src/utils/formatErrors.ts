import { FieldError } from "../gql-types/Object/FieldError";
import { ValidationError } from "class-validator";

export const formatErrors = (validationErrors: ValidationError[]) => {
  const errors: FieldError[] = [];

  validationErrors.forEach(error => {
    Object.values(error.constraints).forEach(err => {
      errors.push({ path: error.property, message: err });
    });
  });

  return errors;
};
