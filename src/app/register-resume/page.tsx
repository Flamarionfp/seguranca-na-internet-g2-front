"use client";

import {
  RegisterResumeForm,
  InitialValues as RegisterResumeFormValues,
} from "@/components/register-resume-form";
import { useState } from "react";

export default function RegisterResume() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: RegisterResumeFormValues) => {
    try {
      setIsSubmitting(true);

      const payload: RegisterResumeFormValues = {
        ...values,
        phone_number: values.phone_number?.replace(/\D/g, ""),
      };

      const response = await fetch("http://localhost:4000/resume", {
        body: JSON.stringify(payload),
        method: "POST",
        headers: {
          authorization: process.env.API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        window.location.href = "/";
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full">
      <RegisterResumeForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </main>
  );
}
