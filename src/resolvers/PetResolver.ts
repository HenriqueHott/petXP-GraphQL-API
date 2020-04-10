import { Resolver, Query } from "type-graphql";
import { Pet } from "../entities/Pet";

@Resolver(Pet)
export class PetResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return "Hello World";
  }
}
