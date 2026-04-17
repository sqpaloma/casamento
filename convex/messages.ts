import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/admin";

const messageObject = v.object({
  _id: v.id("messages"),
  _creationTime: v.number(),
  name: v.string(),
  message: v.string(),
  createdAt: v.number(),
});

export const list = query({
  args: {},
  returns: v.array(messageObject),
  handler: async (ctx) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_createdAt")
      .order("desc")
      .take(100);
  },
});

export const listAdmin = query({
  args: {},
  returns: v.array(messageObject),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("messages")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    message: v.string(),
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const message = args.message.trim();
    if (name.length === 0 || message.length === 0) {
      throw new Error("Nome e mensagem são obrigatórios.");
    }
    return await ctx.db.insert("messages", {
      name,
      message,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("messages") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const countAdmin = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("messages").collect();
    return all.length;
  },
});
