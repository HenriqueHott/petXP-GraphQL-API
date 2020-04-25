import { client } from ".";
import { print } from "graphql";
import { meQuery } from "./documents/queries/meQuery";
import { expectedData } from "./utils";

export const meModule = () => {
  test("query", async () => {
    const { me } = await client.request(print(meQuery));

    expect(me).toEqual(expect.objectContaining(expectedData));
    expect(me.password).toBeUndefined();
  });
};
