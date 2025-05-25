import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Modern UI Library - React Component Library",
  description: "A modern, performant, and accessible React component library built with Next.js, TypeScript, and Tailwind CSS",
  keywords: ["react", "components", "ui", "library", "typescript", "tailwind", "nextjs"],
  authors: [{ name: "Modern UI Library" }],
  openGraph: {
    title: "Modern UI Library",
    description: "A modern React component library",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}