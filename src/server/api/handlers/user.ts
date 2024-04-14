import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";

export const userRouter = createTRPCRouter({
  isSetup: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user || !ctx.session.user.id) {
      throw new Error("User not found or user ID missing in session context");
    }

    const setup = await ctx.db.query.users
      .findFirst({
        columns: { onboarded: true },
        where: eq(users.id, ctx.session.user.id),
      })
      .execute();

    return setup;
  }),
});
