import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type StoryPageArrowsProps = {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
};

const arrowButtonClass =
  "group inline-flex items-center justify-center h-10 w-10 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]";

export default function StoryPageArrows({ prev, next }: StoryPageArrowsProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Navegação entre capítulos"
      className="mt-24 md:mt-32 px-[5vw] md:px-[8vw] flex items-center justify-between gap-6"
    >
      {prev ? (
        <Link
          href={prev.href}
          aria-label={`Anterior: ${prev.label}`}
          className="group inline-flex items-center gap-3 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
        >
          <span className={arrowButtonClass}>
            <ArrowLeft className="w-4 h-4" />
          </span>
          <span className="meta-label hidden sm:inline">{prev.label}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next ? (
        <Link
          href={next.href}
          aria-label={`Próximo: ${next.label}`}
          className="group inline-flex items-center gap-3 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors ml-auto"
        >
          <span className="meta-label hidden sm:inline">{next.label}</span>
          <span className={arrowButtonClass}>
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
