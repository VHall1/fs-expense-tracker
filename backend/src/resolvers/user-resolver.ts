import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User, Account, TransactionCategory } from "@generated/type-graphql";
import { Context } from "../context";
import { isAuth } from "../middleware/isAuth";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  user(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string
  ): Promise<User | null> {
    return ctx.prisma.user.findUnique({
      where: { id },
    });
  }

  @FieldResolver(() => [Account])
  @UseMiddleware(isAuth)
  accounts(@Ctx() ctx: Context, @Root() user: User): Promise<Account[]> {
    return ctx.prisma.account.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  @FieldResolver(() => [TransactionCategory])
  @UseMiddleware(isAuth)
  categories(
    @Ctx() ctx: Context,
    @Root() user: User
  ): Promise<TransactionCategory[]> {
    return ctx.prisma.transactionCategory.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
