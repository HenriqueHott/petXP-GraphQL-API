import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { router } from "./router";

(async () => {
  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers, validate: false }),
    context: ({ req, res }) => ({ req, res })
  });

  const app = express();

  app.use(router);

  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
