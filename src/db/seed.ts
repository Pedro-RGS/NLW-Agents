import { reset, seed } from "drizzle-seed";
import { db, dbConnection } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);
await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum()
      }
    }
  }
});

await dbConnection.end();

// biome-ignore lint/suspicious/noConsole: only used when in develop
console.log("Database seeded!");
