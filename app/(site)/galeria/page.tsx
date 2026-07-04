"use client";

import { motion } from "framer-motion";
import MetaLabel from "@/components/wedding/meta-label";
import {
  GalleryCarouselSection,
  type GallerySlide,
} from "@/components/wedding/gallery-carousel";
import { preWeddingSlides as preWedding } from "@/lib/gallery-slides";

const jantarPadrinhos: GallerySlide[] = [
  { src: "/padrinhos/Arine%20e%20Pedro.JPG", alt: "Jantar com os padrinhos — Arine e Pedro" },
  { src: "/padrinhos/Grazi%20e%20Guilherme.JPG", alt: "Jantar com os padrinhos — Grazi e Guilherme" },
  { src: "/padrinhos/Maiana%20e%20Ricardo.JPG", alt: "Jantar com os padrinhos — Maiana e Ricardo" },
  { src: "/padrinhos/Mayara%20e%20Wlademir.JPG", alt: "Jantar com os padrinhos — Mayara e Wladimir" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.14.25.jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.34.jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.34%20(1).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.35.jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.35%20(1).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.35%20(2).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.35%20(3).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.36.jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.36%20(1).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.36%20(2).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.36%20(3).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.37.jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.37%20(1).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.37%20(2).jpeg", alt: "Jantar com os padrinhos" },
  { src: "/padrinhos/WhatsApp%20Image%202026-07-03%20at%2021.22.38.jpeg", alt: "Jantar com os padrinhos" },
];

const chaLingerie: GallerySlide[] = [
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.21.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.21%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.22.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.22%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.22%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.23.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.23%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.23%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.24.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.24%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.24%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.24%20(3).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.25.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.25%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.25%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.25%20(3).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.26.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.26%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.26%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.26%20(3).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.27.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.27%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.27%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.27%20(3).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.28.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.28%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.28%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.29.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.29%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.29%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.30.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.30%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.30%20(2).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.30%20(3).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.31.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.31.31%20(1).jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.40.45.jpeg", alt: "Chá lingerie e bar" },
  { src: "/cha/WhatsApp%20Image%202026-07-03%20at%2021.42.49.jpeg", alt: "Chá lingerie e bar" },
];

const sections: {
  title: string;
  comingSoon?: boolean;
  slides: GallerySlide[];
}[] = [
  { title: "Pré-wedding", slides: preWedding },
  { title: "Jantar com os padrinhos", slides: jantarPadrinhos },
  { title: "Chá lingerie e bar", slides: chaLingerie },
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
