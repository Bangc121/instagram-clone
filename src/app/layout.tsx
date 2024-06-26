import "./globals.css";

import AuthContext from "@/context/AuthContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col mx-auto">
        <AuthContext>
          <Header />
          <main className="grow">{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}
