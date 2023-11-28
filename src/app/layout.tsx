import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

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
        <Header />
        <div className="h-screen w-full max-w-[1236px] mx-auto flex">
          {children}
        </div>
      </body>
    </html>
  );
}
