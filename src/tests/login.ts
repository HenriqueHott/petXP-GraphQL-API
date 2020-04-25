import { host, client } from ".";
import { print } from "graphql";
import { loginMutation } from "./documents/mutations/loginMutation";
import { invalidLogin, minPasswordLength } from "../constants";
import { FieldError } from "../gql-types/Object/FieldError";
import {
  loginVariables,
  expectedData,
  badLoginVariables,
  getShortMessage
} from "./utils";

let cookie: string | undefined | null;

export const loginModule = () => {
  test("refresh access token before", async () => {
    const response = await fetch(`${host}/refresh-access-token`, {
      method: "POST"
    });

    expect(response.ok).toBe(false);

    const { accessToken } = await response.json();

    expect(accessToken).toBeNull();
  });

  test("normal login", async () => {
    const { data, headers } = await client.rawRequest(
      print(loginMutation),
      loginVariables
    );

    cookie = headers.get("set-cookie");

    expect(cookie).toBeTruthy();

    const { login } = data;

    expect(login.ok).toBe(true);
    expect(login.errors).toBeNull();
    expect(login.user).toEqual(expect.objectContaining(expectedData));
    expect(login.user.password).toBeUndefined();
    expect(login.accessToken).not.toBeNull();
    client.setHeader("authorization", `Bearer ${login.accessToken}`);
  });

  test("invalid password", async () => {
    const { login } = await client.request(print(loginMutation), {
      ...loginVariables,
      password: "0123456789"
    });

    expect(login.ok).toBe(false);
    expect(login.errors).toEqual(
      expect.arrayContaining([
        {
          path: null,
          message: invalidLogin
        }
      ])
    );
    expect(login.user).toBeNull();
    expect(login.accessToken).toBeNull();
  });

  test("invalid email", async () => {
    const { login } = await client.request(print(loginMutation), {
      ...loginVariables,
      email: "tom@tom.com"
    });

    expect(login.ok).toBe(false);
    expect(login.errors).toEqual(
      expect.arrayContaining([
        {
          path: null,
          message: invalidLogin
        }
      ])
    );
    expect(login.user).toBeNull();
    expect(login.accessToken).toBeNull();
  });

  test("validation", async () => {
    const { login } = await client.request(
      print(loginMutation),
      badLoginVariables
    );

    expect(login.ok).toBe(false);
    expect(login.errors).toEqual(
      expect.arrayContaining<FieldError>([
        {
          path: "email",
          message: getShortMessage("email")
        },
        {
          path: "email",
          message: "email must be an email"
        },
        {
          path: "password",
          message: getShortMessage("password", minPasswordLength)
        }
      ])
    );
    expect(login.user).toBeNull();
    expect(login.accessToken).toBeNull();
  });

  test("refresh access token after", async () => {
    const response = await fetch(`${host}/refresh-access-token`, {
      method: "POST",
      headers: { cookie: cookie! }
    });

    expect(response.ok).toBe(true);

    const { accessToken } = await response.json();

    expect(accessToken).not.toBeNull();
  });
};
