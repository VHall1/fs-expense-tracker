import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as tq from "type-graphql";
import { Context, context } from "./context";
import { UserResolver } from "./resolvers";

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer<Context>({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context,
  });

  console.log(`🚀 Server ready at ${url}`);
};

app();
