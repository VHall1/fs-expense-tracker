import { Account, Transaction } from "@generated/type-graphql";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Context } from "../context";

@Resolver(Account)
export class AccountResolver {
  @Query(() => Account, { nullable: true })
  account(@Ctx() ctx: Context, @Arg("id") id: string): Promise<Account | null> {
    return ctx.prisma.account.findUnique({
      where: { id },
    });
  }

  @FieldResolver(() => [Transaction])
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
