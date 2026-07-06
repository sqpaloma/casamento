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
    text: "Pedimos traje Black Tie. Para elas, vestidos longos. Para eles, smoking ou terno escuro com gravata. Pedimos apenas que evitem a cor branca, reservada à noiva.",
  },
  {
    icon: Hotel,
    title: "Hospedagem",
    subtitle: "Hospedagem",
    text: "Para quem vem de outras cidades ou prefere maior comodidade, recomendamos hotéis nas regiões da Bela Vista, Brooklin e arredores. Reserve sua hospedagem com antecedência para garantir melhores tarifas.",
  },
  {
    icon: Car,
    title: "Como chegar",
    subtitle: "Transporte",
    text: "O espaço contará com serviço de valet, disponível mediante pagamento no local. Caso prefira, recomendamos utilizar aplicativos como Uber ou 99 para aproveitar a festa com tranquilidade.",
  },
  {
    icon: Gift,
    title: "Lista de Presentes",
    subtitle: "Presentes",
    text: "A presença de vocês já é o nosso maior presente! Para quem desejar nos presentear, preparamos uma lista com muito carinho na área \"Lista de Presentes\" do nosso site.",
  },
  {
    icon: Camera,
    title: "Registre esse momento",
    subtitle: "Fotos",
    text: "Durante a cerimônia, pedimos gentilmente que mantenham os celulares guardados para que todos possam viver esse momento de forma especial. Depois, aproveitem para registrar muitos momentos da festa e compartilhar as fotos conosco.",
  },
  {
    icon: Heart,
    title: "Crianças são bem-vindas",
    subtitle: "Crianças",
    text: "As crianças são muito bem-vindas para celebrar este dia conosco! O espaço contará com uma área kids e equipe especializada para que elas também aproveitem a festa com segurança e diversão.",
  },
  {
    icon: CloudSun,
    title: "Setembro em São Paulo",
    subtitle: "Clima",
    text: "Setembro costuma ter dias agradáveis e noites mais frescas. Recomendamos levar um casaco leve, pashmina ou estola para maior conforto após a cerimônia.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restrições Alimentares",
    subtitle: "Cardápio",
    text: "Possui alguma alergia, intolerância ou restrição alimentar? Não se preocupe! Informe-nos quando solicitado para que possamos repassar todas as informações ao buffet.",
  },
  {
    icon: CalendarCheck,
    title: "Confirmação de Presença",
    subtitle: "Confirmação",
    text: "Sua confirmação é muito importante para a organização do casamento. O convite para confirmação será enviado pela nossa assessora através do WhatsApp. Pedimos, por gentileza, que responda assim que receber a mensagem para que possamos organizar cada detalhe com carinho.",
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
