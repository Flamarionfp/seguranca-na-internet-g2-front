import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "G2 - Segurança na Internet",
  description: "Flamarion Fagundes Pinto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full bg-gray-800/40 h-20">
          <div className="max-w-[1236px] h-full flex justify-between items-center mx-auto">
            <div className="flex items-center gap-3">
              <Image
                src="/fit-logo.png"
                alt="Logo FIT"
                width={50}
                height={50}
              />
              <h1 className="font-bold text-xl">Currículos</h1>
            </div>
            <div />

            <Link
              className="flex items-center gap-2 hover:scale-90 transition-all ease-in duration-150  hover:text-blue-600"
              href="/"
            >
              <span className="font-light">Cadastrar Currículo</span>
              <MdFileUpload />
            </Link>
          </div>
        </header>

        <div className="h-screen w-full max-w-[1236px] mx-auto flex items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
