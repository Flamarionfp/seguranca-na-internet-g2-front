"use client";

import { Input } from "./input";
import { z } from "zod";
import { MdLocalPhone, MdEmail, MdPerson, MdHomeFilled } from "react-icons/md";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Spinner } from "./spinner";

const requiredFieldMessage = "Campo obrigatório";

const formSchema = z.object({
  full_name: z
    .string({ required_error: requiredFieldMessage })
    .regex(/^[a-zA-Z\s]+$/, { message: "Nome inválido" }),
  email: z
    .string({ required_error: requiredFieldMessage })
    .email({ message: "E-mail inválido" }),
  phone_number: z
    .string({ required_error: requiredFieldMessage })
    .min(10, { message: "Telefone inválido" })
    .max(11, { message: "Telefone inválido" })
    .regex(/^\d+$/, { message: "Telefone inválido" })
    .optional(),
  web_address: z
    .string({ required_error: requiredFieldMessage })
    .url({ message: "Endereço web inválido" })
    .optional(),
  work_experience: z.string({ required_error: requiredFieldMessage }).min(50),
});

export type InitialValues = z.infer<typeof formSchema>;

const INITIAL_VALUES: InitialValues = {
  full_name: "",
  email: "",
  phone_number: "",
  web_address: "",
  work_experience: "",
};

type RegisterResumeForm = {
  isSubmitting: boolean;
  onSubmit: (values: InitialValues) => Promise<void>;
};
export const RegisterResumeForm = ({
  isSubmitting = false,
  onSubmit,
}: RegisterResumeForm) => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(formSchema),
    initialValues: INITIAL_VALUES,
    onSubmit,
  });

  return (
    <form
      className="mx-auto max-w-[50vw] overflow-y-scroll max-h-[68vh] py-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div className="flex flex-col gap-4 justify-center ">
        <Input
          name="full_name"
          value={values.full_name}
          onChange={(e) => setFieldValue("full_name", e.target.value)}
          onBlur={() => setFieldTouched("full_name")}
          icon={<MdPerson color="black" />}
          label="Nome completo"
          placeholder="Digite seu nome completo"
          error={touched.full_name ? errors.full_name : undefined}
        />

        <Input
          name="phone_number"
          value={values.phone_number}
          onChange={(e) => setFieldValue("phone_number", e.target.value)}
          onBlur={() => setFieldTouched("phone_number")}
          icon={<MdLocalPhone color="black" />}
          label="Telefone"
          placeholder="Digite seu telefone"
          error={touched.phone_number ? errors.phone_number : undefined}
        />

        <Input
          name="web_address"
          value={values.web_address}
          onChange={(e) => setFieldValue("web_address", e.target.value)}
          onBlur={() => setFieldTouched("web_address")}
          icon={<MdHomeFilled color="black" />}
          label="Endereço Web"
          placeholder="Digite seu endereço web"
          error={touched.web_address ? errors.web_address : undefined}
        />

        <Input
          name="email"
          value={values.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
          onBlur={() => setFieldTouched("email")}
          icon={<MdEmail color="black" />}
          label="E-mail"
          placeholder="Digite seu e-mail"
          error={touched.email ? errors.email : undefined}
        />

        <Input
          id="text-area-work-experience"
          isTextArea
          name="work_experience"
          label="Experiência profissional"
          value={values.work_experience}
          onChange={(e) => setFieldValue("work_experience", e.target.value)}
          onBlur={() => setFieldTouched("work_experience")}
          placeholder="Conte um pouco sobre sua experiência profissional"
          error={touched.work_experience ? errors.work_experience : undefined}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="fixed bottom-10 w-[50vw] flex justify-center items-center bg-blue-600 p-4 rounded-md font-bold transition-all active:scale-90 hover:bg-blue-600/40 disabled:cursor-default disabled:bg-blue-600/40 disabled:scale-100"
      >
        {isSubmitting ? <Spinner size={4} /> : "Cadastrar"}
      </button>
    </form>
  );
};
