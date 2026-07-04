"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import MetaLabel from "@/components/wedding/meta-label";
import type { GallerySlide } from "@/components/wedding/gallery-carousel";

const AUTOPLAY_INTERVAL_MS = 4000;

type HomePhotoCarouselProps = {
  slides: GallerySlide[];
  label?: string;
};

export default function HomePhotoCarousel({
  slides,
  label = "Pré-wedding",
}: HomePhotoCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  }, [slides.length]);

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) return;

    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el || pausedRef.current) return;

      const slide = el.querySelector<HTMLElement>("[data-home-slide]");
      const gap = 16;
      const step = slide ? slide.offsetWidth + gap : el.clientWidth * 0.5;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [reduceMotion, slides.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft" && slides.length > 1) {
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + slides.length) % slides.length,
        );
      }
      if (e.key === "ArrowRight" && slides.length > 1) {
        setLightboxIndex((i) => (i === null ? null : (i + 1) % slides.length));
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

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const scrollByView = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * dir, behavior: "smooth" });
  };

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
                    (i) => (i === null ? 0 : i - 1 + slides.length) % slides.length,
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
                className="object-contain object-center"
                priority
              />
            </div>

            {slides.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((i) =>
                    i === null ? 0 : (i + 1) % slides.length,
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
      document.body,
    );

  if (slides.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {lightbox}

      <div className="flex items-end justify-between mb-8">
        <MetaLabel>{label}</MetaLabel>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByView(-1)}
            disabled={!canPrev}
            aria-label="Fotos anteriores"
            className="group inline-flex items-center justify-center h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[hsl(var(--border))] disabled:hover:text-[hsl(var(--foreground))]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByView(1)}
            disabled={!canNext}
            aria-label="Próximas fotos"
            className="group inline-flex items-center justify-center h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[hsl(var(--border))] disabled:hover:text-[hsl(var(--foreground))]"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        role="group"
        aria-roledescription="carrossel"
        aria-label="Fotos do pré-wedding"
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth scrollbar-hide"
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            data-home-slide
            className="group snap-start shrink-0 basis-[calc((100%-1rem)/2)] sm:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-3rem)/4)]"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(slideIndex)}
              className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
            >
              <span className="sr-only">Ampliar: {slide.alt}</span>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-[hsl(var(--primary))] bg-[hsl(var(--secondary))]/40 transition-colors">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
