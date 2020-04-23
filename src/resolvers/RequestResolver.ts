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

    if (await Request.findOne({ where: request, select: ["id"] })) {
      throw new Error("Request already exists");
    }

    const [insertRequest, user, pet] = await Promise.all([
      Request.insert(request),
      User.findOne({ where: { id: request.userId } }),
      Pet.findOne({ where: { id: request.petId } })
    ]);

    Object.assign(request, { ...insertRequest, user, pet });
    return request;
  }

  @Mutation(() => Request)
  async updateRequest(
    @Args() { id, status, cancelReason }: UpdateRequestArgs
  ): Promise<Request> {
    const request = await Request.findOne({ where: { id }, relations });
    if (!request) throw new Error("Could not find request");

    if (request.locked) throw new Error("Request is already done");

    if (status === "COMPLETED") {
      request.completedAt = new Date();

      await Pet.update({ id: request.petId }, { ownerId: request.userId });
    } else if (status === "CANCELED") {
      request.cancelReason = cancelReason || null;
    }

    Object.assign(request, { status, locked: true });
    return await request.save();
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
