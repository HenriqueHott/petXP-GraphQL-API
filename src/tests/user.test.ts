import fetch from "node-fetch";
import { createTypeormConn } from "../createTypeormConn";
import { client, host } from ".";
import { print } from "graphql";
import { registerMutation } from "./documents/mutations/registerMutation";
import { emailRegistered, invalidLogin, minPasswordLength } from "../constants";
import { FieldError } from "../gql-types/Object/FieldError";
import { loginMutation } from "./documents/mutations/loginMutation";
import { meQuery } from "./documents/queries/meQuery";
import { updateMeMutation } from "./documents/mutations/updateMeMutation";
import {
  registerVariables,
  expectedData,
  badRegisterVariables,
  getShortMessage,
  loginVariables,
  badLoginVariables,
  updateMeVariables,
} from "./utils";

beforeAll(async () => {
  await createTypeormConn();
});

let cookie: string | undefined | null;

describe("register", () => {
  test("refresh access token before", async () => {
    const response = await fetch(`${host}/refresh-access-token`, {
      method: "POST",
    });

    expect(response.ok).toEqual(false);

    const { accessToken } = await response.json();

    expect(accessToken).toBeNull();
  });

  test("normal register", async () => {
    const { data, headers } = await client.rawRequest(
      print(registerMutation),
      registerVariables
    );

    cookie = headers.get("set-cookie");

    expect(cookie).toBeTruthy();

    const { register } = data;

    expect(register.ok).toEqual(true);
    expect(register.errors).toBeNull();
    expect(register.user).toEqual(expect.objectContaining(expectedData));
    expect(register.user.password).toBeUndefined();
    expect(register.accessToken).not.toBeNull();
    client.setHeader("authorization", `Bearer ${register.accessToken}`);
  });

  test("duplicate email", async () => {
    const { register } = await client.request(
      print(registerMutation),
      registerVariables
    );

    expect(register.ok).toEqual(false);
    expect(register.errors).toEqual(
      expect.arrayContaining([
        {
          path: "email",
          message: emailRegistered,
        },
      ])
    );
    expect(register.user).toBeNull();
    expect(register.accessToken).toBeNull();
  });

  test("validation", async () => {
    const { register } = await client.request(
      print(registerMutation),
      badRegisterVariables
    );

    expect(register.ok).toEqual(false);
    expect(register.errors).toEqual(
      expect.arrayContaining<FieldError>([
        {
          path: "name",
          message: getShortMessage("name"),
        },
        {
          path: "email",
          message: getShortMessage("email"),
        },
        {
          path: "email",
          message: "email must be an email",
        },
        {
          path: "password",
          message: getShortMessage("password", minPasswordLength),
        },
        {
          path: "state",
          message: getShortMessage("state"),
        },
        {
          path: "city",
          message: getShortMessage("city"),
        },
      ])
    );
    expect(register.user).toBeNull();
    expect(register.accessToken).toBeNull();
  });

  test("refresh access token after", async () => {
    const response = await fetch(`${host}/refresh-access-token`, {
      method: "POST",
      headers: { cookie: cookie! },
    });

    expect(response.ok).toEqual(true);

    const { accessToken } = await response.json();

    expect(accessToken).not.toBeNull();
  });
});

describe("login", () => {
  test("refresh access token before", async () => {
    const response = await fetch(`${host}/refresh-access-token`, {
      method: "POST",
    });

    expect(response.ok).toEqual(false);

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

    expect(login.ok).toEqual(true);
    expect(login.errors).toBeNull();
    expect(login.user).toEqual(expect.objectContaining(expectedData));
    expect(login.user.password).toBeUndefined();
    expect(login.accessToken).not.toBeNull();
    client.setHeader("authorization", `Bearer ${login.accessToken}`);
  });

  test("invalid password", async () => {
    const { login } = await client.request(print(loginMutation), {
      ...loginVariables,
      password: "0123456789",
    });

    expect(login.ok).toEqual(false);
    expect(login.errors).toEqual(
      expect.arrayContaining([
        {
          path: null,
          message: invalidLogin,
        },
      ])
    );
    expect(login.user).toBeNull();
    expect(login.accessToken).toBeNull();
  });

  test("invalid email", async () => {
    const { login } = await client.request(print(loginMutation), {
      ...loginVariables,
      email: "tom@tom.com",
    });

    expect(login.ok).toEqual(false);
    expect(login.errors).toEqual(
      expect.arrayContaining([
        {
          path: null,
          message: invalidLogin,
        },
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

    expect(login.ok).toEqual(false);
    expect(login.errors).toEqual(
      expect.arrayContaining<FieldError>([
        {
          path: "email",
          message: getShortMessage("email"),
        },
        {
          path: "email",
          message: "email must be an email",
        },
        {
          path: "password",
          message: getShortMessage("password", minPasswordLength),
        },
      ])
    );
    expect(login.user).toBeNull();
    expect(login.accessToken).toBeNull();
  });

  test("refresh access token after", async () => {
    const response = await fetch(`${host}/refresh-access-token`, {
      method: "POST",
      headers: { cookie: cookie! },
    });

    expect(response.ok).toEqual(true);

    const { accessToken } = await response.json();

    expect(accessToken).not.toBeNull();
  });
});

describe("me", () => {
  test("me query", async () => {
    const { me } = await client.request(print(meQuery));

    expect(me).toEqual(expect.objectContaining(expectedData));
    expect(me.password).toBeUndefined();
  });

  test("update me mutation", async () => {
    const { updateMe } = await client.request(
      print(updateMeMutation),
      updateMeVariables
    );

    expect(updateMe.ok).toEqual(true);
    expect(updateMe.errors).toBeNull();
    expect(updateMe.user).toEqual(
      expect.objectContaining({
        ...expectedData,
        ...updateMeVariables,
      })
    );
    expect(updateMe.user.password).toBeUndefined();
  });
});
