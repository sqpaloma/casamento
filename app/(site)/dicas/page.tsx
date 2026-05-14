"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Shirt, Hotel, Car, Gift, Camera, Heart, CloudSun, UtensilsCrossed, CalendarCheck } from "lucide-react";
import MetaLabel from "@/components/wedding/meta-label";

type Tip = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  text: string;
};

const tips: Tip[] = [
  {
    icon: Shirt,
    title: "Dress Code",
    subtitle: "Black Tie",
    text: "Pedimos trajes de gala. Elas: vestidos longos. Eles: smoking ou terno escuro. Evite branco — reservado à noiva.",
  },
  {
    icon: Hotel,
    title: "Hospedagem",
    subtitle: "Sugestões",
    text: "Reservamos tarifas especiais em hotéis próximos à Bela Vista e ao Brooklin. Consulte a lista completa enviada por e-mail.",
  },
  {
    icon: Car,
    title: "Como chegar",
    subtitle: "Transporte",
    text: "Haverá valet gratuito no local. Recomendamos Uber/99 para quem prefere brindar sem preocupação.",
  },
  {
    icon: Gift,
    title: "Presentes",
    subtitle: "Lista",
    text: "Sua presença já é o maior presente. Para quem quiser, nossa lista editorial está disponível na área \"Lista de Presentes\".",
  },
  {
    icon: Camera,
    title: "Fotos",
    subtitle: "Momento presença",
    text: "Pedimos celulares guardados durante a cerimônia. Depois, compartilhe suas imagens com #PalomaERodrigo2025.",
  },
  {
    icon: Heart,
    title: "Crianças",
    subtitle: "Crianças bem-vindas",
    text: "Crianças são bem-vindas para celebrar conosco! O espaço conta com área kids e equipe para cuidar dos pequenos.",
  },
  {
    icon: CloudSun,
    title: "Clima",
    subtitle: "Setembro em SP",
    text: "Dias amenos e noites mais frescas. O traje de gala combina com um casaquinho, estola ou pashmina para depois da cerimônia.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cardápio",
    subtitle: "Restrições",
    text: "Há intolerâncias, alergias ou restrições alimentares importantes? Avise-nos com antecedência para informarmos o buffet.",
  },
  {
    icon: CalendarCheck,
    title: "Confirmação",
    subtitle: "RSVP",
    text: "Sua confirmação de presença ajuda no planejamento de lugares e cardápio. Responda pelo convite ou pelo canal que indicarmos.",
  },
];

export default function DicasPage() {
  return (
    <div className="relative pt-28 pb-12 md:pt-28 md:pb-14">
      <section className="px-[5vw] md:px-[8vw] mb-5 md:mb-6">
        <MetaLabel className="mb-3 md:mb-4">07 · Guia do convidado</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
          style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)", letterSpacing: "-0.04em" }}
        >
          Dicas
        </h1>
        <p className="mt-3 md:mt-4 max-w-xl text-sm md:text-base text-[hsl(var(--muted-foreground))] leading-snug md:leading-relaxed">
          Tudo o que você precisa para viver conosco o dia inteiro — do traje ao
          transporte, passando por cada pequeno detalhe.
        </p>
      </section>

      <section className="px-[5vw] md:px-[8vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[hsl(var(--border))]">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <motion.article
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                className="group relative flex min-h-0 flex-col overflow-hidden bg-background p-5 md:p-6"
              >
                <div className="absolute right-4 top-4 md:right-5 md:top-5">
                  <Icon className="h-4 w-4 text-[hsl(var(--accent))] transition-colors group-hover:text-[hsl(var(--primary))]" />
                </div>

                <MetaLabel className="mb-3 pr-8">
                  {String(i + 1).padStart(2, "0")} · {tip.subtitle}
                </MetaLabel>

                <h3
                  className="mb-2 font-display italic leading-[0.95]"
                  style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)" }}
                >
                  {tip.title}
                </h3>

                <p className="max-w-md text-sm leading-relaxed text-[hsl(var(--muted-foreground))] md:text-[0.9375rem] md:leading-snug">
                  {tip.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
