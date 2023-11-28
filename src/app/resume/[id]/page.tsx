"use client";

import { ResumeInfo } from "@/components/resume-info";
import { useParams } from "next/navigation";

export default function Resume() {
  const { id } = useParams();

  return (
    <div className="flex justify-center w-full py-6">
      <ResumeInfo id={id} />
    </div>
  );
}
