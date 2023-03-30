import { User } from "@generated/type-graphql";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async login(
    @Ctx() ctx: Context,
    @Arg("email") email: string
  ): Promise<Boolean> {
    const user = await ctx.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        username: email.split("@")[0],
      },
    });

    console.log({ user });

    if (!user) {
      return false;
    }

    ctx.req.session.userId = user.id;

    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    console.log(ctx.req.session);

    if (!ctx.req.session.userId) {
      return null;
    }

    return await ctx.prisma.user.findUnique({
      where: {
        id: ctx.req.session.userId,
      },
    });
  }
}
