"use client";

import { GroupedResumePreview } from "@/types";
import {
  extractResumesPreview,
  groupResumesPreviewByCreationDate,
} from "@/utils/transformers";
import { useCallback, useEffect, useState } from "react";
import { ResumesCard } from "./resumes-card";
import { FaFaceFrown } from "react-icons/fa6";

import { Spinner } from "./spinner";
import { changeFormateDate, getWeekDayPtBRFromDate } from "@/utils/date";
import { isEmpty } from "lodash";

type ResumesProps = {
  resumesPreview: GroupedResumePreview;
};

export const Resumes = ({ resumesPreview }: ResumesProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="h-screen py-6">
      {isLoading && (
        <div className="flex justify-center items-center h-[80%]">
          <Spinner />
        </div>
      )}

      <div
        className={`overflow-y-scroll max-h-[80vh] transition-all ease-in duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {!isLoading && isEmpty(resumesPreview) && (
          <div className="flex flex-col gap-2 justify-center items-center h-[80vh]">
            <FaFaceFrown size={70} color="white" />
            <span>Nenhum currículo cadastrado</span>
          </div>
        )}

        {Object.entries(resumesPreview).map(([strDate, resumes]) => (
          <div key={strDate} className="mb-6">
            <p className="mb-2">{`${changeFormateDate(
              strDate
            )} - ${getWeekDayPtBRFromDate(new Date(strDate))}`}</p>

            <div className={`flex flex-col gap-2`}>
              {resumes.map((resume) => (
                <ResumesCard key={resume.id} {...resume} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
