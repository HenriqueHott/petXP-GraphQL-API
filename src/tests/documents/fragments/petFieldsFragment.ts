import { gql } from "apollo-server-express";

export const petFieldsFragment = gql`
  fragment PetFields on Pet {
    id
    name
    type
    breed
    age
    weight
  }
`;
