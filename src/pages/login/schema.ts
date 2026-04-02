import {z} from "zod"

export const loginSchema = z.object({
    username: z.string().min(3, "Minimo 3 caracteres"),
    password : z.string().min(10, "A senha deve ter no minimo 10 caracteres")
});
export type LoginFormData = z.infer<typeof loginSchema>