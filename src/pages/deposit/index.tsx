import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useBalanceStore } from "../../store/Balance";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const depositSchema = z.object({
  value: z.coerce.number().min(1, "Informe um valor maior que zero"),
});

type DepositFormInput = z.input<typeof depositSchema>;
type DepositFormOutput = z.output<typeof depositSchema>;

export default function Deposit() {
  const navigate = useNavigate();
  const deposit = useBalanceStore((state) => state.deposit);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepositFormInput, unknown, DepositFormOutput>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      value: 0,
    },
  });

  const onSubmit: SubmitHandler<DepositFormOutput> = async (data) => {
    const success = deposit(data.value);

    if (!success) {
      toast.error("Não foi possível realizar o depósito");
      return;
    }

    toast.success("Depósito realizado com sucesso");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#052e16] via-[#14532d] to-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Depositar</h1>
            <p className="text-gray-300 text-sm">Adicione saldo à sua conta</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Valor do depósito"
                {...register("value", { valueAsNumber: true })}
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
                variant="success"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Confirmando..." : "Confirmar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}