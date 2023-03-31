import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PrismaClient } from "@prisma/client";
import { json } from "body-parser";
import RedisStore from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import http from "http";
import * as redis from "redis";
import * as tq from "type-graphql";
import { Context } from "./context";
import { AuthResolver, UserResolver } from "./resolvers";

const app = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema: await tq.buildSchema({
      resolvers: [AuthResolver, UserResolver],
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  const redisClient = redis.createClient();
  redisClient.connect();

  app.set("trust proxy", 1);
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: true,
        httpOnly: true,
        sameSite: "none",
      },
      secret: "secret",
      saveUninitialized: false,
      resave: false,
    })
  );

  const prisma = new PrismaClient();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ prisma, req, res }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
};

app();
