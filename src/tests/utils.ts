import { RegisterUserArgs } from "../gql-types/Args/User/RegisterUserArgs";
import { LoginArgs } from "../gql-types/Args/User/LoginArgs";
import { UserArgs } from "../gql-types/Args/User/UserArgs";
import { validationStringLength } from "../constants";

export const getShortMessage = (
  key: keyof RegisterUserArgs,
  length: number = validationStringLength.min
) => `${key} must be longer than or equal to ${length} characters`;

export const expectedData: Omit<RegisterUserArgs, "password"> = {
  name: "Bob",
  email: "bob@bob.com",
  state: "California",
  city: "Los Angeles"
};

export const loginVariables: LoginArgs = {
  email: expectedData.email,
  password: "bob0123456789"
};

export const registerVariables: RegisterUserArgs = {
  ...expectedData,
  ...loginVariables
};

export const badLoginVariables: LoginArgs = {
  email: "bo",
  password: "123456"
};

export const badRegisterVariables: RegisterUserArgs = {
  name: "yo",
  ...badLoginVariables,
  city: "12",
  state: ":)"
};

export const updateMeVariables: UserArgs = {
  name: "Tom",
  state: "Florida",
  city: "Orlando"
};
