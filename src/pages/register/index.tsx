import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { LiaEyeSolid,LiaEyeSlashSolid } from "react-icons/lia";

import { registerUser } from "../../redux/authSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const registerSchema = z.object({
  username: z.string().min(3, "Usuário deve ter no mínimo 3 caracteres"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.auth.users);
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = useMemo<RegisterFormData>(
    () => ({
      username: "",
      password: "",
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const onSubmit = async (data: RegisterFormData) => {
    const exists = users.some(
      (u) => u.username.toLowerCase() === data.username.trim().toLowerCase()
    );

    if (exists) {
      toast.error("Esse usuário já existe");
      return;
    }

    dispatch(
      registerUser({
        username: data.username.trim(),
        password: data.password.trim(),
      })
    );

    toast.success("Conta criada com sucesso");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09090b] via-[#111827] to-[#312e81] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            
            <h1 className="text-3xl font-bold text-white">Criar conta</h1>
            <p className="text-gray-300 text-sm">
              Abra sua conta digital em segundos
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Novo usuário"
                autoComplete="username"
                {...register("username")}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nova senha"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-sm text-gray-300 hover:text-white"
                >
                  {showPassword ? <LiaEyeSolid /> : <LiaEyeSlashSolid/>}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button variant="success" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar conta"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-300">
            Já tem conta?{" "}
            <Link to="/" className="text-purple-300 hover:text-white">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}