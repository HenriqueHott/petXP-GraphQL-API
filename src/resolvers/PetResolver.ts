import { Resolver, Query, Mutation, Args, Arg, ID } from "type-graphql";
import { Pet } from "../entities/Pet";
import { CreatePetArgs } from "../types/Pet/CreatePetArgs";
import { UpdatePetArgs } from "../types/Pet/UpdatePetArgs";

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
    await Pet.update({ id: pet.id }, args);

    return pet;
  }

  @Mutation(() => Boolean)
  async deletePet(@Arg("id", () => ID) id: string): Promise<boolean> {
    try {
      await Pet.delete(id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
