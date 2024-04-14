import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import nodemailer from "nodemailer";

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

  verifySetup: protectedProcedure
    .input(
      z.object({
        domain: z.string(),
        smtp_username: z.string(),
        smtp_password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user || !ctx.session.user.id) {
        throw new Error("User not found or user ID missing in session context");
      }

      const transporter = nodemailer.createTransport({
        host: "email-smtp.us-west-1.amazonaws.com",
        port: 465,
        secure: true,
        auth: {
          user: input.smtp_username,
          pass: input.smtp_password,
        },
      });

      try {
        await transporter.verify();

        await ctx.db
          .update(users)
          .set({
            onboarded: true,
            domain: input.domain,
            smtp_username: input.smtp_username,
            smtp_password: input.smtp_password,
          })
          .where(eq(users.id, ctx.session.user.id))
          .returning({ updatedId: users.id });

        return {
          status: "success",
          message: "SMTP credentials are valid, setup complete.",
        };
      } catch (error) {
        throw new Error(
          "SMTP credentials are invalid, please check and try again.",
        );
      }
    }),
});
