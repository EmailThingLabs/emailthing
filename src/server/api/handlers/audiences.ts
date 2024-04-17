import { z } from "zod";
import { eq, and } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { audiences, contacts } from "@/server/db/schema";
import { v4 as uuidv4 } from "uuid";

export const audiencesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.orgId) {
        throw new Error("User does not belong to an organization");
      }

      try {
        await ctx.db
          .insert(audiences)
          .values({
            id: uuidv4(),
            organizationId: ctx.session.user.orgId,
            title: input.title,
          })
          .execute();

        return {
          success: true,
        };
      } catch (error) {
        throw new Error("Failed to create an audience");
      }
    }),

  addContact: protectedProcedure
    .input(
      z.object({
        audienceId: z.string(),
        email: z.string(),
        fullName: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.orgId) {
        throw new Error("User does not belong to an organization");
      }

      try {
        await ctx.db
          .insert(contacts)
          .values({
            audienceId: input.audienceId,
            email: input.email,
            fullName: input.fullName,
            firstName: input.firstName,
            lastName: input.lastName,
          })
          .execute();

        return {
          success: true,
        };
      } catch (error) {
        throw new Error("Failed to add a contact to an audience");
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.orgId) {
        throw new Error("User does not belong to an organization");
      }

      try {
        await ctx.db
          .delete(audiences)
          .where(eq(audiences.id, input.id))
          .returning({ deletedId: audiences.id })
          .execute();

        return {
          success: true,
        };
      } catch (error) {
        console.log(error);

        throw new Error("Failed to delete an audience");
      }
    }),
});
