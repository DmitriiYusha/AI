import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display, Lora } from "next/font/google";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-display" });

export const metadata: Metadata = {
  title: "Путешествие от Гермеса",
  description: "Ваш персональный путеводитель и генератор маршрутов. Топовые маршруты, карта по дням и идеи от личного ассистента.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
