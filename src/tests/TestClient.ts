import fetch, { Response } from "node-fetch";
import { AccessToken } from "../types";
import { UserResponse } from "../gql-types/Object/User/UserResponse";
import { RegisterLoginResponse } from "../gql-types/Object/User/RegisterLoginResponse";
import { GraphQLClient } from "graphql-request";
import { refreshAccessTokenEndpoint } from "../constants";
import { RegisterUserArgs } from "../gql-types/Args/User/RegisterUserArgs";
import { print } from "graphql";
import { registerMutation } from "./documents/mutations/registerMutation";
import { LoginArgs } from "../gql-types/Args/User/LoginArgs";
import { loginMutation } from "./documents/mutations/loginMutation";
import { meQuery } from "./documents/queries/meQuery";
import { UserArgs } from "../gql-types/Args/User/UserArgs";
import { updateMeMutation } from "./documents/mutations/updateMeMutation";

interface RefreshAccessTokenResponse extends Response {
  json(): Promise<{ accessToken: AccessToken }>;
}

type ClientUserResponse<K extends "me" | "updateMe"> = Record<
  K,
  Required<UserResponse>
>;

type ClientRegisterLoginResponse<K extends "login" | "register"> = Record<
  K,
  Required<RegisterLoginResponse>
>;

export class TestClient {
  private readonly client: GraphQLClient;
  private cookie: AccessToken = null;
  private accessToken: AccessToken = null;

  constructor(private host: string) {
    this.client = new GraphQLClient(`${host}/graphql`);
  }

  setAuthHeader(accessToken = this.accessToken) {
    this.client.setHeader(
      "authorization",
      `Bearer ${accessToken || "no-token"}`
    );
  }

  setCookie(cookie: AccessToken) {
    this.cookie = cookie;
  }

  refreshAccessToken(): Promise<RefreshAccessTokenResponse> {
    return fetch(this.host + refreshAccessTokenEndpoint, {
      method: "POST",
      headers: this.cookie ? { cookie: this.cookie } : undefined
    });
  }

  async rawRegister(variables: RegisterUserArgs) {
    const res = await this.client.rawRequest<
      ClientRegisterLoginResponse<"register">
    >(print(registerMutation), variables);

    this.accessToken = res.data!.register.accessToken;
    this.setAuthHeader();

    return res;
  }

  register(variables: RegisterUserArgs) {
    return this.client.request<ClientRegisterLoginResponse<"register">>(
      print(registerMutation),
      variables
    );
  }

  async rawLogin(variables: LoginArgs) {
    const res = await this.client.rawRequest<
      ClientRegisterLoginResponse<"login">
    >(print(loginMutation), variables);

    this.accessToken = res.data!.login.accessToken;
    this.setAuthHeader();

    return res;
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
