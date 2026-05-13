"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Wine } from "lucide-react";
import MetaLabel from "@/components/wedding/meta-label";
import { Button } from "@/components/ui/button";

type DrinkItem = {
  titulo: string;
  descricao: string;
  categoria: string;
  loja: string;
  url: string;
};

const items: DrinkItem[] = [
  {
    titulo: "Macallan 12 anos",
    descricao: "Single malt escocês, envelhecido em barris de xerez.",
    categoria: "Whisky",
    loja: "Empório Frangipani",
    url: "https://www.emporiofrangipani.com.br/",
  },
  {
    titulo: "Glenfiddich 15 anos",
    descricao: "Single malt clássico, notas de frutas secas e mel.",
    categoria: "Whisky",
    loja: "Mr. Booze",
    url: "https://www.mrbooze.com.br/",
  },
  {
    titulo: "Johnnie Walker Blue Label",
    descricao: "Blend premium, suave e complexo. Para ocasiões especiais.",
    categoria: "Whisky",
    loja: "Empório Frangipani",
    url: "https://www.emporiofrangipani.com.br/",
  },
  {
    titulo: "Tanqueray No. Ten",
    descricao: "Gin premium destilado com cítricos frescos.",
    categoria: "Gin",
    loja: "Mr. Booze",
    url: "https://www.mrbooze.com.br/",
  },
  {
    titulo: "Hendrick's Gin",
    descricao: "Infusão de pétalas de rosa e pepino. Perfeito para drinks.",
    categoria: "Gin",
    loja: "Empório Frangipani",
    url: "https://www.emporiofrangipani.com.br/",
  },
  {
    titulo: "Belvedere Vodka",
    descricao: "Vodka polonesa premium, pura e aveludada.",
    categoria: "Vodka",
    loja: "Mr. Booze",
    url: "https://www.mrbooze.com.br/",
  },
  {
    titulo: "Zacapa 23",
    descricao: "Rum guatemalteco envelhecido, encorpado e doce.",
    categoria: "Rum",
    loja: "Empório Frangipani",
    url: "https://www.emporiofrangipani.com.br/",
  },
  {
    titulo: "Don Julio 1942",
    descricao: "Tequila reposada artesanal, ideal para brindar.",
    categoria: "Tequila",
    loja: "Mr. Booze",
    url: "https://www.mrbooze.com.br/",
  },
  {
    titulo: "Veuve Clicquot Brut",
    descricao: "Champagne francês clássico, frutado e elegante.",
    categoria: "Champagne",
    loja: "Wine",
    url: "https://www.wine.com.br/",
  },
  {
    titulo: "Malbec Argentino",
    descricao: "Vinho tinto encorpado, taninos macios. Mendoza, Argentina.",
    categoria: "Vinho",
    loja: "Wine",
    url: "https://www.wine.com.br/",
  },
  {
    titulo: "IPA artesanal",
    descricao: "Caixa de cerveja artesanal IPA, lúpulos cítricos.",
    categoria: "Cerveja",
    loja: "Beer Hunter",
    url: "https://www.beerhunter.com.br/",
  },
  {
    titulo: "Charutos Cohiba",
    descricao: "Caixa de charutos cubanos para acompanhar o brinde.",
    categoria: "Charuto",
    loja: "Mundo dos Charutos",
    url: "https://www.mundodoscharutos.com.br/",
  },
];

export default function ChaBarPage() {
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

        <MetaLabel className="mb-3">04 · Pré-celebração / 02 · Só para eles</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Bar dos Noivos
        </h1>
        <p className="mt-5 max-w-xl text-base text-[hsl(var(--muted-foreground))] leading-relaxed">
          Sugestões de bebidas para um brinde à amizade. Clique em qualquer
          item para ser direcionado à loja. Pode escolher por tipo, marca ou
          pelo que combinar mais com você.
        </p>
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
                <Wine className="w-4 h-4 text-[hsl(var(--accent))] group-hover:text-[hsl(var(--primary))] transition-colors" />
                <span className="meta-label">{item.categoria}</span>
              </div>

              <h3 className="font-display italic text-2xl md:text-3xl leading-tight group-hover:text-[hsl(var(--primary))] transition-colors">
                {item.titulo}
              </h3>

              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
                {item.descricao}
              </p>

              <div className="mt-auto pt-5 border-t border-[hsl(var(--border))]">
                <div className="flex items-baseline gap-3">
                  <span className="meta-label w-16">Loja</span>
                  <span className="text-sm text-[hsl(var(--foreground))]">
                    {item.loja}
                  </span>
                </div>
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
            As marcas e lojas acima são apenas referências. Pode trazer outra
            bebida da sua escolha — o importante é o brinde junto. Se preferir,
            também é bem-vinda uma garrafa especial da sua coleção.
          </p>
        </div>
      </section>
    </div>
  );
}
