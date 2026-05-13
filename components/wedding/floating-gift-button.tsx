"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";

export default function FloatingGiftButton() {
    const pathname = usePathname();

    const hide = pathname?.startsWith("/presentes") || pathname?.startsWith("/checkout");

    return (
        <AnimatePresence>
            {!hide && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Link
                            href="/presentes"
                            aria-label="Ver lista de presentes"
                            className="group relative inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] ring-1 ring-[hsl(var(--primary))]/40 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
                        >
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-full bg-[hsl(var(--primary))]/40 animate-ping"
                            />
                            <Gift className="relative w-6 h-6 md:w-7 md:h-7" />
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
