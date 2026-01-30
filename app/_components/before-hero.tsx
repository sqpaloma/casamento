"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface InvitationOverlayProps {
    onOpen?: () => void;
}

export default function InvitationOverlay({ onOpen }: InvitationOverlayProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    // Scroll lock
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "auto";
            };
        }
    }, [isVisible]);

    // Entrance animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasEntered(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        if (isExiting) return;

        setIsExiting(true);

        // Notify parent immediately
        if (onOpen) {
            onOpen();
        }

        // Remove overlay after animation
        setTimeout(() => {
            setIsVisible(false);
        }, 2500);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label="Clique para abrir o convite"
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            }}
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none bg-gradient-to-b from-[#dce8f7] via-[#C9DBF3] to-[#b8cce8] transition-all duration-[2500ms] ease-in-out ${isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
                }`}
            style={isExiting ? { backgroundColor: "#ffffff" } : undefined}
        >
            <div
                className={`mb-6 text-white/60 text-4xl tracking-[0.3em] font-light transition-all duration-[1500ms] ease-out ${hasEntered && !isExiting ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                    }`}
                style={{ transitionDelay: hasEntered ? "200ms" : "0ms" }}
                aria-hidden="true"
                suppressHydrationWarning
            >

            </div>

            <div
                className={`relative w-[80vw] max-w-[420px] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] rounded-lg overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-all duration-[2000ms] ease-out ${hasEntered && !isExiting
                    ? "opacity-100 scale-100 translate-y-0"
                    : isExiting
                        ? "opacity-0 scale-95 translate-y-4"
                        : "opacity-0 scale-95 translate-y-6"
                    }`}
                style={{ transitionDelay: hasEntered && !isExiting ? "100ms" : "0ms" }}
                suppressHydrationWarning
            >
                <Image
                    src="/convite.png"
                    alt="Convite de casamento - Rodrigo & Paloma"
                    width={2000}
                    height={2400}
                    priority
                    className="w-full h-auto object-contain"
                />
            </div>

            <p
                className={`mt-8 text-sm sm:text-base tracking-[0.25em] uppercase  font-light transition-all duration-[1500ms] ease-out ${hasEntered && !isExiting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                style={{ transitionDelay: hasEntered ? "400ms" : "0ms" }}
                suppressHydrationWarning
            >

            </p>

            <span
                className={`mt-4 block h-2 w-2 rounded-full bg-white/50 animate-pulse transition-opacity duration-[1200ms] ${hasEntered && !isExiting ? "opacity-100" : "opacity-0"
                    }`}
                style={{ transitionDelay: hasEntered ? "600ms" : "0ms" }}
                aria-hidden="true"
                suppressHydrationWarning
            />
        </div>
    );
}
