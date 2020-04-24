import "dotenv/config";
import "reflect-metadata";
import { getConnectionOptions, createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { router } from "./router";
import cors from "cors";
import cookieParser from "cookie-parser";

(async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  await createConnection({ ...connectionOptions, name: "default" });

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers, validate: false }),
    context: ({ req, res }) => ({ req, res })
  });

  const app = express();

  app.use([
    cors({ credentials: true, origin: process.env.FRONTEND_HOST }),
    cookieParser(),
    router
  ]);

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(
      `Server running on ${process.env.BACKEND_HOST}${server.graphqlPath}`
    );
  });
})();
