import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { User, Account } from "@generated/type-graphql";
import { Context } from "../context";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  user(@Ctx() ctx: Context, @Arg("id") id: string): Promise<User | null> {
    return ctx.prisma.user.findUnique({
      where: { id },
    });
  }

  @FieldResolver(() => [Account])
  accounts(@Ctx() ctx: Context, @Root() user: User): Promise<Account[]> {
    return ctx.prisma.account.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
