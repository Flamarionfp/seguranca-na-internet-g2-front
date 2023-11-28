import { FaFaceFrown } from "react-icons/fa6";

type EmptyStateProps = {
  message: string;
};

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-[80vh]">
      <FaFaceFrown size={70} color="white" />
      <span>{message}</span>
    </div>
  );
};
