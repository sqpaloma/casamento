"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type GallerySlide = { src: string; alt: string };

type GalleryCarouselSectionProps = {
  title: string;
  comingSoon?: boolean;
  slides: GallerySlide[];
  index: number;
};

export function GalleryCarouselSection({
  title,
  comingSoon = false,
  slides,
  index,
}: GalleryCarouselSectionProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [mounted, setMounted] = useState(false);
  /** Índice da foto aberta no lightbox, ou null */
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const updateButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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
  }, [comingSoon, slides.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft" && slides.length > 1) {
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + slides.length) % slides.length
        );
      }
      if (e.key === "ArrowRight" && slides.length > 1) {
        setLightboxIndex((i) =>
          i === null ? null : (i + 1) % slides.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex, slides.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-gallery-slide]");
    const gap = 16;
    const step = slide ? slide.offsetWidth + gap : el.clientWidth * 0.5;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const lightboxSlide =
    lightboxIndex !== null ? slides[lightboxIndex] ?? null : null;

  const lightbox =
    mounted &&
    lightboxSlide &&
    createPortal(
      <div
        className="fixed inset-0 z-[300] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Foto em tamanho grande"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/92"
          aria-label="Fechar visualização"
          onClick={closeLightbox}
        />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col pointer-events-none">
          <div className="pointer-events-auto flex shrink-0 justify-end p-3 md:p-4">
            <button
              type="button"
              onClick={closeLightbox}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="pointer-events-auto flex min-h-0 flex-1 items-center justify-center gap-2 px-2 pb-4 sm:gap-3 md:gap-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (i) =>
                      (i === null ? 0 : i - 1 + slides.length) % slides.length
                  )
                }
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:h-11 sm:w-11"
                aria-label="Foto anterior"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            <div className="relative h-[min(82dvh,880px)] w-full min-w-0 max-w-[min(92vw,1200px)]">
              <Image
                src={lightboxSlide.src}
                alt={lightboxSlide.alt}
                fill
                sizes="100vw"
                className="object-contain object-top"
                priority
              />
            </div>

            {slides.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((i) =>
                    i === null ? 0 : (i + 1) % slides.length
                  )
                }
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:h-11 sm:w-11"
                aria-label="Próxima foto"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>

          {slides.length > 1 && lightboxIndex !== null && (
            <p className="pointer-events-auto shrink-0 pb-4 text-center text-xs text-white/50">
              {lightboxIndex + 1} / {slides.length} · teclado ← →
            </p>
          )}
        </div>
      </div>,
      document.body
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20 md:mb-28 last:mb-0"
    >
      {lightbox}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-6 md:mb-8">
        <div>
          <h2
            className="font-display italic text-3xl md:text-4xl leading-tight text-[hsl(var(--foreground))]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {title}
          </h2>
        </div>
        {!comingSoon && slides.length > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Fotos anteriores"
              className="group inline-flex items-center justify-center h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[hsl(var(--border))] disabled:hover:text-[hsl(var(--foreground))]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Próximas fotos"
              className="group inline-flex items-center justify-center h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[hsl(var(--border))] disabled:hover:text-[hsl(var(--foreground))]"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {comingSoon ? (
        <div className="relative aspect-[16/9] max-h-[320px] border border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/20 flex items-center justify-center">
          <p className="font-display italic text-2xl md:text-3xl text-[hsl(var(--muted-foreground))]">
            Em breve
          </p>
        </div>
      ) : slides.length === 0 ? (
        <div className="relative aspect-[16/9] max-h-[320px] border border-dashed border-[hsl(var(--border))] flex items-center justify-center text-sm text-[hsl(var(--muted-foreground))]">
          Fotos deste momento ainda não foram adicionadas.
        </div>
      ) : (
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth scrollbar-hide -mx-[5vw] px-[5vw] md:-mx-[8vw] md:px-[8vw]"
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.src}
              data-gallery-slide
              className="snap-start shrink-0 w-[10.25rem] sm:w-[11.25rem] md:w-[12.25rem]"
            >
              <button
                type="button"
                onClick={() => openLightbox(slideIndex)}
                className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
              >
                <span className="sr-only">Ampliar: {slide.alt}</span>
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/40 transition-colors group-hover:border-[hsl(var(--primary))]/50">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 168px, 204px"
                    className="object-contain object-top p-1 grayscale contrast-[1.02] transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100"
                  />
                </div>
                <span className="mt-2 block text-center text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--muted-foreground))] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Ver em tamanho grande
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
