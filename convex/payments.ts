import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paymentStatus } from "./schema";
import { requireAdmin } from "./lib/admin";

const paymentWithGift = v.object({
  _id: v.id("payments"),
  _creationTime: v.number(),
  giftId: v.id("gifts"),
  guestName: v.string(),
  guestEmail: v.optional(v.string()),
  amount: v.number(),
  status: paymentStatus,
  asaasPaymentId: v.optional(v.string()),
  createdAt: v.number(),
  giftTitulo: v.optional(v.string()),
  giftCategoria: v.optional(v.string()),
});

export const listAdmin = query({
  args: {},
  returns: v.array(paymentWithGift),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const payments = await ctx.db.query("payments").order("desc").collect();
    return await Promise.all(
      payments.map(async (p) => {
        const gift = await ctx.db.get(p.giftId);
        return {
          ...p,
          giftTitulo: gift?.titulo,
          giftCategoria: gift?.categoria,
        };
      })
    );
  },
});

export const create = mutation({
  args: {
    giftId: v.id("gifts"),
    guestName: v.string(),
    guestEmail: v.optional(v.string()),
    amount: v.number(),
    status: v.optional(paymentStatus),
  },
  returns: v.id("payments"),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const gift = await ctx.db.get(args.giftId);
    if (!gift) throw new Error("Presente não encontrado.");
    const name = args.guestName.trim();
    if (!name) throw new Error("Nome do convidado é obrigatório.");
    if (args.amount < 0) throw new Error("Valor inválido.");
    return await ctx.db.insert("payments", {
      giftId: args.giftId,
      guestName: name,
      guestEmail: args.guestEmail?.trim() || undefined,
      amount: args.amount,
      status: args.status ?? "pendente",
      createdAt: Date.now(),
    });
  },
});

export const markPaid = mutation({
  args: { id: v.id("payments") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const payment = await ctx.db.get(args.id);
    if (!payment) throw new Error("Pagamento não encontrado.");
    await ctx.db.patch(args.id, { status: "pago" });
    await ctx.db.patch(payment.giftId, { status: "pago" });
    return null;
  },
});

export const cancel = mutation({
  args: { id: v.id("payments") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const payment = await ctx.db.get(args.id);
    if (!payment) throw new Error("Pagamento não encontrado.");
    await ctx.db.patch(args.id, { status: "cancelado" });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("payments") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const stats = query({
  args: {},
  returns: v.object({
    total: v.number(),
    pendente: v.number(),
    pago: v.number(),
    cancelado: v.number(),
    totalArrecadado: v.number(),
  }),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const all = await ctx.db.query("payments").collect();
    return {
      total: all.length,
      pendente: all.filter((p) => p.status === "pendente").length,
      pago: all.filter((p) => p.status === "pago").length,
      cancelado: all.filter((p) => p.status === "cancelado").length,
      totalArrecadado: all
        .filter((p) => p.status === "pago")
        .reduce((sum, p) => sum + p.amount, 0),
    };
  },
});
