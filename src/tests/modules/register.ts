import { client } from "..";
import { emailRegistered, minPasswordLength } from "../../constants";
import { FieldError } from "../../gql-types/Object/FieldError";
import {
  registerVariables,
  expectedData,
  badRegisterVariables,
  getShortMessage
} from "../utils";

export const registerModule = () => {
  test("refresh access token before", async () => {
    client.setCookie(null);
    const response = await client.refreshAccessToken();

    expect(response.ok).toBe(false);

    const { accessToken } = await response.json();

    expect(accessToken).toBeNull();
  });

  test("normal register", async () => {
    const { data, headers } = await client.rawRegister(registerVariables);

    const cookie = headers.get("set-cookie");

    expect(cookie).toBeTruthy();

    client.setCookie(cookie);

    const { register } = data!;

    expect(register.ok).toBe(true);
    expect(register.errors).toBeNull();
    expect(register.user).toEqual(expect.objectContaining(expectedData));
    expect(register.user!.password).toBeUndefined();
    expect(register.accessToken).not.toBeNull();
  });

  test("duplicate email", async () => {
    const { register } = await client.register(registerVariables);

    expect(register.ok).toBe(false);
    expect(register.errors).toEqual(
      expect.arrayContaining([
        {
          path: "email",
          message: emailRegistered
        }
      ])
    );
    expect(register.user).toBeNull();
    expect(register.accessToken).toBeNull();
  });

  test("validation", async () => {
    const { register } = await client.register(badRegisterVariables);

    expect(register.ok).toBe(false);
    expect(register.errors).toEqual(
      expect.arrayContaining<FieldError>([
        {
          path: "name",
          message: getShortMessage("name")
        },
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
        },
        {
          path: "state",
          message: getShortMessage("state")
        },
        {
          path: "city",
          message: getShortMessage("city")
        }
      ])
    );
    expect(register.user).toBeNull();
    expect(register.accessToken).toBeNull();
  });

  test("refresh access token after", async () => {
    const response = await client.refreshAccessToken();

    expect(response.ok).toBe(true);

    const { accessToken } = await response.json();

    expect(accessToken).not.toBeNull();
  });
};
