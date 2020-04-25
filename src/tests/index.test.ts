import { Connection } from "typeorm";
import { createTypeormConn } from "../createTypeormConn";
import { registerModule } from "./register";
import { loginModule } from "./login";
import { meModule } from "./me";
import { updateMeModule } from "./updateMe";

let conn: Connection;

beforeAll(async () => {
  conn = await createTypeormConn();
});

// Order here is important
describe("register", registerModule);
describe("me", meModule);
describe("login", loginModule);
describe("update me", updateMeModule);

afterAll(async () => {
  await conn.close();
});
