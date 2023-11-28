"use client";

import { ResumeInfoDetails } from "@/types";
import { useEffect, useState } from "react";

import { formatCellPhone } from "@/utils/phone";
import { EmptyState } from "./empty-state";
import { isEmpty } from "lodash";

type ResumeInfoProps = {
  resumesInfoDetails: ResumeInfoDetails;
};

export const ResumeInfo = ({ resumesInfoDetails }: ResumeInfoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const isEmptyData = isEmpty(resumesInfoDetails?.person);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div
      className={`transition-all ease-in duration-500 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      {isLoading && <></>}

      {isEmptyData ? (
        <EmptyState message="Currículo não encontrado" />
      ) : (
        <div className="bg-white rounded-md p-4 shadow-lg text-black overflow-y-scroll max-h-[80%]">
          <p>
            <b>Nome:</b> {resumesInfoDetails.person.name}
          </p>
          {resumesInfoDetails.person?.phone_number && (
            <p>
              <b>Telefone:</b>{" "}
              {formatCellPhone(resumesInfoDetails.person.phone_number)}
            </p>
          )}
          <p>
            <b>E-mail:</b> {resumesInfoDetails.person.email}
          </p>

          {resumesInfoDetails.person?.web_address && (
            <p>
              <b>Endereço Web:</b> {resumesInfoDetails.person.web_address}
            </p>
          )}

          <hr className="my-4" />
          <h3 className="font-bold mb-2">Experiência Profissional</h3>
          <p className="leading-8">{resumesInfoDetails.description}</p>
        </div>
      )}
    </div>
  );
};
