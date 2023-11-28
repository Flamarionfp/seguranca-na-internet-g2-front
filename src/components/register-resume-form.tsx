"use client";

import { Input } from "./input";
import { MdLocalPhone, MdEmail, MdPerson, MdHomeFilled } from "react-icons/md";
import { Fragment, useCallback, useEffect, useState } from "react";
import { registerResume } from "@/app/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastDefaultProps } from "@/utils/toast";
import { isUndefined } from "lodash";
import { formatCellPhone } from "@/utils/phone";
import { RegisterResumeFormErrors } from "@/utils/schemas/register-resume-form";

type FormState = {
  message: string;
  hasError: boolean;
  errors: RegisterResumeFormErrors;
};

const formInitialState: FormState = {
  message: "",
  hasError: false,
  errors: {} as RegisterResumeFormErrors,
};

export const RegisterResumeForm = () => {
  const [formSubmited, setFormSubmited] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [formState, formAction] = useFormState(
    registerResume,
    formInitialState
  );

  const parsedFormState = formState as FormState;

  const showErrorToast = useCallback(() => {
    toast.error(parsedFormState?.message ?? "", {
      ...toastDefaultProps,
      toastId: "error-toast",
    });
  }, [parsedFormState?.message]);

  const handleSubmitSuccess = useCallback(() => {
    if (isUndefined(parsedFormState)) {
      setFormSubmited(true);

      toast.success("Currículo cadastrado com sucesso", {
        ...toastDefaultProps,
        toastId: "success-toast",
        autoClose: 1000,
        onClose: () => (window.location.href = "/"),
      });
    }
  }, [parsedFormState]);

  const handleSubmitError = useCallback(() => {
    if (parsedFormState?.hasError) {
      showErrorToast();
    }
  }, [parsedFormState?.hasError, showErrorToast]);

  useEffect(() => {
    handleSubmitError();
  }, [handleSubmitError]);

  useEffect(() => {
    handleSubmitSuccess();
  }, [handleSubmitSuccess]);

  useEffect(() => {
    setPageLoading(false);
  }, []);

  return (
    <Fragment>
      <ToastContainer />

      <form
        action={formAction}
        className={`transition-all ease-in duration-500 ${
          pageLoading ? "opacity-0" : "opacity-100"
        } mx-auto max-w-[50vw] overflow-y-scroll max-h-[68vh] py-6`}
      >
        <div className="flex flex-col gap-4 justify-center ">
          <Input
            maxLength={100}
            type="text"
            name="full_name"
            icon={<MdPerson color="black" />}
            label="Nome completo"
            placeholder="Digite seu nome completo"
            error={parsedFormState?.errors?.full_name}
          />

          <Input
            maxLength={15}
            type="text"
            name="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatCellPhone(e.target.value))}
            icon={<MdLocalPhone color="black" />}
            label="Telefone"
            placeholder="Digite seu telefone"
            error={parsedFormState?.errors?.phone_number}
          />

          <Input
            maxLength={100}
            type="text"
            name="web_address"
            icon={<MdHomeFilled color="black" />}
            label="Endereço Web"
            placeholder="Digite seu endereço web"
            error={parsedFormState?.errors?.web_address}
          />

          <Input
            maxLength={100}
            type="email"
            name="email"
            icon={<MdEmail color="black" />}
            label="E-mail"
            placeholder="Digite seu e-mail"
            error={parsedFormState?.errors?.email}
          />

          <Input
            maxLength={1000}
            type="text"
            isTextArea
            name="work_experience"
            label="Experiência profissional"
            placeholder="Conte um pouco sobre sua experiência profissional"
            error={parsedFormState?.errors?.work_experience}
          />
        </div>

        <SubmitButton isLoading={formSubmited} formSubmited={formSubmited} />
      </form>
    </Fragment>
  );
};
