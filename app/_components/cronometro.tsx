'use client';

import { useState, useEffect } from 'react';

export default function Cronometro() {
    const [timeLeft, setTimeLeft] = useState({
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
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="min-h-screen w-full py-10 px-2 flex items-center justify-center">
            <div className="max-w-6xl mx-auto text-center w-full">
                <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-4">
                    Save the Date
                </h2>
                <p className="text-xl md:text-2xl text-blue-700 mb-12">
                    05 de Setembro de 2026 • 18h
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border-2 border-blue-200">
                        <div className="text-5xl md:text-6xl font-bold text-blue-900 mb-2">
                            {timeLeft.days}
                        </div>
                        <div className="text-sm md:text-base text-blue-600 uppercase tracking-wider">
                            Dias
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border-2 border-blue-200">
                        <div className="text-5xl md:text-6xl font-bold text-blue-900 mb-2">
                            {timeLeft.hours}
                        </div>
                        <div className="text-sm md:text-base text-blue-600 uppercase tracking-wider">
                            Horas
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border-2 border-blue-200">
                        <div className="text-5xl md:text-6xl font-bold text-blue-900 mb-2">
                            {timeLeft.minutes}
                        </div>
                        <div className="text-sm md:text-base text-blue-600 uppercase tracking-wider">
                            Minutos
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border-2 border-blue-200">
                        <div className="text-5xl md:text-6xl font-bold text-blue-900 mb-2">
                            {timeLeft.seconds}
                        </div>
                        <div className="text-sm md:text-base text-blue-600 uppercase tracking-wider">
                            Segundos
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-lg text-blue-700 font-light">
                    Contagem regressiva para o grande dia! ✨
                </p>
            </div>
        </section>
    );
}