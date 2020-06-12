import "dotenv/config";
import { TestClient } from "./TestClient";

export const client = new TestClient(process.env.BACKEND_HOST);
