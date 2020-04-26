import { FieldError } from "../gql-types/Object/FieldError";
import { User } from "../entities/User";

export interface IErrorResponse {
  ok: false;
  errors: FieldError[];
}

export interface IGoodResponse {
  ok: true;
}

export type IResolverResponse<T extends IGoodResponse> = IErrorResponse | T;

export interface IUserResponse extends IGoodResponse {
  user: User;
}

export interface IRegisterLoginResponse extends IUserResponse {
  accessToken: string;
}
