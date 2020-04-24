import "dotenv/config";
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(`${process.env.BACKEND_HOST}/graphql`, {
  headers: {
    credentials: "include"
  }
});
