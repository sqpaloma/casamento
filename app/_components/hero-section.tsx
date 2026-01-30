"use client";

import { useRef, useEffect } from "react";

interface HeroSectionProps {
    shouldPlay?: boolean;
}

export default function HeroSection({ shouldPlay = false }: HeroSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (shouldPlay && videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.log("Video autoplay was prevented:", error);
            });
        }
    }, [shouldPlay]);

    return (
        <section className="relative w-screen h-screen overflow-hidden -mx-[calc((100vw-100%)/2)]">
            {/* Video de fundo em fullscreen */}
            <video
                ref={videoRef}
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/casados-igreja.mp4" type="video/mp4" />
            </video>

            {/* Overlay escuro para melhorar legibilidade */}
            <div className="absolute inset-0" />




            {/* Seta pulsando para baixo */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
                style={{
                    animationDelay: "10s",
                    animationFillMode: "forwards",
                }}
            >
                <div className="animate-bounce">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#92A8D1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-lg"
                    >
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-out;
        }
      `}</style>
        </section>
    );
}
