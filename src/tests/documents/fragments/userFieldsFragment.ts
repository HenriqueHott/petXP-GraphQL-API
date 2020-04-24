import { gql } from "apollo-server-express";
import { petFieldsFragment } from "./petFieldsFragment";
import { requestFieldsFragment } from "./requestFieldsFragment";

export const userFieldsFragment = gql`
  fragment UserFields on User {
    id
    name
    email
    state
    city
    pets {
      ...PetFields
    }
    requests {
      ...RequestFields
    }
  }

  ${petFieldsFragment}
  ${requestFieldsFragment}
`;
