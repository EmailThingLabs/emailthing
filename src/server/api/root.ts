import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { orgRouter } from "@/server/api/handlers/org";
import { sesRouter } from "@/server/api/handlers/ses";
import { domainRouter } from "@/server/api/handlers/domains";
import { settingsRouter } from "@/server/api/handlers/settings";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  org: orgRouter,
  domain: domainRouter,
  ses: sesRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
