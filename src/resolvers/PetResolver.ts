import { Resolver, Query, Mutation, Args } from "type-graphql";
import { Pet } from "../entities/Pet";
import { CreatePetArgs } from "../gql-types/Args/Pet/CreatePetArgs";
import { UpdatePetArgs } from "../gql-types/Args/Pet/UpdatePetArgs";

const relations: string[] = ["owner", "requests"];

@Resolver(Pet)
export class PetResolver {
  @Query(() => [Pet])
  async pets(): Promise<Pet[]> {
    return await Pet.find({ relations });
  }

  @Mutation(() => Pet)
  async createPet(@Args() args: CreatePetArgs): Promise<Pet> {
    const pet = await Pet.create(args).save();
    Object.assign(pet, { user: null, requests: [] });

    return pet;
  }

  @Mutation(() => Pet)
  async updatePet(@Args() { id, ...args }: UpdatePetArgs): Promise<Pet> {
    const pet = await Pet.findOne({ where: { id }, relations });
    if (!pet) throw new Error("Could not find pet");

    Object.assign(pet, args);
    return await pet.save();
  }
}
