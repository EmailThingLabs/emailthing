import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import { providers } from "@/config/providers.config";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { createTable, users } from "@/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      orgId: string | null;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const organizationId = await orgId(user.id);

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          orgId: organizationId,
        },
      };
    },
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: providers,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
};

async function orgId(userId: string) {
  const user = await db.query.users
    .findFirst({
      columns: { organizationId: true },
      where: eq(users.id, userId),
    })
    .execute();

  return user?.organizationId;
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
