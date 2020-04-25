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
  email: "bob@constructor.com",
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

export const updateMeVariables: UserArgs = {
  name: "Bob, o construtor",
  state: "Florida",
  city: "Orlando"
};

const sliceStart = -2;

export const badLoginVariables: LoginArgs = {
  email: loginVariables.email.slice(sliceStart),
  password: loginVariables.password.slice(sliceStart)
};

export const badRegisterVariables: RegisterUserArgs = {
  ...badLoginVariables,
  name: registerVariables.name.slice(sliceStart),
  city: registerVariables.city.slice(sliceStart),
  state: registerVariables.state.slice(sliceStart)
};

export const badUpdateMeVariables: UserArgs = {
  name: updateMeVariables.name.slice(sliceStart),
  state: updateMeVariables.state.slice(sliceStart),
  city: updateMeVariables.city.slice(sliceStart)
};
