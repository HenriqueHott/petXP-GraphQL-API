import fetch, { Response } from "node-fetch";
import { AccessToken } from "../types";
import { UserResponse } from "../gql-types/Object/User/UserResponse";
import { RegisterLoginResponse } from "../gql-types/Object/User/RegisterLoginResponse";
import { GraphQLClient } from "graphql-request";
import { RegisterUserArgs } from "../gql-types/Args/User/RegisterUserArgs";
import { print } from "graphql";
import { registerMutation } from "./documents/mutations/registerMutation";
import { LoginArgs } from "../gql-types/Args/User/LoginArgs";
import { loginMutation } from "./documents/mutations/loginMutation";
import { meQuery } from "./documents/queries/meQuery";
import { UserArgs } from "../gql-types/Args/User/UserArgs";
import { updateMeMutation } from "./documents/mutations/updateMeMutation";

type Token = string | null | undefined;

interface RefreshAccessTokenResponse extends Response {
  json(): Promise<{ accessToken: AccessToken }>;
}

type ClientUserResponse<T extends "me" | "updateMe"> = {
  [K in T]: Required<UserResponse>;
};

type ClientRegisterLoginResponse<T extends "login" | "register"> = {
  [K in T]: Required<RegisterLoginResponse>;
};

export class TestClient {
  private client: GraphQLClient;
  private cookie: Token;
  private accessToken: Token;

  constructor(private host: string) {
    this.client = new GraphQLClient(`${host}/graphql`);
  }

  setAuthHeader(accessToken = this.accessToken) {
    this.client.setHeader(
      "authorization",
      `Bearer ${accessToken || "no-token"}`
    );
  }

  setCookie(cookie: Token) {
    this.cookie = cookie;
  }

  refreshAccessToken(): Promise<RefreshAccessTokenResponse> {
    return fetch(`${this.host}/refresh-access-token`, {
      method: "POST",
      headers: this.cookie ? { cookie: this.cookie } : undefined
    });
  }

  async rawRegister(variables: RegisterUserArgs) {
    const response = await this.client.rawRequest<
      ClientRegisterLoginResponse<"register">
    >(print(registerMutation), variables);

    this.accessToken = response.data!.register.accessToken;
    this.setAuthHeader();

    return response;
  }

  register(variables: RegisterUserArgs) {
    return this.client.request<ClientRegisterLoginResponse<"register">>(
      print(registerMutation),
      variables
    );
  }

  async rawLogin(variables: LoginArgs) {
    const response = await this.client.rawRequest<
      ClientRegisterLoginResponse<"login">
    >(print(loginMutation), variables);

    this.accessToken = response.data!.login.accessToken;
    this.setAuthHeader();

    return response;
  }

  login(variables: LoginArgs) {
    return this.client.request<ClientRegisterLoginResponse<"login">>(
      print(loginMutation),
      variables
    );
  }

  me() {
    return this.client.request<ClientUserResponse<"me">>(print(meQuery));
  }

  updateMe(variables: UserArgs) {
    return this.client.request<ClientUserResponse<"updateMe">>(
      print(updateMeMutation),
      variables
    );
  }
}
