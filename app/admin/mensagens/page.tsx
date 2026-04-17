"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Trash2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import MetaLabel from "@/components/wedding/meta-label";
import { Button } from "@/components/ui/button";

export default function AdminMensagensPage() {
  const messages = useQuery(api.messages.listAdmin);
  const remove = useMutation(api.messages.remove);

  const isLoading = messages === undefined;
  const list = messages ?? [];

  const handleDelete = async (id: Id<"messages">) => {
    if (!confirm("Excluir esta mensagem?")) return;
    try {
      await remove({ id });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao excluir.");
    }
  };

  return (
    <div>
      <section className="mb-12">
        <MetaLabel className="mb-6">03 · Mural</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Mensagens
        </h1>
        <p className="mt-8 max-w-xl text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
          Todas as mensagens deixadas pelos convidados. Você pode remover
          qualquer uma se precisar.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <MetaLabel>{list.length} mensagens</MetaLabel>
          <span className="meta-label">Mais recentes primeiro</span>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-[hsl(var(--muted-foreground))]" />
          </div>
        ) : list.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[hsl(var(--border))]">
            <p className="font-display italic text-2xl text-[hsl(var(--muted-foreground))]">
              Nenhuma mensagem ainda.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <AnimatePresence>
              {list.map((m, i) => (
                <motion.article
                  key={m._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group border-t border-[hsl(var(--border))] last:border-b py-8 grid grid-cols-[auto_1fr_auto] gap-6 items-start"
                >
                  <span className="font-mono text-xs text-[hsl(var(--muted-foreground))] pt-1">
                    {String(list.length - i).padStart(3, "0")}
                  </span>
                  <div>
                    <p className="text-lg text-[hsl(var(--foreground))] leading-[1.7] mb-4">
                      “{m.message}”
                    </p>
                    <div className="flex items-baseline gap-4 flex-wrap">
                      <span className="h-px w-6 bg-[hsl(var(--accent))]" />
                      <span className="font-display italic text-xl text-[hsl(var(--primary))]">
                        {m.name}
                      </span>
                      <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                        {new Date(m.createdAt).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(m._id)}
                    className="gap-2 rounded-none hover:bg-transparent hover:text-[hsl(var(--destructive))] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="meta-label">Excluir</span>
                  </Button>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
