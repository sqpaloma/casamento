import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { userRole } from "./schema";
import { getUserByClerkId, isBootstrapAdmin, requireAdmin } from "./lib/admin";

const userObject = v.object({
  _id: v.id("users"),
  _creationTime: v.number(),
  clerkUserId: v.string(),
  email: v.string(),
  name: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
  role: userRole,
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const ensureCurrent = mutation({
  args: {},
  returns: v.union(userObject, v.null()),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const clerkUserId = identity.subject;
    const email = (identity.email ?? "").toLowerCase();
    const fallbackName = [identity.givenName, identity.familyName]
      .filter(Boolean)
      .join(" ");
    const name = identity.name ?? (fallbackName || undefined);
    const imageUrl = identity.pictureUrl ?? undefined;
    const now = Date.now();

    const existing = await getUserByClerkId(ctx, clerkUserId);

    if (existing) {
      const patch: Record<string, unknown> = { updatedAt: now };
      if (existing.email !== email && email) patch.email = email;
      if (name !== undefined && existing.name !== name) patch.name = name;
      if (imageUrl !== undefined && existing.imageUrl !== imageUrl) {
        patch.imageUrl = imageUrl;
      }
      if (Object.keys(patch).length > 1) {
        await ctx.db.patch(existing._id, patch);
      }
      const refreshed = await ctx.db.get(existing._id);
      return refreshed;
    }

    const isBootstrap = email ? await isBootstrapAdmin(email) : false;
    const role = isBootstrap ? "admin" : "convidado";
    const id = await ctx.db.insert("users", {
      clerkUserId,
      email,
      name,
      imageUrl,
      role,
      createdAt: now,
      updatedAt: now,
    });
    const inserted = await ctx.db.get(id);
    return inserted;
  },
});

export const current = query({
  args: {},
  returns: v.union(userObject, v.null()),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await getUserByClerkId(ctx, identity.subject);
    return user;
  },
});

export const listAdmin = query({
  args: {},
  returns: v.array(userObject),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const users = await ctx.db.query("users").order("desc").collect();
    return users;
  },
});

export const setRole = mutation({
  args: {
    id: v.id("users"),
    role: userRole,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);
    const target = await ctx.db.get(args.id);
    if (!target) throw new Error("Usuário não encontrado.");

    if (
      args.role !== "admin" &&
      target.clerkUserId === admin.clerkUserId
    ) {
      throw new Error(
        "Você não pode remover seu próprio acesso de administrador."
      );
    }

    if (args.role !== "admin" && target.role === "admin") {
      const admins = await ctx.db
        .query("users")
        .withIndex("by_role", (q) => q.eq("role", "admin"))
        .collect();
      if (admins.length <= 1) {
        throw new Error("Mantenha pelo menos um administrador.");
      }
    }

    await ctx.db.patch(args.id, {
      role: args.role,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("users") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);
    const target = await ctx.db.get(args.id);
    if (!target) throw new Error("Usuário não encontrado.");

    if (target.clerkUserId === admin.clerkUserId) {
      throw new Error("Você não pode excluir a si mesmo.");
    }

    if (target.role === "admin") {
      const admins = await ctx.db
        .query("users")
        .withIndex("by_role", (q) => q.eq("role", "admin"))
        .collect();
      if (admins.length <= 1) {
        throw new Error("Mantenha pelo menos um administrador.");
      }
    }

    await ctx.db.delete(args.id);
    return null;
  },
});

export const stats = query({
  args: {},
  returns: v.object({
    total: v.number(),
    admins: v.number(),
    convidados: v.number(),
  }),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("users").collect();
    return {
      total: all.length,
      admins: all.filter((u) => u.role === "admin").length,
      convidados: all.filter((u) => u.role === "convidado").length,
    };
  },
});
