import { type Config } from "drizzle-kit";
import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "better-sqlite",
  // dbCredentials: {
  //   url: env.DATABASE_URL,
  //   authToken: env.DATABASE_AUTH_TOKEN,
  // },
  out: "./drizzle",
  tablesFilter: ["emailthing_*"],
} satisfies Config;
