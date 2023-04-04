import { Account, Transaction } from "@generated/type-graphql";
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
import { Context } from "../context";
import { isAuth } from "../middleware/isAuth";

@Resolver(Account)
export class AccountResolver {
  @Query(() => Account, { nullable: true })
  @UseMiddleware(isAuth)
  account(
    @Ctx() ctx: Context,
    @Arg("id", () => ID) id: string
  ): Promise<Account | null> {
    return ctx.prisma.account.findUnique({
      where: { id },
    });
  }

  @FieldResolver(() => [Transaction])
  @UseMiddleware(isAuth)
  transactions(
    @Ctx() ctx: Context,
    @Root() account: Account
  ): Promise<Transaction[]> {
    return ctx.prisma.transaction.findMany({
      where: {
        accountId: account.id,
      },
    });
  }
}
