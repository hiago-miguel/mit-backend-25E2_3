import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicHeader from "@/components/DynamicHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bastet",
  description: "Plataforma de cursos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col gap-10">
          <DynamicHeader />
          <div className="layout-guide flex-1">
            {children}
          </div>
          <footer className="bg-indigo-800">
            <p className="p-4 text-center text-white text-sm">A plataforma Baslet faz parte de um projeto criado para fins didaticos para a disciplina de Backend Node.js com SQL no Instituto INFnet.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
