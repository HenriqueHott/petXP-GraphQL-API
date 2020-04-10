import { Resolver, Query, Mutation, Args, Arg, ID } from "type-graphql";
import { User } from "../entities/User";
import { CreateUserArgs } from "../types/User/CreateUserArgs";
import { UpdateUserArgs } from "../types/User/UpdateUserArgs";
import { validateOrReject } from "class-validator";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => User)
  async createUser(@Args() args: CreateUserArgs): Promise<User> {
    await validateOrReject(args);

    return await User.create(args).save();
  }

  @Mutation(() => User)
  async updateUser(@Args() { id, ...args }: UpdateUserArgs): Promise<User> {
    await validateOrReject(args);

    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Could not find user");

    Object.assign(user, args);
    return await user.save();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => ID) id: string): Promise<boolean> {
    try {
      await User.delete(id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
