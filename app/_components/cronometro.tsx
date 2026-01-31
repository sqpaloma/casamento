'use client';

import { useState, useEffect } from 'react';

export default function Cronometro() {
    const [timeLeft, setTimeLeft] = useState({
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Data do casamento: 05/09/2026 às 18h (horário de Brasília)
            const weddingDate = new Date('2026-09-05T18:00:00-03:00');
            const now = new Date();
            const difference = weddingDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
                    weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full py-20 md:py-28 flex items-center justify-center ">
            <div className="mx-auto text-center w-full px-4">
                <p className="font-family-display text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4">
                    Contagem Regressiva
                </p>
                <h2 className="font-family-display text-2xl md:text-4xl italic text-neutral-700 mb-12 md:mb-16">
                    Para o dia mais especial!
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-8  sm:gap-4 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="font-family-display font-light text-5xl md:text-6xl lg:text-7xl text-neutral-600 tracking-tight tabular-nums mb-2">
                            {timeLeft.months}
                        </div>
                        <div className="font-family-display text-[10px] md:text-xs text-neutral-500 uppercase tracking-[0.2em]">
                            Meses
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-family-display font-light text-5xl md:text-6xl lg:text-7xl text-neutral-600 tracking-tight tabular-nums mb-2">
                            {timeLeft.weeks}
                        </div>
                        <div className="font-family-display text-[10px] md:text-xs text-neutral-500 uppercase tracking-[0.2em]">
                            Semanas
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="font-family-display font-light text-5xl md:text-6xl lg:text-7xl text-neutral-600 tracking-tight tabular-nums mb-2">
                            {timeLeft.days}
                        </div>
                        <div className="font-family-display text-[10px] md:text-xs text-neutral-500 uppercase tracking-[0.2em]">
                            Dias
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="font-family-display text-5xl md:text-6xl lg:text-7xl text-neutral-600 tracking-tight tabular-nums mb-2">
                            {timeLeft.hours}
                        </div>
                        <div className="font-family-display text-[10px] md:text-xs text-neutral-500 uppercase tracking-[0.2em]">
                            Horas
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="font-family-display text-5xl md:text-6xl lg:text-7xl text-neutral-600 tracking-tight tabular-nums mb-2">
                            {timeLeft.minutes}
                        </div>
                        <div className="font-family-display text-[10px] md:text-xs text-neutral-500 uppercase tracking-[0.2em]">
                            Minutos
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="font-family-display text-5xl md:text-6xl lg:text-7xl text-neutral-600 tracking-tight tabular-nums mb-2">
                            {timeLeft.seconds}
                        </div>
                        <div className="font-family-display text-[10px] md:text-xs text-neutral-500 uppercase tracking-[0.2em]">
                            Segundos
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}