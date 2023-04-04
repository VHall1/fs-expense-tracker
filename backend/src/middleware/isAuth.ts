import { MiddlewareFn } from "type-graphql";
import { Context } from "../context";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    return context.res.status(401).json({ error: "not authenticated" });
  }

  return next();
};
