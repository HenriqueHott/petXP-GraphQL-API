import { Resolver, Query, Mutation, Args, Arg, ID } from "type-graphql";
import { Request, RequestStatus } from "../entities/Request";
import { validateOrReject } from "class-validator";
import { CreateRequestArgs } from "../types/Request/CreateRequestArgs";
import { UpdateRequestArgs } from "../types/Request/UpdateRequestArgs";

const relations: string[] = ["user", "pet"];

@Resolver(Request)
export class RequestResolver {
  @Query(() => [Request])
  async requests(): Promise<Request[]> {
    return await Request.find({ relations });
  }

  @Mutation(() => Request)
  async createRequest(@Args() args: CreateRequestArgs): Promise<Request> {
    await validateOrReject(args);

    return await Request.create(args).save();
  }

  @Mutation(() => Request)
  async updateRequest(
    @Args() { id, ...args }: UpdateRequestArgs
  ): Promise<Request> {
    await validateOrReject({ id, ...args });

    const request = await Request.findOne({ where: { id }, relations });
    if (!request) throw new Error("Could not find request");

    if (args.status === RequestStatus.COMPLETED) {
      request.completedAt = new Date();
    }

    Object.assign(request, args);
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
