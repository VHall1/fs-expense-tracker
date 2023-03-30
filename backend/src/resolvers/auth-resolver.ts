import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async login(
    @Ctx() ctx: Context,
    @Arg("email") email: string
  ): Promise<Boolean> {
    const user = await ctx.prisma.user.findUnique({
      where: { email },
    });

    console.log({ user });

    if (!user) {
      return false;
    }

    // TODO: set cookie & redis session
    // ctx.req.session.userId = user.id;
    return true;
  }
}
