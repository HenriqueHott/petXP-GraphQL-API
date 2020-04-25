import "dotenv/config";
import { createTypeormConn } from "../createTypeormConn";
import { registerModule } from "./register";
import { loginModule } from "./login";
import { Connection } from "typeorm";
import { meModule } from "./me";
import { updateMeModule } from "./updateMe";

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
});

describe("register", registerModule);
describe("login", loginModule);
describe("me query", meModule);
describe("update me", updateMeModule);

afterAll(async () => {
  await conn.close();
});
