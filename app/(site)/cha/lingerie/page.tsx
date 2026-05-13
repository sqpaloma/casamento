"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import MetaLabel from "@/components/wedding/meta-label";
import { Button } from "@/components/ui/button";

type LingerieItem = {
  titulo: string;
  descricao: string;
  loja: string;
  url: string;
  cor?: string;
  tamanho?: string;
  preco?: string;
};

const items: LingerieItem[] = [
  {
    titulo: "Conjunto Top Triângulo Renda e Tule",
    descricao: "Sutiã top triângulo + calcinha fio dental em renda e tule. Sensual e moderno.",
    loja: "Hope Lingerie",
    url: "https://www.hopelingerie.com.br/conjunto-sutia-top-triangulo-e-calcinha-fio-dental-em-renda-e-tule-preto/p",
    cor: "Preto",
    tamanho: "P",
    preco: "R$ 249,80",
  },
  {
    titulo: "Conjunto Top Triângulo Tule Personalizado",
    descricao: "Sutiã top triângulo + calcinha string fio dental em tule personalizado.",
    loja: "Hope Lingerie",
    url: "https://www.hopelingerie.com.br/conjunto-sutia-top-triangulo-e-calcinha-string-fio-dental-em-tule-personalizado-preto/p",
    cor: "Preto",
    tamanho: "P",
    preco: "R$ 99,80",
  },
  {
    titulo: "Camisola Longa Cetim Olímpia",
    descricao: "Camisola longa sem manga em cetim, off-white. Elegante para a lua de mel.",
    loja: "Loungerie",
    url: "https://www.loungerie.com.br/camisola-longa-sem-manga-cetim-olimpia-off-white-35-05-0345-161/p",
    cor: "Off-white",
    tamanho: "P",
    preco: "R$ 429,90",
  },
  {
    titulo: "Shortdoll Cetim Olímpia",
    descricao: "Conjunto camisa + short em cetim, off-white. Romântico e confortável.",
    loja: "Loungerie",
    url: "https://www.loungerie.com.br/shortdoll-cetim-olimpia-off-white-35-17-0106-161/p",
    cor: "Off-white",
    tamanho: "P",
    preco: "R$ 429,90",
  },
  {
    titulo: "Body Sem Manga Renda Hot Spot",
    descricao: "Body sem manga em renda branca, decote elegante.",
    loja: "Loungerie",
    url: "https://www.loungerie.com.br/body-sem-manga-renda-hot-spot-branco-35-24-0187-001/p",
    cor: "Branco",
    tamanho: "P",
    preco: "R$ 239,90",
  },
  {
    titulo: "Sutiã Meia Taça Up Renda Hot Spot",
    descricao: "Sutiã meia taça alongado em renda branca, push up sutil.",
    loja: "Loungerie",
    url: "https://www.loungerie.com.br/sutia-meia-taca-up-alongado-renda-hot-spot-branco-10-17-0040-001/p",
    cor: "Branco",
    tamanho: "42B",
    preco: "R$ 159,90",
  },
  {
    titulo: "Sutiã Triângulo Renda Hot Spot",
    descricao: "Sutiã triângulo sem aro em renda branca, leve e delicado.",
    loja: "Loungerie",
    url: "https://www.loungerie.com.br/sutia-triangulo-renda-hot-spot-branco-10-01-0306-001/p",
    cor: "Branco",
    tamanho: "P",
    preco: "R$ 149,90",
  },
  {
    titulo: "Sutiã Triângulo Bojo Renda Shiny Love",
    descricao: "Sutiã triângulo com bojo em renda, tom suave.",
    loja: "Loungerie",
    url: "https://www.loungerie.com.br/sutia-triangulo-bojo-renda-shiny-love-rosa-malaga-10-01-0298-979/p",
    cor: "Rosa Malaga",
    tamanho: "42B",
    preco: "R$ 129,90",
  },
  {
    titulo: "Sutiã Triângulo Bojo Renda Shiny Love",
    descricao: "Sutiã triângulo com bojo em renda, verde delicado.",
    loja: "Loungerie",
    url: "https://www.loungerie.com.br/sutia-triangulo-bojo-renda-shiny-love-verde-iceberg-green-10-01-0298-980/p",
    cor: "Verde Iceberg",
    tamanho: "42B",
    preco: "R$ 129,90",
  },
  {
    titulo: "Sutiã Triângulo Renda Shiny Love",
    descricao: "Sutiã triângulo sem aro em renda, super confortável.",
    loja: "Loungerie",
    url: "https://www.loungerie.com.br/sutia-triangulo-renda-shiny-love-rosa-malaga-10-01-0299-979/p",
    cor: "Rosa Malaga",
    tamanho: "42B",
    preco: "R$ 119,90",
  },
  {
    titulo: "Top Modal e Tule Estampado",
    descricao: "Top em modal e tule estampado, leve e contemporâneo.",
    loja: "Calvin Klein",
    url: "https://www.calvinklein.com.br/top-modal-e-tule-estampado_preto_mas8629_0987/p",
    cor: "Preto",
    tamanho: "P",
    preco: "R$ 149,00",
  },
  {
    titulo: "Top Leve + Calcinha Cavada Serena",
    descricao: "Conjunto top leve com calcinha cavada, tom marfim elegante.",
    loja: "Valisere",
    url: "https://www.valisere.com.br/top-leve-calcinha-cavada-serena-30907-70914/p?property__Cor=MARFIM",
    cor: "Marfim",
    tamanho: "P",
  },
  {
    titulo: "Corpete Leve + Calcinha String Serena",
    descricao: "Corpete leve com aro e calcinha string fio. Sofisticado.",
    loja: "Valisere",
    url: "https://www.valisere.com.br/corpete-leve-com-aro-calcinha-string-fio-serena-30906-70913/p?property__Cor=MARFIM",
    cor: "Marfim",
    tamanho: "P",
  },
  {
    titulo: "Sutiã Leve + Calcinha Biquíni Serena",
    descricao: "Conjunto sutiã leve com aro e calcinha biquíni.",
    loja: "Valisere",
    url: "https://www.valisere.com.br/sutia-leve-com-aro-calcinha-biquini-serena-30905-70910/p?property__Cor=MARFIM",
    cor: "Marfim",
    tamanho: "P",
  },
  {
    titulo: "Sutiã Push Up Renda Essencial",
    descricao: "Sutiã push up em renda com calcinha biquíni. Romântico.",
    loja: "Valisere",
    url: "https://www.valisere.com.br/sutia-push-up-renda-calcinha-biquini-renda-essencial-24190-5-44357-1/p?property__Cor=ALFAZEMA",
    cor: "Alfazema",
    tamanho: "P",
  },
  {
    titulo: "Sutiã Leve Renda + Calcinha Essencial",
    descricao: "Conjunto leve em renda, conforto e delicadeza.",
    loja: "Valisere",
    url: "https://www.valisere.com.br/sutia-leve-renda-calcinha-biquini-renda-essencial-24164-5-78859-5-1/p?property__Cor=ALFAZEMA",
    cor: "Alfazema",
    tamanho: "P",
  },
  {
    titulo: "Sutiã com Aro Renda + Lateral Dupla",
    descricao: "Sutiã leve com aro em renda e calcinha biquíni lateral dupla.",
    loja: "Valisere",
    url: "https://www.valisere.com.br/sutia-leve-com-aro-renda-calcinha-biquini-lateral-dupla-renda-essencial-26123-41165-5-1/p?property__Cor=BRANCO",
    cor: "Branco",
    tamanho: "P",
  },
  {
    titulo: "Sutiã Bojo Taça B + Biquíni Aurora",
    descricao: "Conjunto sutiã com bojo taça B e calcinha biquíni.",
    loja: "Valisere",
    url: "https://www.valisere.com.br/sutia-bojo-taca-b-calcinha-biquini-aurora-30885-70886-1/p?property__Cor=DIVINO",
    cor: "Divino",
    tamanho: "42B",
  },
];

export default function ChaLingeriePage() {
  return (
    <div className="relative pt-24 pb-16">
      <section className="px-[5vw] md:px-[8vw] mb-10 md:mb-12">
        <Button
          asChild
          variant="link"
          className="group mb-6 h-auto p-0 gap-3 text-[hsl(var(--muted-foreground))] no-underline hover:no-underline hover:text-[hsl(var(--primary))]"
        >
          <Link href="/cha">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="meta-label group-hover:text-[hsl(var(--primary))]">
              Voltar para Chá &amp; Bar
            </span>
          </Link>
        </Button>

        <MetaLabel className="mb-3">04 · Pré-celebração / 01 · Só para elas</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Lista de Lingerie
        </h1>
        <p className="mt-5 max-w-xl text-base text-[hsl(var(--muted-foreground))] leading-relaxed">
          Sugestões selecionadas em quatro lojas — <strong className="font-medium text-[hsl(var(--foreground))]">Hope Lingerie</strong>,{" "}
          <strong className="font-medium text-[hsl(var(--foreground))]">Loungerie</strong>,{" "}
          <strong className="font-medium text-[hsl(var(--foreground))]">Valisere</strong> e{" "}
          <strong className="font-medium text-[hsl(var(--foreground))]">Calvin Klein</strong>.
          Clique em qualquer peça para ser direcionada à loja.
        </p>

        <div className="mt-8 inline-flex flex-wrap items-stretch border border-[hsl(var(--border))] bg-background/40">
          <div className="px-5 py-4 border-r border-[hsl(var(--border))]">
            <MetaLabel className="mb-1">Tamanho geral</MetaLabel>
            <p className="font-display italic text-2xl text-[hsl(var(--foreground))] leading-none">
              P
            </p>
          </div>
          <div className="px-5 py-4">
            <MetaLabel className="mb-1">Sutiã</MetaLabel>
            <p className="font-display italic text-2xl text-[hsl(var(--foreground))] leading-none">
              42
            </p>
          </div>
        </div>
      </section>

      <section className="px-[5vw] md:px-[8vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[hsl(var(--border))]">
          {items.map((item, i) => (
            <motion.a
              key={item.titulo + item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative bg-background p-7 md:p-8 flex flex-col gap-3 transition-colors hover:bg-[hsl(var(--secondary))] cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <Heart className="w-4 h-4 text-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))] transition-colors" />
                <span className="meta-label">{item.loja}</span>
              </div>

              <h3 className="font-display italic text-2xl md:text-3xl leading-tight group-hover:text-[hsl(var(--primary))] transition-colors">
                {item.titulo}
              </h3>

              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                {item.descricao}
              </p>

              <div className="mt-auto pt-5 border-t border-[hsl(var(--border))] space-y-2">
                {item.tamanho && (
                  <div className="flex items-baseline gap-3">
                    <span className="meta-label w-16">Tamanho</span>
                    <span className="text-sm text-[hsl(var(--foreground))]">
                      {item.tamanho}
                    </span>
                  </div>
                )}
                {item.cor && (
                  <div className="flex items-baseline gap-3">
                    <span className="meta-label w-16">Cor</span>
                    <span className="text-sm text-[hsl(var(--foreground))]">
                      {item.cor}
                    </span>
                  </div>
                )}
                {item.preco && (
                  <div className="flex items-baseline gap-3">
                    <span className="meta-label w-16">Preço</span>
                    <span className="font-mono text-sm text-[hsl(var(--primary))]">
                      {item.preco}
                    </span>
                  </div>
                )}
              </div>

              <span className="inline-flex items-center gap-2 mt-4 text-[hsl(var(--primary))]">
                <ExternalLink className="w-3 h-3" />
                <span className="meta-label text-[hsl(var(--primary))] group-hover:gap-3 transition-all">
                  Ver na loja
                </span>
                <span className="h-px w-6 bg-[hsl(var(--primary))] group-hover:w-12 transition-all" />
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="px-[5vw] md:px-[8vw] mt-12">
        <div className="border border-[hsl(var(--border))] p-6 md:p-8 bg-background/40">
          <MetaLabel className="mb-2">Dica</MetaLabel>
          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
            As peças são apenas referências — fique à vontade para escolher
            outra cor, modelo parecido ou trazer um vale-presente. O importante
            é o carinho. Em caso de dúvida sobre tamanho, prefira o P.
          </p>
        </div>
      </section>
    </div>
  );
}
