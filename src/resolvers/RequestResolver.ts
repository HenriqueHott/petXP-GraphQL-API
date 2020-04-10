import { Resolver, Query } from "type-graphql";
import { Request } from "../entities/Request";

@Resolver(Request)
export class RequestResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return "Hello World";
  }
}
