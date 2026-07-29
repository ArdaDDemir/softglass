import { Providers } from "@/components/providers";
import { ThemeBootstrap } from "@/components/theme-bootstrap";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Softglass — Soft glass design system",
  description:
    "Open soft-glass design system for Next.js. Four visual languages, atomic tokens, shadcn-style ownership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-softglass-theme="aurora"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeBootstrap />
      </head>
      <body className="min-h-full flex flex-col sg-app-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
