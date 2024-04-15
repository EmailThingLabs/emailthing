import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { domains, organizations } from "@/server/db/schema";
import { v4 as uuidv4 } from "uuid";
import dns from "dns";
import { promisify } from "util";

const resolveTxt = promisify(dns.resolveTxt);
const resolveMx = promisify(dns.resolveMx);
const resolveCname = promisify(dns.resolveCname);

export const domainRouter = createTRPCRouter({
  one: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session.user.orgId) {
        throw new Error("User does not belong to an organization");
      }

      try {
        const domain = await ctx.db.query.domains
          .findFirst({
            columns: {
              id: true,
              domain: true,
              organizationId: true,
              status: true,
            },
            where: and(
              eq(domains.id, input.id),
              eq(domains.organizationId, ctx.session.user.orgId),
            ),
          })
          .execute();

        return domain;
      } catch (error) {
        throw new Error("Failed to get domain");
      }
    }),

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
        await ctx.db
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

  verify: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.orgId) {
        throw new Error("User does not belong to an organization");
      }

      try {
        const domain = await ctx.db.query.domains
          .findFirst({
            columns: {
              domain: true,
            },
            where: and(
              eq(domains.id, input.id),
              eq(domains.organizationId, ctx.session.user.orgId),
            ),
          })
          .execute();

        if (!domain) {
          throw new Error("Domain not found");
        }

        const region = await ctx.db.query.organizations
          .findFirst({
            columns: {
              region: true,
            },
            where: eq(organizations.id, ctx.session.user.orgId),
          })
          .execute();

        if (!region) {
          throw new Error("Region not found");
        }

        const dmarcRecords = await resolveTxt(`_dmarc.${domain.domain}`);
        const hasCorrectDMARC = dmarcRecords.some((record) =>
          record.join("").includes("v=DMARC1; p=none;"),
        );

        const mxRecords = await resolveMx(domain.domain);
        const hasCorrectMX = mxRecords.some(
          (record) =>
            record.exchange === `feedback-smtp.${region}.amazonses.com`,
        );

        const spfRecords = await resolveTxt(domain.domain);
        const hasCorrectSPF = spfRecords.some((record) =>
          record.join("").includes("v=spf1 include:amazonses.com ~all"),
        );

        const isVerified = hasCorrectDMARC && hasCorrectMX && hasCorrectSPF;

        if (isVerified) {
          await ctx.db
            .update(domains)
            .set({
              status: "Verified",
            })
            .where(
              and(
                eq(domains.id, input.id),
                eq(domains.organizationId, ctx.session.user.orgId),
              ),
            )
            .execute();

          return {
            success: true,
          };
        }
      } catch (error) {
        console.log(error);

        throw new Error("Failed to verify domain");
      }
    }),
});
