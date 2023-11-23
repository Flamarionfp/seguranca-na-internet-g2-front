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

      const response = await fetch("http://localhost:4000/resume", {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        window.location.href = "/";
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
