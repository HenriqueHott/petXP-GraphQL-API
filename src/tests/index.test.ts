import { Connection } from "typeorm";
import { createTypeormConn } from "../createTypeormConn";
import { registerModule } from "./modules/register";
import { loginModule } from "./modules/login";
import { meModule } from "./modules/me";
import { updateMeModule } from "./modules/updateMe";

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
