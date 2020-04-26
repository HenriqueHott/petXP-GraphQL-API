import { client } from ".";
import { expectedData } from "./utils";
import { notAuthenticated } from "../constants";

export const meModule = () => {
  test("query", async () => {
    const { me } = await client.me();

    expect(me.ok).toBe(true);
    expect(me.errors).toBeNull();
    expect(me.user).toEqual(expect.objectContaining(expectedData));
    expect(me.user.password).toBeUndefined();
  });

  test("expect error with wrong authorization header", async () => {
    client.setAuthHeader(null);
    const { me } = await client.me();

    expect(me.ok).toBe(false);
    expect(me.errors).toEqual([
      {
        path: null,
        message: notAuthenticated
      }
    ]);
    expect(me.user).toBeNull();
  });
};
