"use server";

import {
  RegisterResumeFormErrors,
  registerResumeFormSchema,
} from "@/utils/schemas/register-resume-form";
import { handleFormError } from "@/utils/zod";
import { revalidatePath } from "next/cache";

export async function registerResume(prevState: any, formData: FormData) {
  try {
    const data = registerResumeFormSchema.parse({
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
    console.error(error);

    const errorMessage = "Não foi possível cadastrar o Currículo";

    return handleFormError<RegisterResumeFormErrors>(
      error as Error,
      errorMessage
    );
  }
}
