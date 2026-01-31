"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Mensagens() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Mensagem enviada com sucesso! Obrigado pelo carinho.",
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Erro ao enviar mensagem. Tente novamente.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Erro ao enviar mensagem. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-28 bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-family-display font-light text-5xl md:text-6xl text-blue-900 mb-4">
            Deixe sua Mensagem
          </h1>
          <p className="font-family-display text-lg text-gray-600">
            Compartilhe seus votos e mensagens especiais conosco
          </p>
        </div>

        <Card className="shadow-xl border-blue-100">
          <CardHeader className="text-center">
            <CardTitle className="font-family-display text-2xl text-blue-900">
              Sua mensagem para os noivos
            </CardTitle>
            <CardDescription className="font-family-display text-base">
              Preencha o formulario abaixo com carinho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="font-family-display text-sm font-medium text-gray-700"
                >
                  Nome *
                </Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Nome é obrigatório",
                    minLength: {
                      value: 2,
                      message: "Nome deve ter pelo menos 2 caracteres",
                    },
                  })}
                  className="h-12 border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/30"
                  placeholder="Seu nome"
                  aria-invalid={errors.name ? "true" : undefined}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="font-family-display text-sm font-medium text-gray-700"
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                  className="h-12 border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/30"
                  placeholder="seu@email.com"
                  aria-invalid={errors.email ? "true" : undefined}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="font-family-display text-sm font-medium text-gray-700"
                >
                  Mensagem *
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  {...register("message", {
                    required: "Mensagem é obrigatória",
                    minLength: {
                      value: 10,
                      message: "Mensagem deve ter pelo menos 10 caracteres",
                    },
                  })}
                  className="min-h-[150px] resize-none border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/10"
                  placeholder="Escreva sua mensagem especial..."
                  aria-invalid={errors.message ? "true" : undefined}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitStatus.type && (
                <Alert
                  variant={submitStatus.type === "error" ? "destructive" : "default"}
                  className={
                    submitStatus.type === "success"
                      ? "border-green-300 bg-green-50 text-green-800"
                      : undefined
                  }
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription className="font-family-display">
                    {submitStatus.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-family-display font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
