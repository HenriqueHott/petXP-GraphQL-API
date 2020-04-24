import { gql } from "apollo-server-express";
import { userFieldsFragment } from "../fragments/userFieldsFragment";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const registerMutation = gql`
  mutation RegisterMutation(
    $name: String!
    $email: String!
    $password: String!
    $state: String!
    $city: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
      state: $state
      city: $city
    ) {
      ok
      errors {
        ...ErrorFields
      }
      user {
        ...UserFields
      }
      accessToken
    }
  }

  ${userFieldsFragment}
  ${errorFieldsFragment}
`;
