import { gql } from "apollo-server-express";
import { userFieldsFragment } from "../fragments/userFieldsFragment";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
