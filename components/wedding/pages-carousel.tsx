"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Card = {
    num: string;
    label: string;
    path: string;
    description: string;
};

const cards: Card[] = [
    {
        num: "02",
        label: "Nossa História",
        path: "/historia",
        description: "Do acaso ao altar — cada capítulo que nos trouxe até aqui.",
    },
    {
        num: "03",
        label: "Padrinhos",
        path: "/padrinhos",
        description: "Os que caminham ao nosso lado e assinam conosco este voto.",
    },
    {
        num: "04",
        label: "Chá de Lingerie & Bar",
        path: "/cha",
        description: "Uma tarde entre amigas e uma noite entre amigos.",
    },
    {
        num: "05",
        label: "Cerimônia & Recepção",
        path: "/cerimonia",
        description: "Detalhes da celebração que selará o nosso para sempre.",
    },
    {
        num: "06",
        label: "Mensagens",
        path: "/mensagens",
        description: "Deixe uma palavra que guardaremos para a eternidade.",
    },
    {
        num: "07",
        label: "Dicas",
        path: "/dicas",
        description: "Hospedagem, trajes e tudo o que você precisa saber.",
    },
    {
        num: "08",
        label: "Galeria",
        path: "/galeria",
        description: "Registros do nosso caminho até o grande dia.",
    },
    {
        num: "09",
        label: "Lista de Presentes",
        path: "/presentes",
        description: "Uma forma carinhosa de fazer parte da nossa nova jornada.",
    },
];

export default function PagesCarousel() {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const updateButtons = () => {
        const el = scrollerRef.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        updateButtons();
        const el = scrollerRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateButtons, { passive: true });
        window.addEventListener("resize", updateButtons);
        return () => {
            el.removeEventListener("scroll", updateButtons);
            window.removeEventListener("resize", updateButtons);
        };
    }, []);

    const scrollBy = (dir: 1 | -1) => {
        const el = scrollerRef.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>("[data-card]");
        const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
        el.scrollBy({ left: step * dir, behavior: "smooth" });
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-8">
                <span className="meta-label">Capítulos</span>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => scrollBy(-1)}
                        disabled={!canPrev}
                        aria-label="Anterior"
                        className="group inline-flex items-center justify-center h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[hsl(var(--border))] disabled:hover:text-[hsl(var(--foreground))]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollBy(1)}
                        disabled={!canNext}
                        aria-label="Próximo"
                        className="group inline-flex items-center justify-center h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[hsl(var(--border))] disabled:hover:text-[hsl(var(--foreground))]"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollerRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pr-6 md:pr-10 scroll-smooth scrollbar-hide"
            >
                {cards.map((card, i) => (
                    <motion.div
                        key={card.path}
                        data-card
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                            duration: 0.7,
                            delay: i * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="snap-start shrink-0 w-[78vw] sm:w-[55vw] md:w-[360px] lg:w-[380px]"
                    >
                        <Link
                            href={card.path}
                            className="group relative block h-[380px] md:h-[420px] p-8 md:p-10 border border-[hsl(var(--border))] bg-white/40 backdrop-blur-sm overflow-hidden transition-colors hover:border-[hsl(var(--primary))]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--primary))]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex items-start justify-between">
                                    <span className="meta-label">{card.num}</span>
                                    <span className="h-px w-10 bg-[hsl(var(--accent))] mt-3 transition-all duration-500 group-hover:w-16 group-hover:bg-[hsl(var(--primary))]" />
                                </div>

                                <div>
                                    <h3
                                        className="font-display italic text-4xl md:text-5xl leading-[0.95] text-[hsl(var(--foreground))] transition-colors duration-500 group-hover:text-[hsl(var(--primary))]"
                                        style={{ letterSpacing: "-0.02em" }}
                                    >
                                        {card.label}
                                    </h3>
                                    <p className="mt-5 text-sm leading-relaxed text-[hsl(var(--muted-foreground))] max-w-[28ch]">
                                        {card.description}
                                    </p>

                                    <div className="mt-8 inline-flex items-center gap-3">
                                        <span className="meta-label transition-colors group-hover:text-[hsl(var(--primary))]">
                                            Explorar
                                        </span>
                                        <ArrowRight className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] transition-all duration-500 group-hover:translate-x-1 group-hover:text-[hsl(var(--primary))]" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
