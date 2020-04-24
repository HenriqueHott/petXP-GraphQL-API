import { gql } from "apollo-server-express";

export const errorFieldsFragment = gql`
  fragment ErrorFields on FieldError {
    path
    message
  }
`;
