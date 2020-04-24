import "dotenv/config";
import { createTypeormConn } from "../createTypeormConn";
import { client, host } from ".";
import { print } from "graphql";
import { registerMutation } from "./documents/mutations/registerMutation";
import { loginMutation } from "./documents/mutations/loginMutation";
import { meQuery } from "./documents/queries/meQuery";
import { updateMeMutation } from "./documents/mutations/updateMeMutation";
import fetch from "node-fetch";

const loginVariables = {
  email: "bob@bob.com",
  password: "bob0123456789"
};

const registerVariables = {
  name: "Bob",
  ...loginVariables,
  state: "California",
  city: "Los Angeles"
};

const updateMeVariables = {
  name: "Tom",
  state: "Florida",
  city: "Orlando"
};

beforeAll(async () => {
  await createTypeormConn();
});

let cookie: string | undefined | null;

describe("register and login", () => {
  test("refresh access token before login", async () => {
    const response = await fetch(`${host}/refresh-access-token`, {
      method: "POST"
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

    expect(cookie).toBeDefined();

    const { register } = data;

    expect(register.ok).toEqual(true);
    expect(register.errors).toBeNull();
    expect(register.user).not.toBeNull();
    expect(register.accessToken).not.toBeNull();
    client.setHeader("authorization", `Bearer ${register.accessToken}`);
  });

  test("duplicate email", async () => {
    const { register } = await client.request(
      print(registerMutation),
      registerVariables
    );

    expect(register.ok).toEqual(false);
    expect(register.errors).not.toBeNull();
    expect(register.user).toBeNull();
    expect(register.accessToken).toBeNull();
  });

  test("login", async () => {
    const { login } = await client.request(
      print(loginMutation),
      loginVariables
    );

    expect(login.ok).toEqual(true);
    expect(login.errors).toBeNull();
    expect(login.user).not.toBeNull();
    expect(login.user.email).toEqual(loginVariables.email);
    expect(login.accessToken).not.toBeNull();
  });

  test("refresh access token after login", async () => {
    const response = await fetch(`${host}/refresh-access-token`, {
      method: "POST",
      headers: { cookie: cookie! }
    });

    expect(response.ok).toEqual(true);

    const { accessToken } = await response.json();

    expect(accessToken).not.toBeNull();
  });

  test("me query", async () => {
    const { me } = await client.request(print(meQuery));

    expect(me.name).toEqual(registerVariables.name);
    expect(me.state).toEqual(registerVariables.state);
    expect(me.city).toEqual(registerVariables.city);
  });

  test("update me mutation", async () => {
    const { updateMe } = await client.request(
      print(updateMeMutation),
      updateMeVariables
    );

    expect(updateMe.ok).toEqual(true);
    expect(updateMe.errors).toBeNull();
    expect(updateMe.user).not.toBeNull();
    expect(updateMe.user.name).toEqual(updateMeVariables.name);
    expect(updateMe.user.state).toEqual(updateMeVariables.state);
    expect(updateMe.user.city).toEqual(updateMeVariables.city);
  });
});
