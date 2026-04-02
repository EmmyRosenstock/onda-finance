import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useBalanceStore } from "../../store/Balance";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const transferSchema = z.object({
  to: z.string().min(2, "Informe o destinatário"),
  value: z.coerce.number().min(1, "Informe um valor maior que zero"),
});

type TransferFormData = z.infer<typeof transferSchema>;

export default function Transfer() {
  const navigate = useNavigate();
  const transfer = useBalanceStore((state) => state.transfer);

  const defaultValues = useMemo<TransferFormData>(
    () => ({
      to: "",
      value: 0,
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TransferFormData> = async (data) => {
    const success = transfer(data.value, data.to.trim());

    if (!success) {
      toast.error("Saldo insuficiente ou dados inválidos");
      return;
    }

    toast.success("Transferência realizada com sucesso");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Transferir</h1>
            <p className="text-gray-300 text-sm">
              Envie dinheiro com rapidez e segurança
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Destinatário"
                autoComplete="off"
                {...register("to")}
              />
              {errors.to && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.to.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Valor da transferência"
                {...register("value")}
              />
              {errors.value && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.value.message}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => navigate("/dashboard")}
              >
                Voltar
              </Button>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}