require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("../schema");
const resolvers = require("../resolvers");

module.exports = () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });
  const app = express();
  apolloServer.applyMiddleware({ app });
  return app;
};
