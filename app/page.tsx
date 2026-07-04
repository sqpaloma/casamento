"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
const MAX = 240;
const DRAG_THRESHOLD = MAX * 0.85;

export default function ThresholdPage() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [reveal, setReveal] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef(false);
  const didDragRef = useRef(false);
  const x = useMotionValue(0);

  const revealDelayMs = reduceMotion ? 600 : 1400;
  const revealDuration = reduceMotion ? 0.4 : 1.2;
  const overlayDuration = reduceMotion ? 0.6 : 1.4;

  const sealOpacity = useTransform(x, [0, MAX], [1, 0]);
  const sealScale = useTransform(x, [0, MAX], [1, 0.6]);
  const progress = useTransform(x, [0, MAX], [0, 1]);
  const progressPct = useTransform(progress, (v) => `${Math.round(v * 100)}%`);

  const triggerReveal = useCallback(() => {
    setReveal(true);
    setTimeout(() => router.push("/home"), revealDelayMs);
  }, [revealDelayMs, router]);

  // Glide the seal across the track (the same left-to-right drag motion),
  // then play the reveal once it reaches the end.
  const openInvite = useCallback(() => {
    if (openingRef.current || reveal) return;
    openingRef.current = true;
    const slideTransition = reduceMotion
      ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }
      : { type: "spring" as const, stiffness: 120, damping: 20 };
    animate(x, MAX, { ...slideTransition, onComplete: triggerReveal });
  }, [reduceMotion, reveal, triggerReveal, x]);

  const handleDragStart = () => {
    didDragRef.current = true;
  };

  const handleDragEnd = () => {
    if (x.get() >= DRAG_THRESHOLD) {
      openInvite();
    } else {
      animate(x, 0, { type: "spring", stiffness: 140, damping: 18 });
    }
    requestAnimationFrame(() => {
      didDragRef.current = false;
    });
  };

  const handleSealClick = () => {
    if (didDragRef.current) return;
    openInvite();
  };

  const handleSealKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      event.stopPropagation();
      openInvite();
    }
  };

  const revealAnimate = reveal
    ? reduceMotion
      ? { scale: 1.02, opacity: 0, filter: "blur(0px)" }
      : { scale: 3, opacity: 0, filter: "blur(20px)" }
    : { scale: 1, opacity: 1, filter: "blur(0px)" };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden grain-overlay">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <video
          src="/casados-igreja.mp4"
          autoPlay={!reduceMotion}
          loop={!reduceMotion}
          muted
          playsInline
          preload={reduceMotion ? "metadata" : "auto"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/75" />
      </div>

      <div aria-live="polite" className="sr-only">
        {reveal ? "Abrindo convite…" : ""}
      </div>

      <motion.div
        animate={revealAnimate}
        transition={{ duration: revealDuration, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-between px-[5vw] md:px-[8vw] py-10"
      >
        <div className="w-full flex items-center justify-between">
          <span className="meta-label">Convite · N° 001</span>
          <span className="meta-label hidden md:inline">
            05.09.2026 · São Paulo
          </span>
        </div>

        <div className="flex flex-col items-center text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="meta-label mb-10"
          >
            Você está convidado para
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-[hsl(var(--foreground))] leading-[0.92]"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              letterSpacing: "-0.04em",
            }}
          >
            O Casamento
            <br />
            <span className="not-italic text-[hsl(var(--primary))]">de</span>{" "}
            Paloma
            <span className="not-italic text-[hsl(var(--primary))] mx-4">
              &amp;
            </span>
            Rodrigo
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-10 flex items-center gap-5"
          >
            <span className="h-px w-12 bg-[hsl(var(--accent))]" />
            <span className="font-mono text-sm tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
              05 · SET · 2026
            </span>
            <span className="h-px w-12 bg-[hsl(var(--accent))]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div
            ref={constraintsRef}
            role="group"
            aria-label="Abrir convite — deslize para a direita"
            className="relative h-16 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--secondary))]/50 backdrop-blur-sm overflow-hidden"
          >
            <motion.div
              style={{ width: progressPct }}
              className="absolute inset-y-0 left-0 bg-[hsl(var(--primary))]/15"
              aria-hidden
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="meta-label text-[hsl(var(--muted-foreground))]">
                Deslize →
              </span>
            </div>

            <motion.button
              type="button"
              drag="x"
              dragConstraints={{ left: 0, right: MAX }}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onClick={handleSealClick}
              onKeyDown={handleSealKeyDown}
              disabled={reveal}
              style={{ x, opacity: sealOpacity, scale: sealScale }}
              whileTap={{ cursor: "grabbing" }}
              className="absolute top-1 left-1 h-14 w-14 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_30px_rgba(31,61,125,0.35)] outline-none focus-visible:ring-[3px] focus-visible:ring-[hsl(var(--ring))]/50 disabled:pointer-events-none"
              aria-label="Abrir convite — deslize, clique ou pressione Enter"
            >
              <span
                className="font-display italic text-[hsl(var(--primary-foreground))] text-xl"
                aria-hidden
              >
                R&amp;P
              </span>
            </motion.button>
          </div>
        </motion.div>

        <div className="w-full flex items-center justify-between">
          <span className="meta-label">
            {reveal ? "Abrindo convite" : "Aguardando abertura"}
          </span>
          <span className="meta-label">Eternal Archive</span>
        </div>
      </motion.div>

      {reveal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: reduceMotion ? [0, 0.6, 0] : [0, 1, 0],
          }}
          transition={{ duration: overlayDuration, times: [0, 0.4, 1] }}
          className="fixed inset-0 z-50 bg-[hsl(var(--primary))] pointer-events-none"
          aria-hidden
        />
      )}
    </div>
  );
}
