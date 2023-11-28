import { Resumes } from "@/components/resumes";
import {
  extractResumesPreview,
  groupResumesPreviewByCreationDate,
} from "@/utils/transformers";

export default async function Home() {
  const response = await fetch("http://localhost:4000/resumes", {
    cache: "no-cache",
    headers: {
      authorization: `${process.env.API_KEY}`,
    },
  });

  const data = await response.json();

  const resumesPreview = extractResumesPreview(data);
  const groupedPreview = groupResumesPreviewByCreationDate(resumesPreview);

  return (
    <main className="w-full">
      <Resumes resumesPreview={groupedPreview} />
    </main>
  );
}
