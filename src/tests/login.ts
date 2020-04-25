import { client } from ".";
import { invalidLogin, minPasswordLength } from "../constants";
import { FieldError } from "../gql-types/Object/FieldError";
import {
  loginVariables,
  expectedData,
  badLoginVariables,
  getShortMessage
} from "./utils";

export const loginModule = () => {
  test("refresh access token before", async () => {
    client.setCookie(null);
    const response = await client.refreshAccessToken();

    expect(response.ok).toBe(false);

    const { accessToken } = await response.json();

    expect(accessToken).toBeNull();
  });

  test("normal login", async () => {
    const {
      data: { login },
      headers
    } = await client.rawLogin(loginVariables);

    const cookie = headers.get("set-cookie");

    expect(cookie).toBeTruthy();

    client.setCookie(cookie);

    expect(login.ok).toBe(true);
    expect(login.errors).toBeNull();
    expect(login.user).toEqual(expect.objectContaining(expectedData));
    expect(login.user.password).toBeUndefined();
    expect(login.accessToken).not.toBeNull();
  });

  test("invalid password", async () => {
    const { login } = await client.login({
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
    const { login } = await client.login({
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
    const { login } = await client.login(badLoginVariables);

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
    const response = await client.refreshAccessToken();

    expect(response.ok).toBe(true);

    const { accessToken } = await response.json();

    expect(accessToken).not.toBeNull();
  });
};
