"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ExternalLink,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import MetaLabel from "@/components/wedding/meta-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Gift = Doc<"gifts">;
type GiftStatus = Gift["status"];

type FormState = {
  categoria: string;
  titulo: string;
  descricao: string;
  loja: string;
  url: string;
  preco: string;
  imagem: string;
  status: GiftStatus;
};

const emptyForm: FormState = {
  categoria: "",
  titulo: "",
  descricao: "",
  loja: "",
  url: "",
  preco: "",
  imagem: "",
  status: "disponivel",
};

const statusLabels: Record<GiftStatus, string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  pago: "Pago",
};

export default function AdminPresentesPage() {
  const gifts = useQuery(api.gifts.listAdmin);
  const create = useMutation(api.gifts.create);
  const update = useMutation(api.gifts.update);
  const remove = useMutation(api.gifts.remove);
  const setStatus = useMutation(api.gifts.setStatus);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<Id<"gifts"> | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"todos" | GiftStatus>("todos");

  const isLoading = gifts === undefined;

  const filtered = useMemo(() => {
    const list = gifts ?? [];
    if (filter === "todos") return list;
    return list.filter((g) => g.status === filter);
  }, [gifts, filter]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setFormOpen(true);
  };

  const openEdit = (gift: Gift) => {
    setEditingId(gift._id);
    setForm({
      categoria: gift.categoria,
      titulo: gift.titulo,
      descricao: gift.descricao,
      loja: gift.loja,
      url: gift.url,
      preco: gift.preco !== undefined ? String(gift.preco) : "",
      imagem: gift.imagem ?? "",
      status: gift.status,
    });
    setError(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    setError(null);
    setIsPending(true);
    try {
      const precoNum =
        form.preco.trim() === ""
          ? undefined
          : Number(form.preco.replace(",", "."));
      if (precoNum !== undefined && Number.isNaN(precoNum)) {
        throw new Error("Preço inválido.");
      }
      if (editingId) {
        await update({
          id: editingId,
          categoria: form.categoria,
          titulo: form.titulo,
          descricao: form.descricao,
          loja: form.loja,
          url: form.url,
          preco: precoNum,
          imagem: form.imagem || undefined,
          status: form.status,
        });
      } else {
        await create({
          categoria: form.categoria,
          titulo: form.titulo,
          descricao: form.descricao,
          loja: form.loja,
          url: form.url,
          preco: precoNum,
          imagem: form.imagem || undefined,
          status: form.status,
        });
      }
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: Id<"gifts">) => {
    if (!confirm("Excluir este presente?")) return;
    try {
      await remove({ id });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao excluir.");
    }
  };

  const handleStatusChange = async (id: Id<"gifts">, status: GiftStatus) => {
    try {
      await setStatus({ id, status });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar.");
    }
  };

  return (
    <div>
      <section className="mb-12">
        <MetaLabel className="mb-6">02 · Presentes</MetaLabel>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1
            className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Lista de
            <br />
            Presentes
          </h1>
          <Button
            onClick={openCreate}
            className="group gap-3 rounded-none border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-transparent hover:text-[hsl(var(--primary))] h-auto px-6 py-4 self-start"
          >
            <Plus className="w-4 h-4" />
            <span className="meta-label text-[hsl(var(--primary-foreground))] group-hover:text-[hsl(var(--primary))]">
              Novo presente
            </span>
          </Button>
        </div>
      </section>

      <section className="mb-8 flex items-center gap-4 flex-wrap">
        {(["todos", "disponivel", "reservado", "pago"] as const).map((f) => {
          const isActive = filter === f;
          const label = f === "todos" ? "Todos" : statusLabels[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`meta-label px-4 py-2 border transition-colors ${
                isActive
                  ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5"
                  : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </section>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[hsl(var(--muted-foreground))]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[hsl(var(--border))]">
          <p className="font-display italic text-2xl text-[hsl(var(--muted-foreground))] mb-4">
            Nenhum presente por aqui ainda.
          </p>
          <Button
            variant="link"
            onClick={openCreate}
            className="text-[hsl(var(--primary))]"
          >
            Adicionar o primeiro
          </Button>
        </div>
      ) : (
        <div className="border-t border-[hsl(var(--border))]">
          {filtered.map((gift) => (
            <article
              key={gift._id}
              className="border-b border-[hsl(var(--border))] py-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MetaLabel>{gift.categoria}</MetaLabel>
                  <span
                    className={`meta-label px-2 py-0.5 border ${
                      gift.status === "pago"
                        ? "border-[hsl(var(--accent))] text-[hsl(var(--accent))]"
                        : gift.status === "reservado"
                          ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                          : "border-[hsl(var(--border))]"
                    }`}
                  >
                    {statusLabels[gift.status]}
                  </span>
                  {gift.preco !== undefined && (
                    <span className="font-mono text-xs text-[hsl(var(--muted-foreground))]">
                      R$ {gift.preco.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
                <h3 className="font-display italic text-2xl md:text-3xl text-[hsl(var(--foreground))] leading-tight mb-2">
                  {gift.titulo}
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-2 max-w-2xl">
                  {gift.descricao}
                </p>
                <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{gift.loja}</span>
                  {gift.url && (
                    <a
                      href={gift.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[hsl(var(--primary))]"
                    >
                      <ExternalLink className="w-3 h-3" /> link
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={gift.status}
                  onChange={(e) =>
                    handleStatusChange(gift._id, e.target.value as GiftStatus)
                  }
                  className="meta-label bg-transparent border border-[hsl(var(--border))] px-3 py-2 hover:border-[hsl(var(--primary))]/50 focus:outline-none focus:border-[hsl(var(--primary))]"
                >
                  <option value="disponivel">Disponível</option>
                  <option value="reservado">Reservado</option>
                  <option value="pago">Pago</option>
                </select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEdit(gift)}
                  className="gap-2 rounded-none hover:bg-transparent hover:text-[hsl(var(--primary))]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span className="meta-label">Editar</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(gift._id)}
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
              className="w-full max-w-2xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] p-8 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <MetaLabel className="mb-3">
                    {editingId ? "Editar" : "Novo"}
                  </MetaLabel>
                  <h2 className="font-display italic text-3xl md:text-4xl text-[hsl(var(--foreground))]">
                    {editingId ? "Editar presente" : "Novo presente"}
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    id="titulo"
                    label="Título"
                    value={form.titulo}
                    onChange={(v) => setForm((f) => ({ ...f, titulo: v }))}
                    required
                  />
                  <FormField
                    id="categoria"
                    label="Categoria"
                    value={form.categoria}
                    onChange={(v) => setForm((f) => ({ ...f, categoria: v }))}
                    required
                    placeholder="Ex: Cozinha"
                  />
                </div>

                <div>
                  <Label htmlFor="descricao" className="meta-label block mb-2">
                    Descrição
                  </Label>
                  <Textarea
                    id="descricao"
                    value={form.descricao}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, descricao: e.target.value }))
                    }
                    rows={3}
                    className="w-full bg-transparent border-0 border-b border-[hsl(var(--border))] focus-visible:border-[hsl(var(--primary))] focus-visible:ring-0 shadow-none rounded-none px-0 py-3 text-lg text-[hsl(var(--foreground))] leading-relaxed resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    id="loja"
                    label="Loja"
                    value={form.loja}
                    onChange={(v) => setForm((f) => ({ ...f, loja: v }))}
                    placeholder="Amazon, Americanas..."
                  />
                  <FormField
                    id="preco"
                    label="Preço (R$)"
                    value={form.preco}
                    onChange={(v) => setForm((f) => ({ ...f, preco: v }))}
                    placeholder="Opcional"
                    inputMode="decimal"
                  />
                </div>

                <FormField
                  id="url"
                  label="URL do produto"
                  value={form.url}
                  onChange={(v) => setForm((f) => ({ ...f, url: v }))}
                  placeholder="https://..."
                  type="url"
                />

                <FormField
                  id="imagem"
                  label="URL da imagem (opcional)"
                  value={form.imagem}
                  onChange={(v) => setForm((f) => ({ ...f, imagem: v }))}
                  placeholder="https://..."
                  type="url"
                />

                <div>
                  <Label htmlFor="status" className="meta-label block mb-2">
                    Status
                  </Label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        status: e.target.value as GiftStatus,
                      }))
                    }
                    className="w-full bg-transparent border-0 border-b border-[hsl(var(--border))] focus:outline-none focus:border-[hsl(var(--primary))] px-0 py-3 font-display italic text-xl text-[hsl(var(--foreground))]"
                  >
                    <option value="disponivel">Disponível</option>
                    <option value="reservado">Reservado</option>
                    <option value="pago">Pago</option>
                  </select>
                </div>

                {error && (
                  <p className="text-sm text-[hsl(var(--destructive))]">{error}</p>
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
                      {isPending ? "Salvando..." : "Salvar"}
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

function FormField({
  id,
  label,
  value,
  onChange,
  required,
  placeholder,
  type,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <Label htmlFor={id} className="meta-label block mb-2">
        {label}
      </Label>
      <Input
        id={id}
        type={type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full bg-transparent border-0 border-b border-[hsl(var(--border))] focus-visible:border-[hsl(var(--primary))] focus-visible:ring-0 shadow-none rounded-none px-0 py-3 h-auto font-display italic text-xl text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]/60"
      />
    </div>
  );
}
