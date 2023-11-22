import { ListResumesResponse, ResumePreview } from "@/types";
import { groupBy, sortBy } from "lodash";

export const extractResumesPreview = (
  resumesResponse: ListResumesResponse
): ResumePreview[] => {
  return resumesResponse.map(({ createdAt, person: { id, name, email } }) => {
    return {
      id,
      name,
      email,
      createdAt,
    };
  });
};

const sortResumesPreviewByCreationDate = (resumesPreview: ResumePreview[]) => {
  return sortBy(resumesPreview, "createdAt");
};

export const groupResumesPreviewByCreationDate = (
  resumesPreview: ResumePreview[]
) => {
  const sorttedData = sortResumesPreviewByCreationDate(resumesPreview);

  return groupBy(sorttedData, ({ createdAt }) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  });
};
