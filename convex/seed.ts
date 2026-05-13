import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";

type SeedGift = {
  categoria: string;
  titulo: string;
  descricao: string;
  loja: string;
  url: string;
  preco?: number;
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

const CAT_LUA_DE_MEL = "Experiências para a lua de mel";
const CAT_COTAS = '"Cotas" divertidas';
const CAT_PERSONALIZADOS = "Presentes personalizados";
const CAT_CASA_NOVA = "Metas da casa nova";
const CAT_EMOCIONAIS = "Ideias emocionais / interativas";

const PRODUCTION_GIFTS: SeedGift[] = [
  {
    categoria: CAT_LUA_DE_MEL,
    titulo: "Jantar romântico",
    descricao:
      "Nos presenteie com uma noite especial a dois durante a lua de mel.",
    loja: "PIX",
    url: "#",
    preco: 250,
  },
  {
    categoria: CAT_LUA_DE_MEL,
    titulo: "Passeio de barco",
    descricao: "Um passeio inesquecível pelo mar para celebrar o casamento.",
    loja: "PIX",
    url: "#",
    preco: 350,
  },
  {
    categoria: CAT_LUA_DE_MEL,
    titulo: "Day spa",
    descricao: "Um dia inteiro de relaxamento e cuidados para o casal.",
    loja: "PIX",
    url: "#",
    preco: 450,
  },
  {
    categoria: CAT_LUA_DE_MEL,
    titulo: "Upgrade de hotel",
    descricao: "Ajude a transformar a estadia em algo ainda mais especial.",
    loja: "PIX",
    url: "#",
    preco: 300,
  },
  {
    categoria: CAT_LUA_DE_MEL,
    titulo: "Café da manhã especial",
    descricao: "Um café da manhã caprichado para começar bem o dia.",
    loja: "PIX",
    url: "#",
    preco: 80,
  },
  {
    categoria: CAT_LUA_DE_MEL,
    titulo: "Ingresso para atrações",
    descricao: "Passeios, parques e atrações no destino da lua de mel.",
    loja: "PIX",
    url: "#",
    preco: 200,
  },
  {
    categoria: CAT_LUA_DE_MEL,
    titulo: "Aluguel de carro",
    descricao: "Ajude na locomoção do casal durante a viagem.",
    loja: "PIX",
    url: "#",
    preco: 400,
  },
  {
    categoria: CAT_LUA_DE_MEL,
    titulo: "Massagem para casal",
    descricao: "Uma sessão de massagem relaxante para os dois.",
    loja: "PIX",
    url: "#",
    preco: 350,
  },

  {
    categoria: CAT_COTAS,
    titulo: "Pizza da madrugada",
    descricao: "Para aquelas noites em casa pedindo pizza juntos.",
    loja: "PIX",
    url: "#",
    preco: 60,
  },
  {
    categoria: CAT_COTAS,
    titulo: "Combustível da viagem",
    descricao: "Ajude a encher o tanque para a estrada da lua de mel.",
    loja: "PIX",
    url: "#",
    preco: 150,
  },
  {
    categoria: CAT_COTAS,
    titulo: "Primeira compra do mercado",
    descricao: "Para abastecer a nova casa logo após o casamento.",
    loja: "PIX",
    url: "#",
    preco: 250,
  },
  {
    categoria: CAT_COTAS,
    titulo: "Streaming do casal",
    descricao: "Um ano de Netflix, Spotify ou similar para curtir juntos.",
    loja: "PIX",
    url: "#",
    preco: 70,
  },
  {
    categoria: CAT_COTAS,
    titulo: "Fundo para pedir iFood",
    descricao: "Para os dias em que a preguiça vence a cozinha.",
    loja: "PIX",
    url: "#",
    preco: 100,
  },
  {
    categoria: CAT_COTAS,
    titulo: 'Vale "não cozinhar hoje"',
    descricao: "Um jantar fora ou delivery especial por nossa conta.",
    loja: "PIX",
    url: "#",
    preco: 80,
  },
  {
    categoria: CAT_COTAS,
    titulo: "Fundo da cafeteira dos sonhos",
    descricao: "Ajude o casal a comprar aquela cafeteira incrível.",
    loja: "PIX",
    url: "#",
    preco: 200,
  },

  {
    categoria: CAT_PERSONALIZADOS,
    titulo: "Assinatura de vinho",
    descricao: "Uma seleção mensal de vinhos para descobrir a dois.",
    loja: "PIX",
    url: "#",
    preco: 200,
  },
  {
    categoria: CAT_PERSONALIZADOS,
    titulo: "Assinatura de flores",
    descricao: "Flores frescas chegando todo mês para alegrar a casa.",
    loja: "PIX",
    url: "#",
    preco: 150,
  },
  {
    categoria: CAT_PERSONALIZADOS,
    titulo: "Assinatura de café",
    descricao: "Cafés especiais entregues mensalmente em casa.",
    loja: "PIX",
    url: "#",
    preco: 120,
  },
  {
    categoria: CAT_PERSONALIZADOS,
    titulo: "Curso para casal",
    descricao: "Aula de dança, culinária, vinhos — algo para fazer juntos.",
    loja: "PIX",
    url: "#",
    preco: 300,
  },
  {
    categoria: CAT_PERSONALIZADOS,
    titulo: "Ensaio fotográfico pós-casamento",
    descricao: "Para eternizar mais um momento especial do casal.",
    loja: "PIX",
    url: "#",
    preco: 600,
  },
  {
    categoria: CAT_PERSONALIZADOS,
    titulo: "Kit churrasco",
    descricao: "Acessórios completos para os domingos em família.",
    loja: "PIX",
    url: "#",
    preco: 350,
  },
  {
    categoria: CAT_PERSONALIZADOS,
    titulo: "Jogo de tabuleiro para casal",
    descricao: "Diversão garantida nas noites em casa.",
    loja: "PIX",
    url: "#",
    preco: 180,
  },

  {
    categoria: CAT_CASA_NOVA,
    titulo: "Ajuda para montar o home office",
    descricao: "Mesa, cadeira e o essencial para o escritório em casa.",
    loja: "PIX",
    url: "#",
    preco: 500,
  },
  {
    categoria: CAT_CASA_NOVA,
    titulo: "Projeto de iluminação",
    descricao: "Luminárias e pontos de luz para deixar a casa aconchegante.",
    loja: "PIX",
    url: "#",
    preco: 400,
  },
  {
    categoria: CAT_CASA_NOVA,
    titulo: "Jardim e varanda",
    descricao: "Plantas, vasos e cuidados para um cantinho verde.",
    loja: "PIX",
    url: "#",
    preco: 300,
  },
  {
    categoria: CAT_CASA_NOVA,
    titulo: "Espaço gourmet",
    descricao: "Para o cantinho dos churrascos e encontros em casa.",
    loja: "PIX",
    url: "#",
    preco: 700,
  },
  {
    categoria: CAT_CASA_NOVA,
    titulo: "Automação da casa",
    descricao: "Lâmpadas inteligentes, assistente de voz e mais.",
    loja: "PIX",
    url: "#",
    preco: 800,
  },
  {
    categoria: CAT_CASA_NOVA,
    titulo: "Fundo para o pet do casal",
    descricao: "Ajuda com o futuro membro de quatro patas da família.",
    loja: "PIX",
    url: "#",
    preco: 250,
  },

  {
    categoria: CAT_EMOCIONAIS,
    titulo: "Pague uma bebida para os noivos",
    descricao: "Brinde com a gente, mesmo de longe. Saúde!",
    loja: "PIX",
    url: "#",
    preco: 40,
  },
  {
    categoria: CAT_EMOCIONAIS,
    titulo: "Escreva um conselho para os noivos",
    descricao:
      "Deixe um recado, um conselho ou uma lembrança para guardarmos.",
    loja: "Interativo",
    url: "#",
  },
  {
    categoria: CAT_EMOCIONAIS,
    titulo: "Cápsula do tempo com mensagens",
    descricao:
      "Mensagens dos convidados que serão lidas só no nosso primeiro aniversário.",
    loja: "Interativo",
    url: "#",
  },
  {
    categoria: CAT_EMOCIONAIS,
    titulo: "Playlist colaborativa da festa",
    descricao: "Sugira a música que não pode faltar para embalar a noite.",
    loja: "Interativo",
    url: "#",
  },
  {
    categoria: CAT_EMOCIONAIS,
    titulo: "Mural de fotos dos convidados",
    descricao: "Mande uma foto sua com o casal para o mural da festa.",
    loja: "Interativo",
    url: "#",
  },
];

export const seedProductionGifts = internalMutation({
  args: {},
  returns: v.object({
    inserted: v.number(),
    skipped: v.number(),
    total: v.number(),
  }),
  handler: async (ctx) => {
    const existing = await ctx.db.query("gifts").collect();
    const existingTitles = new Set(
      existing.map((g) => g.titulo.trim().toLowerCase())
    );
    const maxOrder = existing.length
      ? Math.max(...existing.map((g) => g.order))
      : -1;

    const now = Date.now();
    let inserted = 0;
    let skipped = 0;
    let order = maxOrder + 1;

    for (const g of PRODUCTION_GIFTS) {
      const key = g.titulo.trim().toLowerCase();
      if (existingTitles.has(key)) {
        skipped += 1;
        continue;
      }
      await ctx.db.insert("gifts", {
        categoria: g.categoria,
        titulo: g.titulo,
        descricao: g.descricao,
        loja: g.loja,
        url: g.url,
        preco: g.preco,
        status: "disponivel",
        order,
        createdAt: now,
      });
      existingTitles.add(key);
      inserted += 1;
      order += 1;
    }

    return {
      inserted,
      skipped,
      total: PRODUCTION_GIFTS.length,
    };
  },
});
