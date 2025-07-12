import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "../db/schema/index.ts";
import { env } from "../env.ts";

export const dbConnection = postgres(env.DATABASE_URL);
export const db = drizzle(dbConnection, {
  schema,
  casing: "snake_case",
});
