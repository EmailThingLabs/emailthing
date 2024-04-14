import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import * as schema from "./schema";

const sqlite = new Database("db/emailthing.sqlite");

export const db = drizzle(sqlite, { schema });

// const client = createClient({
//   url: env.DATABASE_URL,
//   authToken: env.DATABASE_AUTH_TOKEN,
// });

// export const db = drizzle(client, { schema });
