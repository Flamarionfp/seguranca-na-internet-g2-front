"use client";

import Link from "next/link";
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathName = usePathname();

  return (
    <header className="w-full bg-gray-800/40 h-20">
      <div className="max-w-[1236px] h-full flex justify-between items-center mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/fit-logo.png" alt="Logo FIT" width={50} height={50} />
          <h1 className="font-bold text-xl">Currículos</h1>
        </Link>
        <div />

        {pathName !== "/register-resume" && (
          <Link
            className="flex items-center gap-2 hover:scale-90 transition-all ease-in duration-150  hover:text-blue-600"
            href="/register-resume"
          >
            <span className="font-light">Cadastrar Currículo</span>
            <MdFileUpload />
          </Link>
        )}
      </div>
    </header>
  );
};
