import type { Metadata } from "next";
import { Geist, Geist_Mono, Alfa_Slab_One } from "next/font/google";
import "./globals.css";
import { Providers } from "@lib/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alfa = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alfa",
});

export const metadata: Metadata = {
  title: "Dev Insight",
  description: "Plataforma de análise de devs",
  icons: {
    icon: "/github.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
