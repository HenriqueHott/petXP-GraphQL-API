import "dotenv/config";
import { gql } from "apollo-server-express";
import { client } from "./client";
import { print } from "graphql";

const registerMutation = gql`
  mutation Register(
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
        path
        message
      }
      user {
        id
        name
        email
        state
        city
        createdAt
        updatedAt
        pets {
          id
        }
        requests {
          id
        }
      }
      accessToken
    }
  }
`;

const variables = {
  name: "Bob",
  email: "bob@bob.com",
  password: "bob0123456789",
  state: "California",
  city: "Los Angeles"
};

describe("register", () => {
  test("normal register", async () => {
    const { register } = await client.request(
      print(registerMutation),
      variables
    );

    expect(register.ok).toEqual(true);
    expect(register.errors).toBeNull();
    expect(register.user).not.toBeNull();
    expect(register.accessToken).not.toBeNull();
  });

  test("duplicate email", async () => {
    const { register } = await client.request(
      print(registerMutation),
      variables
    );

    expect(register.ok).toEqual(false);
    expect(register.errors).not.toBeNull();
    expect(register.user).toBeNull();
    expect(register.accessToken).toBeNull();
  });
});
