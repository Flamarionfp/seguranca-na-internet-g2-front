import { ResumePreview } from "@/types";
import { FaArrowAltCircleRight } from "react-icons/fa";

export const ResumesCard = ({ name, email }: ResumePreview) => {
  return (
    <div className="bg-white rounded-lg rounded-r-none shadow-sm text-black select-none flex justify-between">
      <div className="p-6">
        <h3>
          <b>Nome</b> {name}
        </h3>
        <p>
          <b>E-mail</b> {email}
        </p>
      </div>

      <div className="group cursor-pointer bg-blue-600 flex items-center px-2 transition-all hover:px-10 active:opacity-80">
        <div className="group-hover:scale-150 transition-all">
          <FaArrowAltCircleRight className="text-white" />
        </div>
      </div>
    </div>
  );
};
