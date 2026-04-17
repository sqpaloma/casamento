"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Plus, Check, X, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import MetaLabel from "@/components/wedding/meta-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PaymentStatus = "pendente" | "pago" | "cancelado";

const statusLabels: Record<PaymentStatus, string> = {
  pendente: "Pendente",
  pago: "Pago",
  cancelado: "Cancelado",
};

export default function AdminPagamentosPage() {
  const payments = useQuery(api.payments.listAdmin);
  const gifts = useQuery(api.gifts.listAdmin);
  const create = useMutation(api.payments.create);
  const markPaid = useMutation(api.payments.markPaid);
  const cancel = useMutation(api.payments.cancel);
  const remove = useMutation(api.payments.remove);

  const [formOpen, setFormOpen] = useState(false);
  const [giftId, setGiftId] = useState<string>("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoading = payments === undefined || gifts === undefined;
  const list = payments ?? [];

  const closeForm = () => {
    setFormOpen(false);
    setGiftId("");
    setGuestName("");
    setGuestEmail("");
    setAmount("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    setError(null);
    setIsPending(true);
    try {
      const amountNum = Number(amount.replace(",", "."));
      if (Number.isNaN(amountNum) || amountNum < 0) {
        throw new Error("Valor inválido.");
      }
      if (!giftId) throw new Error("Selecione um presente.");
      await create({
        giftId: giftId as Id<"gifts">,
        guestName,
        guestEmail: guestEmail.trim() || undefined,
        amount: amountNum,
      });
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar.");
    } finally {
      setIsPending(false);
    }
  };

  const handleMarkPaid = async (id: Id<"payments">) => {
    try {
      await markPaid({ id });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro.");
    }
  };

  const handleCancel = async (id: Id<"payments">) => {
    try {
      await cancel({ id });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro.");
    }
  };

  const handleDelete = async (id: Id<"payments">) => {
    if (!confirm("Excluir este registro?")) return;
    try {
      await remove({ id });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro.");
    }
  };

  return (
    <div>
      <section className="mb-12">
        <MetaLabel className="mb-6">04 · Pagamentos</MetaLabel>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1
            className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Pagamentos
          </h1>
          <Button
            onClick={() => setFormOpen(true)}
            className="group gap-3 rounded-none border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-transparent hover:text-[hsl(var(--primary))] h-auto px-6 py-4 self-start"
          >
            <Plus className="w-4 h-4" />
            <span className="meta-label text-[hsl(var(--primary-foreground))] group-hover:text-[hsl(var(--primary))]">
              Registrar manualmente
            </span>
          </Button>
        </div>
      </section>

      <section className="mb-10 border border-[hsl(var(--primary))]/30 p-6 md:p-8 bg-[hsl(var(--primary))]/5">
        <MetaLabel className="mb-3">Em breve</MetaLabel>
        <h3 className="font-display italic text-2xl md:text-3xl mb-2">
          Integração com Asaas
        </h3>
        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed max-w-2xl">
          Em breve será possível receber pagamentos via PIX e cartão
          diretamente pelo site, com confirmação automática. Por enquanto você
          pode registrar pagamentos manualmente aqui.
        </p>
      </section>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[hsl(var(--muted-foreground))]" />
        </div>
      ) : list.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[hsl(var(--border))]">
          <p className="font-display italic text-2xl text-[hsl(var(--muted-foreground))]">
            Nenhum pagamento registrado ainda.
          </p>
        </div>
      ) : (
        <div className="border-t border-[hsl(var(--border))]">
          {list.map((p) => (
            <article
              key={p._id}
              className="border-b border-[hsl(var(--border))] py-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start"
            >
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <MetaLabel>
                    {p.giftCategoria ?? "Sem categoria"}
                  </MetaLabel>
                  <span
                    className={`meta-label px-2 py-0.5 border ${
                      p.status === "pago"
                        ? "border-[hsl(var(--accent))] text-[hsl(var(--accent))]"
                        : p.status === "cancelado"
                          ? "border-[hsl(var(--destructive))] text-[hsl(var(--destructive))]"
                          : "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                    }`}
                  >
                    {statusLabels[p.status]}
                  </span>
                  <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                    {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <h3 className="font-display italic text-2xl text-[hsl(var(--foreground))] leading-tight mb-1">
                  {p.giftTitulo ?? "Presente removido"}
                </h3>
                <div className="flex items-baseline gap-4 flex-wrap text-sm">
                  <span className="text-[hsl(var(--foreground))]">
                    <span className="meta-label mr-2">De</span>
                    {p.guestName}
                  </span>
                  {p.guestEmail && (
                    <span className="text-[hsl(var(--muted-foreground))]">
                      {p.guestEmail}
                    </span>
                  )}
                  <span className="font-mono text-[hsl(var(--primary))]">
                    R$ {p.amount.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {p.status !== "pago" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkPaid(p._id)}
                    className="gap-2 rounded-none hover:bg-transparent hover:text-[hsl(var(--accent))]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="meta-label">Marcar pago</span>
                  </Button>
                )}
                {p.status === "pendente" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCancel(p._id)}
                    className="gap-2 rounded-none hover:bg-transparent hover:text-[hsl(var(--muted-foreground))]"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span className="meta-label">Cancelar</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(p._id)}
                  className="gap-2 rounded-none hover:bg-transparent hover:text-[hsl(var(--destructive))]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="meta-label">Excluir</span>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[hsl(var(--background))]/90 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto py-10 px-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] p-8 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <MetaLabel className="mb-3">Novo</MetaLabel>
                  <h2 className="font-display italic text-3xl text-[hsl(var(--foreground))]">
                    Registrar pagamento
                  </h2>
                </div>
                <button
                  onClick={closeForm}
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="gift" className="meta-label block mb-2">
                    Presente
                  </Label>
                  <select
                    id="gift"
                    value={giftId}
                    onChange={(e) => setGiftId(e.target.value)}
                    required
                    className="w-full bg-transparent border-0 border-b border-[hsl(var(--border))] focus:outline-none focus:border-[hsl(var(--primary))] px-0 py-3 font-display italic text-xl text-[hsl(var(--foreground))]"
                  >
                    <option value="">Selecione...</option>
                    {(gifts ?? []).map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.titulo} — {g.categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="guestName" className="meta-label block mb-2">
                    Nome do convidado
                  </Label>
                  <Input
                    id="guestName"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full bg-transparent border-0 border-b border-[hsl(var(--border))] focus-visible:border-[hsl(var(--primary))] focus-visible:ring-0 shadow-none rounded-none px-0 py-3 h-auto font-display italic text-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="guestEmail" className="meta-label block mb-2">
                    E-mail (opcional)
                  </Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-[hsl(var(--border))] focus-visible:border-[hsl(var(--primary))] focus-visible:ring-0 shadow-none rounded-none px-0 py-3 h-auto font-display italic text-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="amount" className="meta-label block mb-2">
                    Valor (R$)
                  </Label>
                  <Input
                    id="amount"
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    placeholder="0,00"
                    className="w-full bg-transparent border-0 border-b border-[hsl(var(--border))] focus-visible:border-[hsl(var(--primary))] focus-visible:ring-0 shadow-none rounded-none px-0 py-3 h-auto font-display italic text-xl"
                  />
                </div>

                {error && (
                  <p className="text-sm text-[hsl(var(--destructive))]">
                    {error}
                  </p>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-[hsl(var(--border))]">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="group gap-3 rounded-none border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-transparent hover:text-[hsl(var(--primary))] h-auto px-6 py-4"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    <span className="meta-label text-[hsl(var(--primary-foreground))] group-hover:text-[hsl(var(--primary))]">
                      {isPending ? "Salvando..." : "Registrar"}
                    </span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={closeForm}
                    className="rounded-none meta-label hover:bg-transparent"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
