"use client";

import { motion } from "framer-motion";
import MetaLabel from "@/components/wedding/meta-label";

type Couple = { first: string; second: string };
type Solo = { name: string };

const couples: Couple[] = [
  { first: "Tainah", second: "Thiago" },
  { first: "Mayara", second: "Wlademir" },
  { first: "Arine", second: "Pedro" },
  { first: "Maiana", second: "Ricardo" },
  { first: "Barbara", second: "Ricardo" },
  { first: "Grazi", second: "Guilherme" },
  { first: "Verônica", second: "Ramiro" },
  { first: "Andressa", second: "Cesar" },
];

const madrinhas: Solo[] = [
  { name: "Amanda" },
  { name: "Michele" },
];

const padrinhos: Solo[] = [
  { name: "Lucas" },
  { name: "Bruno" },
];

export default function PadrinhosPage() {
  return (
    <div className="relative pt-32 pb-20">
      {/* Imagem de fundo dos padrinhos com transparência */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/padrinhos-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.12,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 25%, transparent 75%, hsl(var(--background)) 100%)",
        }}
      />

      <section className="relative px-[5vw] md:px-[8vw] mb-10">
        <MetaLabel className="mb-6">03 · Círculo íntimo</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)", letterSpacing: "-0.04em" }}
        >
          Padrinhos
        </h1>
        <p className="mt-10 max-w-xl text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
          Os que caminharam conosco antes — e que escolhemos para estar ao nosso
          lado no momento em que tudo se transforma.
        </p>
      </section>

      {/* Casais */}
      <section className="relative px-[5vw] md:px-[8vw] mb-24 md:mb-32">
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <MetaLabel>Madrinhas e Padrinhos</MetaLabel>
          <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
            {String(couples.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[hsl(var(--border))]">
          {couples.map((c, i) => (
            <motion.div
              key={`${c.first}-${c.second}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className="group relative bg-background/80 backdrop-blur-sm p-6 md:p-8 min-h-[200px] flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-[hsl(var(--primary))]/0 group-hover:bg-[hsl(var(--primary))]/5 transition-colors duration-500" />

              <div className="relative flex items-start justify-between">
                <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="meta-label">Casal</span>
              </div>

              <div className="relative">
                <h3 className="font-display italic text-2xl md:text-[1.75rem] leading-[1.1] group-hover:text-[hsl(var(--primary))] transition-colors">
                  {c.first}
                  <span className="text-[hsl(var(--muted-foreground))] font-normal not-italic mx-1.5">
                    &
                  </span>
                  {c.second}
                </h3>
                <p className="meta-label mt-3">Madrinha · Padrinho</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Madrinhas e Padrinhos avulso */}
      <section className="relative px-[5vw] md:px-[8vw]">
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <MetaLabel>Madrinhas · Padrinhos</MetaLabel>
          <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
            {String(madrinhas.length + padrinhos.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[hsl(var(--border))]">
          {[
            ...madrinhas.map((p) => ({ ...p, role: "Madrinha", side: "Ela" })),
            ...padrinhos.map((p) => ({ ...p, role: "Padrinho", side: "Ele" })),
          ].map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className="group relative bg-background/80 backdrop-blur-sm p-6 md:p-8 min-h-[200px] flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-[hsl(var(--primary))]/0 group-hover:bg-[hsl(var(--primary))]/5 transition-colors duration-500" />

              <div className="relative flex items-start justify-between">
                <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="meta-label">{p.side}</span>
              </div>

              <div className="relative">
                <h3 className="font-display italic text-2xl md:text-[1.75rem] leading-[1.1] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                  {p.name}
                </h3>
                <p className="meta-label">{p.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
