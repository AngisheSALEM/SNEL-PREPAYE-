import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DeepSpaceBackground } from "@/components/background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SNEL-PAY | Recharge Électrique",
  description: "Plateforme premium de recharge électrique SNEL en RDC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <DeepSpaceBackground />
        {children}
      </body>
    </html>
  );
}
