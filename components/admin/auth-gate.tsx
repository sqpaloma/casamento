"use client";

import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import { Loader2, Lock } from "lucide-react";
import MetaLabel from "@/components/wedding/meta-label";
import { Button } from "@/components/ui/button";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthLoading>
        <div className="py-32 flex flex-col items-center gap-4 text-[hsl(var(--muted-foreground))]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="meta-label">Verificando acesso...</span>
        </div>
      </AuthLoading>

      <Unauthenticated>
        <div className="py-20 max-w-xl">
          <MetaLabel className="mb-6">00 · Restrito</MetaLabel>
          <h1
            className="font-display italic leading-[0.9] text-[hsl(var(--foreground))] mb-8"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Área dos noivos
          </h1>
          <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-10">
            Faça login com o e-mail cadastrado para gerenciar presentes,
            mensagens e pagamentos.
          </p>
          <SignInButton mode="modal">
            <Button className="group gap-3 rounded-none border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-transparent hover:text-[hsl(var(--primary))] h-auto px-6 py-4">
              <Lock className="w-4 h-4" />
              <span className="meta-label text-[hsl(var(--primary-foreground))] group-hover:text-[hsl(var(--primary))]">
                Entrar
              </span>
            </Button>
          </SignInButton>
        </div>
      </Unauthenticated>

      <Authenticated>{children}</Authenticated>
    </>
  );
}
