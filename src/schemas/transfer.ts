import {z} from "zod";

export const transferSchema = z.object({
    amount: z.number().min(1,"Valor Obrigatório"),
    to: z.string().min(3,"Destinatário obrigatório"),
})
export type TransferFormData = z.infer <typeof transferSchema>