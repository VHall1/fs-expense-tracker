import { User } from "@generated/type-graphql";
import * as bcrypt from "bcrypt";
import * as EmailValidator from "email-validator";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "../context";

@ObjectType()
class FieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
class AuthResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class LoginArgs {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async login(
    @Ctx() ctx: Context,
    @Arg("args") { email, password }: LoginArgs
  ): Promise<AuthResponse> {
    const genericError = "Invalid email or password";
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "",
            message: genericError,
          },
        ],
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "",
            message: genericError,
          },
        ],
      };
    }

    ctx.req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => AuthResponse)
  async register(
    @Ctx() ctx: Context,
    @Arg("args") { email, password }: LoginArgs
  ): Promise<AuthResponse> {
    if (!EmailValidator.validate(email)) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email",
          },
        ],
      };
    }

    const user = await ctx.prisma.user.create({
      data: {
        email,
        password: hashPassword(password),
        username: email.split("@")[0],
      },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "",
            message: "Something went wrong. Please try again later.",
          },
        ],
      };
    }

    ctx.req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    return new Promise((resolve) =>
      ctx.req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        ctx.res.clearCookie("qid");
        resolve(true);
      })
    );
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
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

function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
