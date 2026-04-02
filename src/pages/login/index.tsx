import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { LiaEyeSolid,LiaEyeSlashSolid } from "react-icons/lia";
import { loginUser } from "../../redux/authSlice";
import type { AppDispatch } from "../../redux/store";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const loginSchema = z.object({
  username: z.string().min(3, "Usuário deve ter no mínimo 3 caracteres"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = useMemo<LoginFormData>(
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = async (data: LoginFormData) => {
    dispatch(
      loginUser({
        username: data.username.trim(),
        password: data.password.trim(),
      })
    );

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.error("Usuário ou senha inválidos");
      return;
    }

    toast.success("Login realizado com sucesso");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#111827] to-[#1e1b4b] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
       
            <h1 className="text-3xl font-bold text-white">Onda Finance</h1>
            <p className="text-gray-300 text-sm">
              Acesse sua conta com segurança
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                placeholder="Usuário"
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
                  placeholder="Senha"
                  autoComplete="current-password"
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

            <Button className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-300">
            Não tem conta?{" "}
            <Link to="/register" className="text-purple-300 hover:text-white">
              Criar conta
            </Link>
          </div>

         
        </CardContent>
      </Card>
    </div>
  );
}