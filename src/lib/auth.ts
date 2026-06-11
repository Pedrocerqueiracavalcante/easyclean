import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { sendPasswordResetEmail } from "@/lib/email";

export function createAuth(db: D1Database) {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(getDb(db), {
      provider: "sqlite",
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      sendResetPassword: async ({ user, url }) => {
        await sendPasswordResetEmail(user.email, user.name, url);
      },
      resetPasswordTokenExpiresIn: 60 * 60,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
      facebook: {
        clientId: process.env.FACEBOOK_CLIENT_ID || "",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      },
      apple: {
        clientId: process.env.APPLE_CLIENT_ID || "",
        clientSecret: process.env.APPLE_CLIENT_SECRET || "",
      },
    },
    user: {
      additionalFields: {
        phone: { type: "string", required: false },
        role: { type: "string", required: false, defaultValue: "client" },
      },
    },
    session: {
      cookieCache: { enabled: true, maxAge: 60 * 5 },
    },
    trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  });
}

export type Auth = ReturnType<typeof createAuth>;
