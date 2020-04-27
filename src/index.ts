import "dotenv/config";
import "reflect-metadata";
import { createTypeormConn } from "./createTypeormConn";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { router } from "./router";
import cors from "cors";
import cookieParser from "cookie-parser";

(async () => {
  const [schema] = await Promise.all([
    buildSchema({
      resolvers: [`${__dirname}/resolvers/*Resolver.[tj]s`],
      validate: false
    }),
    createTypeormConn()
  ]);

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  const app = express();

  app.use([
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === "test"
          ? "http://localhost"
          : process.env.FRONTEND_HOST
    }),
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
