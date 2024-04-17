import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = sqliteTableCreator((name) => `emailthing_${name}`);

export const organizations = createTable("organization", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }).notNull(),
  domain: text("domain", { length: 255 }),

  // move to domains
  smtp_username: text("smtp_username", { length: 255 }),
  smtp_password: text("smtp_password", { length: 255 }),
  region: text("region", { length: 255 }),
});

export const domains = createTable("domains", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  domain: text("domain", { length: 255 }).notNull(),
  status: text("status", { length: 255 }).notNull(),

  organizationId: text("organizationId", { length: 255 }).notNull(),
});

export const domainsRelations = relations(domains, ({ one }) => ({
  organization: one(organizations, {
    fields: [domains.organizationId],
    references: [organizations.id],
  }),
}));

export const audiences = createTable("audiences", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  title: text("title", { length: 255 }).notNull(),
  organizationId: text("organizationId", { length: 255 }).references(
    () => organizations.id,
  ),
});

export const audiencesRelations = relations(audiences, ({ one }) => ({
  organization: one(organizations, {
    fields: [audiences.organizationId],
    references: [organizations.id],
  }),
}));

export const contacts = createTable("contacts", {
  email: text("email", { length: 255 }).notNull().primaryKey(),

  audienceId: text("audienceId", { length: 255 })
    .references(() => audiences.id)
    .notNull(),

  firstName: text("fistName", { length: 255 }).default(""),
  lastName: text("lastName", { length: 255 }).default(""),
  fullName: text("lastName", { length: 255 }).default(""),

  status: text("text", {
    enum: ["active", "pending", "unsubscribed"],
  })
    .notNull()
    .default("active"),
});

export const contactsRelations = relations(contacts, ({ one }) => ({
  audience: one(audiences, {
    fields: [contacts.audienceId],
    references: [audiences.id],
  }),
}));

export const users = createTable("user", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  organizationId: text("organizationId", { length: 255 }).references(
    () => organizations.id,
  ),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ one }) => ({
  accounts: one(accounts),
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
