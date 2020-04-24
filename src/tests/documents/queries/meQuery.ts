import { gql } from "apollo-server-express";
import { userFieldsFragment } from "../fragments/userFieldsFragment";

export const meQuery = gql`
  query MeQuery {
    me {
      ...UserFields
    }
  }

  ${userFieldsFragment}
`;
