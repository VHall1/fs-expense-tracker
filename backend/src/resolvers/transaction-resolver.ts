import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Transaction, TransactionType } from "@generated/type-graphql";
import { Context } from "../context";
import { isAuth } from "../middleware/isAuth";

@InputType()
export class TransactionInput {
  @Field()
  amount!: number;
  @Field(() => TransactionType)
  type!: TransactionType;
  @Field(() => Int)
  categoryId!: number;
  @Field(() => ID)
  accountId!: string;
}

@Resolver(Transaction)
export class TransactionResolver {
  @Mutation(() => Transaction)
  @UseMiddleware(isAuth)
  createTransaction(
    @Ctx() ctx: Context,
    @Arg("transaction") transaction: TransactionInput
  ): Promise<Transaction> {
    return ctx.prisma.transaction.create({
      data: {
        amount: transaction.amount,
        type: transaction.type,
        category: {
          connect: {
            id: transaction.categoryId,
          },
        },
        account: {
          connect: {
            id: transaction.accountId,
          },
        },
      },
    });
  }
}
