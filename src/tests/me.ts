import { client } from ".";
import { expectedData } from "./utils";

export const meModule = () => {
  test("query", async () => {
    const { me } = await client.me();

    expect(me).toEqual(expect.objectContaining(expectedData));
    expect(me.password).toBeUndefined();
  });

  test("expect error with wrong authorization header", async () => {
    client.setAuthHeader(null);
    await expect(client.me()).rejects.toThrow();
  });
};
