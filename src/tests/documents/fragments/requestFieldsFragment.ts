import { gql } from "apollo-server-express";

export const requestFieldsFragment = gql`
  fragment RequestFields on Request {
    id
    userId
    petId
    status
  }
`;
