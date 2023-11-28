import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  isTextArea?: boolean;
}
export const Input = ({
  label,
  error,
  icon,
  isTextArea = false,
  ...rest
}: InputProps) => {
  const inputErrorStyle = error && "border-red-500 border-solid border-[2px]";
  const textErrorStyle = error && "text-red-500";
  const iconInputStyle = icon ? "pl-14 pr-3" : "px-4";

  return (
    <>
      {label && <label>{label}</label>}
      <div className="relative">
        {isTextArea ? (
          <textarea
            className={`outline-none py-2 px-4 w-full bg-white rounded-md text-black ${iconInputStyle} ${inputErrorStyle}`}
            {...rest}
          />
        ) : (
          <input
            className={`outline-none py-2 px-4 w-full bg-white rounded-md text-black ${iconInputStyle} ${inputErrorStyle}`}
            {...rest}
          />
        )}

        <div className="absolute bottom-3 left-5">{icon}</div>
      </div>

      {error && <span className={textErrorStyle}>{error}</span>}
    </>
  );
};
