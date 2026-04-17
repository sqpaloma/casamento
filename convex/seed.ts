import { v } from "convex/values";
import { mutation } from "./_generated/server";

type SeedGift = {
  categoria: string;
  titulo: string;
  descricao: string;
  loja: string;
  url: string;
};

const SEED_GIFTS: SeedGift[] = [
  {
    categoria: "Cozinha",
    titulo: "Jogo de panelas",
    descricao: "Conjunto completo em inox 18/10, 5 peças.",
    loja: "Amazon",
    url: "#",
  },
  {
    categoria: "Cozinha",
    titulo: "Cafeteira italiana",
    descricao: "Moka express 6 xícaras, alumínio.",
    loja: "Americanas",
    url: "#",
  },
  {
    categoria: "Quarto",
    titulo: "Jogo de cama Queen",
    descricao: "Lençol percal 400 fios, tom off-white.",
    loja: "Tok&Stok",
    url: "#",
  },
  {
    categoria: "Quarto",
    titulo: "Travesseiros de plumas",
    descricao: "Par de travesseiros premium, médio.",
    loja: "Mercado Livre",
    url: "#",
  },
  {
    categoria: "Sala",
    titulo: "Quadro decorativo",
    descricao: "Tela canvas 80×60cm, arte abstrata.",
    loja: "Etsy",
    url: "#",
  },
  {
    categoria: "Sala",
    titulo: "Porta-retratos",
    descricao: "Conjunto 3 peças em madeira natural.",
    loja: "Amazon",
    url: "#",
  },
  {
    categoria: "Viagem",
    titulo: "Kit mala de viagem",
    descricao: "Conjunto 2 malas rígidas com rodas 360°.",
    loja: "Americanas",
    url: "#",
  },
  {
    categoria: "Viagem",
    titulo: "Noite de hotel",
    descricao: "Contribuição para lua de mel.",
    loja: "PIX",
    url: "#",
  },
];

export const seedGifts = mutation({
  args: {},
  returns: v.object({
    inserted: v.number(),
    skipped: v.boolean(),
  }),
  handler: async (ctx) => {
    const existing = await ctx.db.query("gifts").take(1);
    if (existing.length > 0) {
      return { inserted: 0, skipped: true };
    }
    const now = Date.now();
    let order = 0;
    for (const g of SEED_GIFTS) {
      await ctx.db.insert("gifts", {
        ...g,
        status: "disponivel",
        order,
        createdAt: now,
      });
      order += 1;
    }
    return { inserted: SEED_GIFTS.length, skipped: false };
  },
});
