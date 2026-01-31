import { Users, Heart, Wine, UtensilsCrossed, Music, PartyPopper, Sparkles } from 'lucide-react';

const programItems = [
    {
        time: '17:30',
        icon: Users,
        title: 'Chegada dos Convidados',
        description: 'Recepção e boas-vindas'
    },
    {
        time: '18:00',
        icon: Heart,
        title: 'Cerimônia',
        description: 'Ceremonia religiosa'
    },
    {
        time: '19:00',
        icon: Wine,
        title: 'Coquetel',
        description: 'Aperitivos e bebidas'
    },
    {
        time: '21:00',
        icon: UtensilsCrossed,
        title: 'Banquete',
        description: 'Banquete nupcial'
    },
    {
        time: '22:30',
        icon: Sparkles,
        title: 'Primeira Dança',
        description: 'A dança dos noivos'
    },
    {
        time: '23:00',
        icon: Music,
        title: 'Festa',
        description: 'Vamos dançar!'
    },
    {
        time: '03:30',
        icon: PartyPopper,
        title: 'Fim',
        description: 'Despedida'
    }
];

export default function Programmation() {
    return (
        <section className="w-full min-h-screen py-8 md:py-16">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 md:w-24 h-px bg-neutral-300"></div>
                        <Heart className="w-4 h-4 text-neutral-400" fill="currentColor" />
                        <div className="w-16 md:w-24 h-px bg-neutral-300"></div>
                    </div>
                    <h2 className="font-family-display text-3xl md:text-5xl italic text-neutral-700 mb-4">
                        Programa do Dia
                    </h2>
                    <p className="font-family-display text-sm md:text-base text-neutral-500">
                        O que preparamos para vocês
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Linha central vertical */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-neutral-200 hidden md:block"></div>

                    {/* Linha vertical mobile (à esquerda) */}
                    <div className="absolute left-6 w-px h-full bg-neutral-200 md:hidden"></div>

                    <div className="space-y-12 md:space-y-16">
                        {programItems.map((item, index) => {
                            const Icon = item.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Conteúdo - Desktop */}
                                    <div className={`hidden md:flex md:w-1/2 ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'
                                        }`}>
                                        <div className={`text-${isEven ? 'right' : 'left'}`}>
                                            <span className="inline-block font-family-display text-xs px-4 py-1.5 bg-neutral-800 text-white rounded-full mb-4">
                                                {item.time}
                                            </span>
                                            <h3 className="font-family-display text-xl md:text-2xl text-neutral-700 mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="font-family-display text-sm text-neutral-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Ícone central - Desktop */}
                                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-neutral-50 border border-neutral-200 items-center justify-center z-10">
                                        <Icon className="w-6 h-6 text-neutral-600" strokeWidth={1.5} />
                                    </div>

                                    {/* Espaço vazio do outro lado - Desktop */}
                                    <div className="hidden md:block md:w-1/2"></div>

                                    {/* Layout Mobile */}
                                    <div className="flex md:hidden items-start gap-6 pl-0">
                                        {/* Ícone - Mobile */}
                                        <div className="shrink-0 w-12 h-12 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center z-10">
                                            <Icon className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                                        </div>

                                        {/* Conteúdo - Mobile */}
                                        <div className="flex-1 pt-1">
                                            <span className="inline-block font-family-display text-xs px-3 py-1 bg-neutral-800 text-white rounded-full mb-3">
                                                {item.time}
                                            </span>
                                            <h3 className="font-family-display text-lg text-neutral-700 mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="font-family-display text-sm text-neutral-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer decorativo */}
                <div className="flex items-center justify-center gap-4 mt-16 md:mt-20">
                    <div className="w-16 md:w-24 h-px bg-neutral-300"></div>
                    <Heart className="w-4 h-4 text-neutral-400" fill="currentColor" />
                    <div className="w-16 md:w-24 h-px bg-neutral-300"></div>
                </div>
            </div>
        </section>
    );
}
