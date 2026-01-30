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
        <section className=" w-full pt-24 flex items-center justify-center">
            <div className="max-w-4xl  mx-auto text-center w-full">
                <h2 className="text-2xl md:text-4xl font-serif pb-6
                 md:pb-12 text-blue-900">
                    Contagem regressiva para o grande dia
                </h2>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 max-w-2xl mx-auto">
                    <div className="bg-blue-200 backdrop-blur-sm rounded-lg p-6 border-2 border-white">
                        <div className="text-2xl md:text-4xl font-bold text-white mb-2">
                            {timeLeft.days}
                        </div>
                        <div className="text-sm md:text-base text-white uppercase tracking-wider">
                            Dias
                        </div>
                    </div>

                    <div className="bg-blue-200 backdrop-blur-sm rounded-lg p-6 border-2 border-white">
                        <div className="text-2xl md:text-4xl font-bold text-white mb-2">
                            {timeLeft.hours}
                        </div>
                        <div className="text-sm md:text-base text-white uppercase tracking-wider">
                            Horas
                        </div>
                    </div>

                    <div className="bg-blue-200 backdrop-blur-sm rounded-lg p-6 border-2 border-white">
                        <div className="text-2xl md:text-4xl font-bold text-white mb-2">
                            {timeLeft.minutes}
                        </div>
                        <div className="text-sm md:text-base text-white uppercase tracking-wider">
                            Minutos
                        </div>
                    </div>

                    <div className="bg-blue-200 backdrop-blur-sm rounded-lg p-6 border-2 border-white">
                        <div className="text-2xl md:text-4xl font-bold text-white mb-2">
                            {timeLeft.seconds}
                        </div>
                        <div className="text-sm md:text-base text-white uppercase tracking-wider">
                            Segundos
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-lg text-blue-700 font-light">
                    Sejam bem-vindos ao nosso site! ✨
                </p>
            </div>
        </section>
    );
}