import { gql } from "apollo-server-express";
import { userFieldsFragment } from "../fragments/userFieldsFragment";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const meQuery = gql`
  query MeQuery {
    me {
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
