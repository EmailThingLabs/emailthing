import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { domains, users } from "@/server/db/schema";
import { v4 as uuidv4 } from "uuid";

export const domainRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.orgId) {
      throw new Error("User does not belong to an organization");
    }

    try {
      const org_domains = await ctx.db.query.domains
        .findMany({
          columns: {
            id: true,
            domain: true,
            organizationId: true,
            status: true,
          },
          where: eq(domains.organizationId, ctx.session.user.orgId),
        })
        .execute();

      return org_domains;
    } catch (error) {
      throw new Error("Failed to get domains");
    }
  }),

  create: protectedProcedure
    .input(z.object({ domain: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.orgId) {
        throw new Error("User does not belong to an organization");
      }

      try {
        await ctx.db
          .insert(domains)
          .values({
            id: uuidv4(),
            organizationId: ctx.session.user.orgId,
            domain: input.domain,
            status: "Unverified",
          })
          .execute();

        return {
          success: true,
        };
      } catch (error) {
        throw new Error("Failed to create domain");
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.orgId) {
        throw new Error("User does not belong to an organization");
      }

      try {
        const a = await ctx.db
          .delete(domains)
          .where(
            and(
              eq(domains.id, input.id),
              eq(domains.organizationId, ctx.session.user.orgId),
            ),
          )
          .returning({ deletedId: domains.id })
          .execute();

        return {
          success: true,
        };
      } catch (error) {
        console.log(error);

        throw new Error("Failed to delete domain");
      }
    }),
});
