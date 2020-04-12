import { Resolver, Query, Mutation, Args, Arg, ID } from "type-graphql";
import { User } from "../entities/User";
import { CreateUserArgs } from "../types/User/CreateUserArgs";
import { UpdateUserArgs } from "../types/User/UpdateUserArgs";

const relations: string[] = ["pets", "requests"];

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find({ relations });
  }

  @Mutation(() => User)
  async createUser(@Args() args: CreateUserArgs): Promise<User> {
    const user = await User.create(args).save();
    Object.assign(user, { pets: [], requests: [] });

    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args() { id, ...args }: UpdateUserArgs): Promise<User> {
    const user = await User.findOne({ where: { id }, relations });
    if (!user) throw new Error("Could not find user");

    Object.assign(user, args);
    await User.update({ id: user.id }, args);

    return user;
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
