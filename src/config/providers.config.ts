import DiscordProvider from "next-auth/providers/discord";

import { env } from "@/env";

// Add or remove providers as needed. Make sure you update .env.js with the necessary environment variables.

export const providers = [
  DiscordProvider({
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
  }),
];
