"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Calendar, MapPin, Clock } from "lucide-react";
import MetaLabel from "@/components/wedding/meta-label";
import { cn } from "@/lib/utils";

type ScheduleItem = {
  time: string;
  title: string;
  place: string;
  address: string;
  dress: string;
  description: string;
  mapsUrl?: string;
};

const PAROQUIA_MAPS_URL =
  "https://www.google.com/maps/place/Par%C3%B3quia+Imaculada+Concei%C3%A7%C3%A3o/@-23.5664151,-46.6506689,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce59b93b6794b3:0x62e54d4327f274d6!8m2!3d-23.56642!4d-46.648094!16s%2Fg%2F1tk1p34s?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D";

const PATIO_WELLUCCI_MAPS_URL =
  "https://www.google.com/maps/place/P%C3%A1tio+Welucci+-+Espa%C3%A7o+para+Eventos/@-23.6074839,-46.6811126,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce50ae6b942bbf:0x6df93c6b92206c90!8m2!3d-23.6074888!4d-46.6785377!16s%2Fg%2F11cs3_672j?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D";

const schedule: ScheduleItem[] = [
  {
    time: "17:30",
    title: "Cerimônia",
    place: "Paróquia Imaculada Conceição",
    address: "Av. Brigadeiro Luís Antônio, 2071 · Bela Vista, São Paulo",
    dress: "Black Tie",
    description:
      "O momento em que dois viram um. Chegue com alguns minutos de antecedência para acomodar-se.",
    mapsUrl: PAROQUIA_MAPS_URL,
  },
  {
    time: "19:00",
    title: "Coquetel",
    place: "Pátio Welucci",
    address: "R. Texas, 243 · Brooklin, São Paulo",
    dress: "Black Tie",
    description:
      "Champagne, canapés e o pôr-do-sol enquanto os noivos finalizam as fotos.",
    mapsUrl: PATIO_WELLUCCI_MAPS_URL,
  },
  {
    time: "20:30",
    title: "Recepção",
    place: "Salão — Pátio Welucci",
    address: "R. Texas, 243 · Brooklin, São Paulo",
    dress: "Black Tie",
    description:
      "Jantar harmonizado, discursos e as primeiras valsas da nova família.",
    mapsUrl: PATIO_WELLUCCI_MAPS_URL,
  },
  {
    time: "23:00",
    title: "Pista",
    place: "Terraço — Pátio Welucci",
    address: "R. Texas, 243 · Brooklin, São Paulo",
    dress: "Black Tie · sapatos confortáveis recomendados",
    description: "Bar aberto, DJ e a madrugada toda para celebrar.",
    mapsUrl: PATIO_WELLUCCI_MAPS_URL,
  },
];

export default function CerimoniaPage() {
  return (
    <div className="relative pt-32 pb-20">
      <section className="px-[5vw] md:px-[8vw] mb-10">
        <MetaLabel className="mb-6">05 · O dia</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))] whitespace-nowrap"
          style={{ fontSize: "clamp(2rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Cerimônia &amp; Recepção
        </h1>
        <div className="mt-10 grid gap-8 max-w-6xl md:grid-cols-[max-content_max-content_1fr]">
          <InfoBlock icon={Calendar} label="Data" value="05 de Setembro, 2026" />
          <InfoBlock icon={Clock} label="Horário" value="Cerimônia às 17h30" />
          <InfoBlock
            icon={MapPin}
            label="Local"
            value="Paróquia Imaculada Conceição · festa no Pátio Welucci"
            valueClassName="whitespace-nowrap md:overflow-x-auto md:[scrollbar-width:thin]"
          />
        </div>
      </section>

      <section className="mb-10 px-[5vw] md:px-[8vw]">
        <div className="mb-10">
          <MetaLabel>Cronograma do dia</MetaLabel>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[hsl(var(--border))]">
          {schedule.map((s, i) => (
            <motion.div
              key={`${s.title}-${s.time}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group bg-background p-6 md:p-7 flex flex-col min-h-[380px] hover:bg-[hsl(var(--secondary))]/40 transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-auto">
                <span
                  className="font-display italic text-[hsl(var(--primary))] leading-none"
                  style={{ fontSize: "clamp(2.5rem, 3.5vw, 3.5rem)" }}
                >
                  {s.time}
                </span>
                <span className="meta-label">0{i + 1}</span>
              </div>

              <div className="mt-8">
                <h3 className="font-display italic text-2xl md:text-3xl mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                  {s.description}
                </p>

                <div className="border-t border-[hsl(var(--border))] pt-4 space-y-2">
                  <div className="meta-label text-[hsl(var(--foreground))]">
                    {s.place}
                  </div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))]">
                    {s.address}
                  </div>
                  {s.mapsUrl ? (
                    <a
                      href={s.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-[hsl(var(--primary))] underline underline-offset-2 mt-2 hover:opacity-80"
                    >
                      Ver no Google Maps
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-[5vw] md:px-[8vw]">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="aspect-[4/3] relative overflow-hidden border border-[hsl(var(--border))]">
            <iframe
              title="Localização — Paróquia Imaculada Conceição"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-46.658%2C-23.576%2C-46.638%2C-23.556&layer=mapnik&marker=-23.56642%2C-46.648094"
              className="w-full h-full grayscale contrast-[1.1] opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          <div>
            <MetaLabel className="mb-6">Como chegar</MetaLabel>
            <h2 className="font-display italic text-4xl md:text-5xl mb-6 leading-[0.95]">
              Paróquia Imaculada Conceição
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] leading-[1.7] mb-8 max-w-md">
              A cerimônia religiosa será na Bela Vista. Coquetel, jantar e festa
              acontecem no Pátio Welucci, no Brooklin — veja os horários no
              cronograma acima.
            </p>

            <div className="space-y-4 mb-10 max-w-md">
              <InfoRow
                label="Endereço"
                value="Av. Brigadeiro Luís Antônio, 2071"
              />
              <InfoRow label="Bairro" value="Bela Vista, São Paulo · SP" />
              <InfoRow label="Site" value="imaculadasp.com.br" />
            </div>

            <a
              href={PAROQUIA_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-label inline-block text-[hsl(var(--primary))] underline underline-offset-4 hover:opacity-80"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-16 md:mt-24">
          <div className="aspect-[4/3] relative overflow-hidden border border-[hsl(var(--border))] md:order-2">
            <iframe
              title="Localização — Pátio Welucci"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6885%2C-23.614%2C-46.6685%2C-23.601&layer=mapnik&marker=-23.6074888%2C-46.6785377"
              className="w-full h-full grayscale contrast-[1.1] opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          <div className="md:order-1">
            <MetaLabel className="mb-6">Recepção e festa</MetaLabel>
            <h2 className="font-display italic text-4xl md:text-5xl mb-6 leading-[0.95]">
              Pátio Welucci
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] leading-[1.7] mb-8 max-w-md">
              Espaço para eventos no Brooklin: coquetel, recepção e pista no
              mesmo endereço.
            </p>

            <div className="space-y-4 mb-10 max-w-md">
              <InfoRow label="Endereço" value="R. Texas, 243" />
              <InfoRow label="Bairro" value="Brooklin, São Paulo · SP" />
              <InfoRow label="Site" value="wed.welucci.com" />
            </div>

            <a
              href={PATIO_WELLUCCI_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-label inline-block text-[hsl(var(--primary))] underline underline-offset-4 hover:opacity-80"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  value,
  valueClassName,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="border-t border-[hsl(var(--border))] pt-5">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-4 h-4 text-[hsl(var(--accent))]" />
        <span className="meta-label">{label}</span>
      </div>
      <div
        className={cn(
          "font-display italic text-2xl tracking-tight",
          valueClassName,
        )}
      >
        {value}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3 border-b border-[hsl(var(--border))]">
      <span className="meta-label">{label}</span>
      <span className="text-[hsl(var(--foreground))]">{value}</span>
    </div>
  );
}
