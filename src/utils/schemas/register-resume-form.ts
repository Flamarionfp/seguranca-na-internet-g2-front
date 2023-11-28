import { z } from "zod";
import { getMaxSizeMessage, requiredFieldMessage } from "./helpers";
import { ErrorObject } from "../zod";

export const registerResumeFormSchema = z.object({
  full_name: z
    .string({ required_error: requiredFieldMessage })
    .regex(/^[a-zA-Z\s]+$/, { message: "Nome inválido" })
    .max(100, getMaxSizeMessage(100)),
  email: z
    .string({ required_error: requiredFieldMessage })
    .email({ message: "E-mail inválido" })
    .max(100, getMaxSizeMessage(100)),
  phone_number: z
    .string({ required_error: requiredFieldMessage })
    .regex(new RegExp("^\\(\\d{2}\\) \\d{5}-\\d{4}$"), {
      message: "Telefone inválido",
    })
    .transform((value) => value.replace(/\D/g, ""))
    .optional(),
  web_address: z
    .string({ required_error: requiredFieldMessage })
    .url({ message: "Endereço web inválido" })
    .max(100, getMaxSizeMessage(100))
    .optional(),
  work_experience: z
    .string({ required_error: requiredFieldMessage })
    .min(50, { message: "É necessário pelo menos 50 caracteres" })
    .max(1000, getMaxSizeMessage(1000)),
});

export type RegisterResumeFormValues = z.infer<typeof registerResumeFormSchema>;
export type RegisterResumeFormErrors = ErrorObject<RegisterResumeFormValues>;
