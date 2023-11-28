import { useFormStatus } from "react-dom";
import { Spinner } from "./spinner";

type SubmitButtonProps = {
  isLoading?: boolean;
  formSubmited?: boolean;
};

export const SubmitButton = ({
  isLoading,
  formSubmited,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || formSubmited}
      className="fixed bottom-10 w-[50vw] flex justify-center items-center bg-blue-600 p-4 rounded-md font-bold transition-all active:scale-90 hover:bg-blue-600/40 disabled:cursor-default disabled:bg-blue-600/40 disabled:scale-100"
    >
      {isLoading ? <Spinner variant="small" /> : "Cadastrar"}
    </button>
  );
};
