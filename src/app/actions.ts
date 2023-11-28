"use server";

import { ErrorObject, getZodErrors, verifyZodError } from "@/utils/zod";
import { kMaxLength } from "buffer";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";

const requiredFieldMessage = "Campo obrigatório";

const getMaxSizeMessage = (maxLength: number): string => {
  return `Tamanho máximo de ${maxLength} caracteres`;
};

const formSchema = z.object({
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

export type InitialValues = z.infer<typeof formSchema>;
export type FormErrors = ErrorObject<InitialValues>;

const handleError = (error: Error, message: string) => {
  console.error(error);

  let errors: FormErrors = {} as FormErrors;

  const isFormParseError = verifyZodError(error as Error);

  if (isFormParseError) {
    errors = getZodErrors(error as ZodError);
  }

  return {
    message,
    hasError: true,
    errors,
  };
};

export async function registerResume(prevState: any, formData: FormData) {
  try {
    const data = formSchema.parse({
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      web_address: formData.get("web_address"),
      work_experience: formData.get("work_experience"),
    });

    console.log(data);

    const response = await fetch("http://localhost:4000/resume", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        authorization: process.env.API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return revalidatePath("/");
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    const errorMessage = "Não foi possível cadastrar o Currículo";

    return handleError(error as Error, errorMessage);
  }
}
