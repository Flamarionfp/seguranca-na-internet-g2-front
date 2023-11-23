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

export const Resumes = () => {
  const [resumesPreview, setResumesPreview] = useState<GroupedResumePreview>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchResumes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/resumes");
      const data = await response.json();

      const resumesPreview = extractResumesPreview(data);
      const groupedPreview = groupResumesPreviewByCreationDate(resumesPreview);

      setResumesPreview(groupedPreview);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

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
