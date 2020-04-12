import { Resolver, Query, Mutation, Args, Arg, ID } from "type-graphql";
import { Request } from "../entities/Request";
import { CreateRequestArgs } from "../types/Request/CreateRequestArgs";
import { UpdateRequestArgs } from "../types/Request/UpdateRequestArgs";
import { User } from "../entities/User";
import { Pet } from "../entities/Pet";

const relations: string[] = ["user", "pet"];

@Resolver(Request)
export class RequestResolver {
  @Query(() => [Request])
  async requests(): Promise<Request[]> {
    return await Request.find({ relations });
  }

  @Mutation(() => Request)
  async createRequest(@Args() args: CreateRequestArgs): Promise<Request> {
    const request = Request.create(args);
    const [user, pet] = await Promise.all([
      User.findOne({ where: { id: request.userId } }),
      Pet.findOne({ where: { id: request.petId } }),
      request.save()
    ]);

    Object.assign(request, { user, pet });
    return request;
  }

  @Mutation(() => Request)
  async updateRequest(
    @Args() { id, status }: UpdateRequestArgs
  ): Promise<Request> {
    const request = await Request.findOne({ where: { id }, relations });
    if (!request) throw new Error("Could not find request");

    if (request.locked) throw new Error("Request is already done");

    const toUpdate: Partial<Request> = {
      status,
      locked: true
    };

    if (status === "COMPLETED") {
      toUpdate.completedAt = new Date();

      await Pet.update({ id: request.petId }, { ownerId: request.userId });
    }

    Object.assign(request, toUpdate);
    await Request.update({ id: request.id }, toUpdate);

    return request;
  }

  @Mutation(() => Boolean)
  async deleteRequest(@Arg("id", () => ID) id: string): Promise<boolean> {
    try {
      await Request.delete(id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
