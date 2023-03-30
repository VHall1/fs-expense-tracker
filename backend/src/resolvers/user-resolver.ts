import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { User } from "@generated/type-graphql";
import { Context } from "../context";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  show(@Ctx() ctx: Context, @Arg("id") id: string): Promise<User | null> {
    return ctx.prisma.user.findUnique({
      where: { id },
    });
  }
}
