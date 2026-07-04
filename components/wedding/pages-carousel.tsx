"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type MouseEvent,
    type PointerEvent,
    type WheelEvent,
} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Card = {
    label: string;
    path: string;
    description: string;
};

const cards: Card[] = [
    {
        label: "Nossa História",
        path: "/historia",
        description: "Do acaso ao altar — cada capítulo que nos trouxe até aqui.",
    },
    {
        label: "Padrinhos",
        path: "/padrinhos",
        description: "Os que caminham ao nosso lado e assinam conosco este voto.",
    },
    {
        label: "Chá de Lingerie & Bar",
        path: "/cha",
        description: "Uma tarde entre amigas e uma noite entre amigos.",
    },
    {
        label: "Cerimônia & Recepção",
        path: "/cerimonia",
        description: "Detalhes da celebração que selará o nosso para sempre.",
    },
    {
        label: "Mensagens",
        path: "/mensagens",
        description: "Deixe uma palavra que guardaremos para a eternidade.",
    },
    {
        label: "Dicas",
        path: "/dicas",
        description: "Hospedagem, trajes e tudo o que você precisa saber.",
    },
    {
        label: "Galeria",
        path: "/galeria",
        description: "Registros do nosso caminho até o grande dia.",
    },
    {
        label: "Lista de Presentes",
        path: "/presentes",
        description: "Uma forma carinhosa de fazer parte da nossa nova jornada.",
    },
];

export default function PagesCarousel() {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef<{
        pointerId: number | null;
        startX: number;
        startY: number;
        startOffset: number;
        axis: "x" | "y" | null;
        hasDragged: boolean;
        captured: boolean;
    }>({
        pointerId: null,
        startX: 0,
        startY: 0,
        startOffset: 0,
        axis: null,
        hasDragged: false,
        captured: false,
    });
    const suppressClickRef = useRef(false);
    const [offset, setOffset] = useState(0);
    const [maxOffset, setMaxOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const updateMetrics = useCallback(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const nextMaxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
        setMaxOffset(nextMaxOffset);
        setOffset((currentOffset) => Math.min(currentOffset, nextMaxOffset));
    }, []);

    useEffect(() => {
        updateMetrics();
        window.addEventListener("resize", updateMetrics);
        return () => {
            window.removeEventListener("resize", updateMetrics);
        };
    }, [updateMetrics]);

    const scrollBy = (dir: 1 | -1) => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const card = track.querySelector<HTMLElement>("[data-card]");
        const step = card ? card.offsetWidth + 24 : viewport.clientWidth * 0.8;
        setOffset((currentOffset) =>
            Math.min(Math.max(currentOffset + step * dir, 0), maxOffset),
        );
    };

    const clampOffset = useCallback(
        (value: number) => Math.min(Math.max(value, 0), maxOffset),
        [maxOffset],
    );

    const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
        const horizontalDelta =
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
                ? event.deltaX
                : event.shiftKey
                    ? event.deltaY
                    : 0;

        if (horizontalDelta === 0) return;

        event.preventDefault();
        setOffset((currentOffset) => clampOffset(currentOffset + horizontalDelta));
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startOffset: offset,
            axis: null,
            hasDragged: false,
            captured: false,
        };
        setIsDragging(true);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (drag.pointerId !== event.pointerId) return;

        const deltaX = event.clientX - drag.startX;
        const deltaY = event.clientY - drag.startY;

        if (!drag.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 6) {
            drag.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
        }

        if (drag.axis !== "x") return;

        if (!drag.captured) {
            event.currentTarget.setPointerCapture(event.pointerId);
            drag.captured = true;
        }

        event.preventDefault();
        drag.hasDragged = true;
        setOffset(clampOffset(drag.startOffset - deltaX));
    };

    const endDrag = (event: PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (drag.pointerId !== event.pointerId) return;

        if (drag.captured) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        if (drag.hasDragged) {
            suppressClickRef.current = true;
            window.setTimeout(() => {
                suppressClickRef.current = false;
            }, 0);
        }
        dragRef.current.pointerId = null;
        setIsDragging(false);
    };

    const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
        if (!suppressClickRef.current) return;

        event.preventDefault();
        event.stopPropagation();
        suppressClickRef.current = false;
    };

    const canPrev = offset > 4;
    const canNext = offset < maxOffset - 4;

    return (
        <div className="relative z-10 isolate min-w-0">
            <div className="flex items-center justify-between mb-8">
                <span className="meta-label">Nosso Livro</span>
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
                ref={viewportRef}
                onWheel={handleWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onClickCapture={handleClickCapture}
                className="h-[380px] md:h-[420px] w-full min-w-0 overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
            >
                <div
                    ref={trackRef}
                    className="flex gap-6 pr-6 md:pr-10 will-change-transform"
                    style={{
                        transform: `translate3d(${-offset}px, 0, 0)`,
                        transition: isDragging
                            ? "none"
                            : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                >
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.path}
                            data-card
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.06,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="shrink-0 w-[calc(100vw-10vw-1.5rem)] sm:w-[calc(100vw-10vw-2rem)] md:w-[360px] lg:w-[380px]"
                            onAnimationComplete={updateMetrics}
                        >
                            <Link
                                href={card.path}
                                className="group relative block h-[380px] md:h-[420px] p-8 md:p-10 border border-[hsl(var(--border))] bg-white/90 backdrop-blur-sm overflow-hidden transition-colors hover:border-[hsl(var(--primary))]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--primary))]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="flex items-start justify-between">
                                        <span className="meta-label">{String(i + 1).padStart(2, "0")}</span>
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
        </div>
    );
}
