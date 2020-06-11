import { ValidationError } from "class-validator";
import { FieldError } from "../gql-types/Object/FieldError";

export const formatErrors = (
  validationErrors: ValidationError[]
): FieldError[] =>
  validationErrors.reduce<FieldError[]>(
    (errors, { constraints, property: path }) => {
      Object.values(constraints).forEach(message => {
        errors.push({ path, message });
      });

      return errors;
    },
    []
  );
