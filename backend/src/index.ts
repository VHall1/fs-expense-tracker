import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PrismaClient } from "@prisma/client";
import { json } from "body-parser";
import RedisStore from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import * as redis from "redis";
import * as tq from "type-graphql";
import { Context } from "./context";
import {
  AccountResolver,
  AuthResolver,
  TransactionResolver,
  UserResolver,
} from "./resolvers";

const app = async () => {
  const prisma = new PrismaClient();
  const app = express();

  const redisClient = redis.createClient();
  redisClient.connect();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: ["http://localhost:4000", "http://localhost:5173"],
      credentials: true,
    })
  );
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: "lax",
        secure: false, // true,
      },
      secret: "secret",
      saveUninitialized: false,
      resave: false,
    })
  );

  const server = new ApolloServer<Context>({
    schema: await tq.buildSchema({
      resolvers: [
        AuthResolver,
        UserResolver,
        AccountResolver,
        TransactionResolver,
      ],
      validate: false,
    }),
  });
  await server.start();

  app.use(
    "/",
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ prisma, req, res }),
    })
  );

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/`);
  });
};

app();
