import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LiaEyeSolid,LiaEyeSlashSolid } from "react-icons/lia";
import { useBalanceStore } from "../../store/Balance";
import { logoutUser } from "../../redux/authSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { balance, transactions } = useBalanceStore();
  const [showBalance, setShowBalance] = useState(true);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Sessão encerrada");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-black text-white p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-400">Bem-vindo de volta</p>
            <h1 className="text-3xl font-bold">
              Olá, {user?.username ?? "usuário"} 
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setShowBalance((prev) => !prev)}
            >
              {showBalance ? <LiaEyeSolid /> : <LiaEyeSlashSolid/>}
            </Button>

            <Button variant="secondary" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="bg-gradient-to-r from-purple-600 to-indigo-700">
            <p className="text-sm text-white/80">Saldo disponível</p>
            <h2 className="mt-2 text-4xl font-bold">
              {showBalance ? `R$ ${balance.toFixed(2)}` : "••••••"}
            </h2>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="success"
                size="lg"
                onClick={() => navigate("/deposit")}
              >
                Depositar
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/transfer")}
              >
                 Pix
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white">
                Últimas transações
              </h3>
              <p className="text-sm text-gray-400">
                Histórico financeiro da conta
              </p>
            </div>

            <div className="space-y-3">
              {transactions.length === 0 ? (
                <div className="rounded-2xl bg-white/5 p-4 text-gray-400">
                  Nenhuma transação ainda.
                </div>
              ) : (
                transactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between rounded-2xl bg-white/5 p-4"
                  >
                    <div>
                      <p
                        className={
                          t.type === "entrada"
                            ? "font-semibold text-green-400"
                            : "font-semibold text-red-400"
                        }
                      >
                        {t.type === "entrada" ? "Entrada" : "Saída"}
                      </p>

                      <p className="text-sm text-gray-400">{t.description}</p>

                      {t.to && (
                        <p className="text-xs text-gray-500">
                          Para: {t.to}
                        </p>
                      )}
                    </div>

                    <p className="font-bold">R$ {t.value.toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}