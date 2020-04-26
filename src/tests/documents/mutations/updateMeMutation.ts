import { gql } from "apollo-server-express";
import { userFieldsFragment } from "../fragments/userFieldsFragment";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const updateMeMutation = gql`
  mutation UpdateMeMutation($name: String!, $state: String!, $city: String!) {
    updateMe(name: $name, state: $state, city: $city) {
      ok
      errors {
        ...ErrorFields
      }
      user {
        ...UserFields
      }
    }
  }

  ${errorFieldsFragment}
  ${userFieldsFragment}
`;
