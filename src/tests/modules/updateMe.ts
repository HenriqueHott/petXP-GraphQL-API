import { client } from "..";
import { FieldError } from "../../gql-types/Object/FieldError";
import {
  updateMeVariables,
  expectedData,
  badUpdateMeVariables,
  getShortMessage
} from "../utils";
import { notAuthenticated } from "../../constants";

export const updateMeModule = () => {
  test("mutation", async () => {
    const { updateMe } = await client.updateMe(updateMeVariables);

    expect(updateMe.ok).toBe(true);
    expect(updateMe.errors).toBeNull();
    expect(updateMe.user).toEqual(
      expect.objectContaining({
        ...expectedData,
        ...updateMeVariables
      })
    );
    expect(updateMe.user!.password).toBeUndefined();
  });

  test("validation", async () => {
    const { updateMe } = await client.updateMe(badUpdateMeVariables);

    expect(updateMe.ok).toBe(false);
    expect(updateMe.errors).toEqual(
      expect.arrayContaining<FieldError>([
        {
          path: "name",
          message: getShortMessage("name")
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
    expect(updateMe.user).toBeNull();
  });

  test("expect error with wrong authorization header", async () => {
    client.setAuthHeader(null);
    const { updateMe } = await client.updateMe(updateMeVariables);

    expect(updateMe.ok).toBe(false);
    expect(updateMe.errors).toEqual([
      {
        path: null,
        message: notAuthenticated
      }
    ]);
    expect(updateMe.user).toBeNull();
  });
};
