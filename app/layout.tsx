import type { Metadata } from "next";
import { Gelasio, PT_Mono } from "next/font/google";
import "./globals.css";

const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-gelasio",
  display: "swap",
});

const ptMono = PT_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pt-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oh Yvi — Paper Goods",
  description:
    "Thoughtfully designed stationery for planning your days, collecting your ideas, and making a little more sense of everything in between.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${gelasio.variable} ${ptMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}