import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { organizations, users } from "@/server/db/schema";
import { v4 as uuidv4 } from "uuid";

export const orgRouter = createTRPCRouter({
  isOrgSetup: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.orgId) {
      return {
        setup: false,
      };
    }

    return {
      setup: true,
    };
  }),

  setupOrg: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const org = await ctx.db
          .insert(organizations)
          .values({
            id: uuidv4(),
            name: input.name,
          })
          .returning()
          .execute();

        const user = await ctx.db
          .update(users)
          .set({
            organizationId: org[0]?.id,
          })
          .where(eq(users.id, ctx.session.user.id));

        return {
          success: true,
        };
      } catch (error) {
        throw new Error("Failed to create organization");
      }
    }),
});
