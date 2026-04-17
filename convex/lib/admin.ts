import { QueryCtx, MutationCtx } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

export type AdminIdentity = {
  tokenIdentifier: string;
  clerkUserId: string;
  email: string;
  name?: string;
};

function getBootstrapAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function getUserByClerkId(
  ctx: QueryCtx | MutationCtx,
  clerkUserId: string
): Promise<Doc<"users"> | null> {
  return await ctx.db
    .query("users")
    .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
}

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx
): Promise<AdminIdentity> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Não autenticado.");
  }
  const email = (identity.email ?? "").toLowerCase();
  const clerkUserId = identity.subject;

  const user = await getUserByClerkId(ctx, clerkUserId);
  if (user?.role === "admin") {
    return {
      tokenIdentifier: identity.tokenIdentifier,
      clerkUserId,
      email: user.email,
      name: user.name,
    };
  }

  const bootstrap = getBootstrapAdminEmails();
  if (email && bootstrap.includes(email)) {
    return {
      tokenIdentifier: identity.tokenIdentifier,
      clerkUserId,
      email,
      name: identity.name ?? undefined,
    };
  }

  throw new Error("Acesso negado.");
}

export async function isBootstrapAdmin(email: string): Promise<boolean> {
  return getBootstrapAdminEmails().includes(email.toLowerCase());
}
