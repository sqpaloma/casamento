"use client";

import { motion } from "framer-motion";
import MetaLabel from "@/components/wedding/meta-label";
import {
  GalleryCarouselSection,
  type GallerySlide,
} from "@/components/wedding/gallery-carousel";

const preWedding: GallerySlide[] = [
  {
    src: "/3702b9a4-0983-40cf-a758-a2baa48193ff.JPG",
    alt: "Pré-wedding — momento do casal",
  },
  {
    src: "/fef6d5d0-bcaa-420e-b758-17471879db75.JPG",
    alt: "Pré-wedding — celebração com amigos",
  },
  {
    src: "/b043e187-9217-4c30-abdd-b94824454cd6.JPG",
    alt: "Pré-wedding — registro do dia",
  },
  {
    src: "/igreja.png",
    alt: "Pré-wedding — ilustração da igreja",
  },
];

const jantarPadrinhos: GallerySlide[] = [
  {
    src: "/Arine%20e%20Pedro.JPG",
    alt: "Jantar com os padrinhos — Arine e Pedro",
  },
  {
    src: "/Grazi%20e%20Guilherme.JPG",
    alt: "Jantar com os padrinhos — Grazi e Guilherme",
  },
  {
    src: "/Maiana%20e%20Ricardo.JPG",
    alt: "Jantar com os padrinhos — Maiana e Ricardo",
  },
  {
    src: "/Mayara%20e%20Wlademir.JPG",
    alt: "Jantar com os padrinhos — Mayara e Wlademir",
  },
];

const sections: {
  title: string;
  comingSoon?: boolean;
  slides: GallerySlide[];
}[] = [
  { title: "Pré-wedding", slides: preWedding },
  { title: "Jantar com os padrinhos", slides: jantarPadrinhos },
  { title: "Chá lingerie e bar (em breve)", comingSoon: true, slides: [] },
  { title: "Despedida de solteiro (em breve)", comingSoon: true, slides: [] },
  { title: "Casamento em breve", comingSoon: true, slides: [] },
];

export default function GaleriaPage() {
  return (
    <div className="relative pt-32 pb-20">
      <section className="px-[5vw] md:px-[8vw] mb-12 md:mb-16">
        <MetaLabel className="mb-6">08 · Memórias</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)", letterSpacing: "-0.04em" }}
        >
          Galeria
        </h1>
        <p className="mt-8 max-w-xl text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
          Alguns registros do nosso caminho. Depois do grande dia, este espaço
          ganha ainda mais história.
        </p>
      </section>

      <section className="px-[5vw] md:px-[8vw]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-px w-full bg-[hsl(var(--border))] mb-16 md:mb-20"
        />
        {sections.map((block, i) => (
          <GalleryCarouselSection
            key={block.title}
            title={block.title}
            comingSoon={block.comingSoon}
            slides={block.slides}
            index={i}
          />
        ))}
      </section>
    </div>
  );
}
