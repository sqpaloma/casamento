"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import { Loader2, Shield, User, Trash2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import MetaLabel from "@/components/wedding/meta-label";
import { Button } from "@/components/ui/button";

type UserDoc = Doc<"users">;
type Role = UserDoc["role"];

const roleLabels: Record<Role, string> = {
  admin: "Admin",
  convidado: "Convidado",
};

export default function AdminUsuariosPage() {
  const users = useQuery(api.users.listAdmin);
  const me = useQuery(api.users.current);
  const setRole = useMutation(api.users.setRole);
  const remove = useMutation(api.users.remove);

  const isLoading = users === undefined || me === undefined;
  const list = users ?? [];

  const handleSetRole = async (id: Id<"users">, role: Role) => {
    try {
      await setRole({ id, role });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar.");
    }
  };

  const handleDelete = async (id: Id<"users">, email: string) => {
    if (!confirm(`Excluir o usuário ${email}?`)) return;
    try {
      await remove({ id });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao excluir.");
    }
  };

  const admins = list.filter((u) => u.role === "admin").length;
  const convidados = list.filter((u) => u.role === "convidado").length;

  return (
    <div>
      <section className="mb-12">
        <MetaLabel className="mb-6">05 · Acesso</MetaLabel>
        <h1
          className="font-display italic leading-[0.9] text-[hsl(var(--foreground))]"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Usuários
        </h1>
        <p className="mt-8 max-w-xl text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
          Todo mundo que entra com Clerk aparece aqui. Promova para{" "}
          <span className="text-[hsl(var(--primary))]">admin</span> quem deve
          ter acesso a esta área.
        </p>
      </section>

      <section className="mb-10 grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-[hsl(var(--border))]">
        <div className="border border-[hsl(var(--border))] p-6 bg-background/80 backdrop-blur-sm">
          <MetaLabel className="mb-3">Total</MetaLabel>
          <div className="font-display italic text-4xl text-[hsl(var(--primary))]">
            {list.length}
          </div>
        </div>
        <div className="border border-[hsl(var(--border))] p-6 bg-background/80 backdrop-blur-sm">
          <MetaLabel className="mb-3">Admins</MetaLabel>
          <div className="font-display italic text-4xl text-[hsl(var(--primary))]">
            {admins}
          </div>
        </div>
        <div className="border border-[hsl(var(--border))] p-6 bg-background/80 backdrop-blur-sm">
          <MetaLabel className="mb-3">Convidados</MetaLabel>
          <div className="font-display italic text-4xl text-[hsl(var(--primary))]">
            {convidados}
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[hsl(var(--muted-foreground))]" />
        </div>
      ) : list.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[hsl(var(--border))]">
          <p className="font-display italic text-2xl text-[hsl(var(--muted-foreground))]">
            Nenhum usuário registrado ainda.
          </p>
        </div>
      ) : (
        <div className="border-t border-[hsl(var(--border))]">
          <AnimatePresence>
            {list.map((user) => {
              const isMe = me?._id === user._id;
              const isAdmin = user.role === "admin";
              return (
                <motion.article
                  key={user._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-[hsl(var(--border))] py-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
                        isAdmin
                          ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                          : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                      }`}
                    >
                      {isAdmin ? (
                        <Shield className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-display italic text-xl md:text-2xl text-[hsl(var(--foreground))] leading-tight">
                          {user.name || user.email || "Sem nome"}
                        </h3>
                        <span
                          className={`meta-label px-2 py-0.5 border ${
                            isAdmin
                              ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                              : "border-[hsl(var(--border))]"
                          }`}
                        >
                          {roleLabels[user.role]}
                        </span>
                        {isMe && (
                          <span className="meta-label px-2 py-0.5 border border-[hsl(var(--accent))] text-[hsl(var(--accent))]">
                            Você
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] break-all">
                        {user.email}
                      </p>
                      <p className="font-mono text-xs text-[hsl(var(--muted-foreground))] mt-1">
                        Entrou em{" "}
                        {new Date(user.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleSetRole(user._id, e.target.value as Role)
                      }
                      disabled={isMe}
                      className="meta-label bg-transparent border border-[hsl(var(--border))] px-3 py-2 hover:border-[hsl(var(--primary))]/50 focus:outline-none focus:border-[hsl(var(--primary))] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="admin">Admin</option>
                      <option value="convidado">Convidado</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(user._id, user.email)}
                      disabled={isMe}
                      className="gap-2 rounded-none hover:bg-transparent hover:text-[hsl(var(--destructive))] disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="meta-label">Excluir</span>
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <section className="mt-12 border border-[hsl(var(--border))] p-6 md:p-8">
        <MetaLabel className="mb-3">Como funciona</MetaLabel>
        <ul className="space-y-2 text-[hsl(var(--muted-foreground))] leading-relaxed text-sm">
          <li>
            · Todo login novo via Clerk é registrado aqui como{" "}
            <span className="text-[hsl(var(--foreground))]">convidado</span>.
          </li>
          <li>
            · E-mails listados em{" "}
            <span className="font-mono text-[hsl(var(--primary))]">
              ADMIN_EMAILS
            </span>{" "}
            (env) já entram como admin automaticamente.
          </li>
          <li>
            · Admins podem promover/rebaixar outros usuários e excluir contas —
            exceto a própria.
          </li>
          <li>
            · O sistema nunca deixa ficar sem nenhum admin.
          </li>
        </ul>
      </section>
    </div>
  );
}
