import "dotenv/config";
import { GraphQLClient } from "graphql-request";

export const host = process.env.BACKEND_HOST!;
export const client = new GraphQLClient(`${host}/graphql`);
