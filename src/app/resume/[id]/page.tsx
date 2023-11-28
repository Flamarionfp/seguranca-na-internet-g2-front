import { ResumeInfo } from "@/components/resume-info";

type ResumeProps = {
  params: { id: string };
};

export default async function Resume({ params: { id } }: ResumeProps) {
  const response = await fetch(`http://localhost:4000/resume/${id}`, {
    cache: "no-cache",
    headers: {
      authorization: process.env.API_KEY,
    },
  });

  const data = await response.json();

  return (
    <div className="flex justify-center w-full py-6">
      <ResumeInfo resumesInfoDetails={data} />
    </div>
  );
}
