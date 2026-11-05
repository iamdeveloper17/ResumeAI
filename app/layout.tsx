import type { Metadata } from "next";
import { Inter, Roboto, Playfair_Display, Merriweather, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-roboto" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const merriweather = Merriweather({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-merriweather" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "ResumeAI — AI-Powered Resume Builder",
  description:
    "Build professional resumes with AI. Generate summaries, enhance bullet points, and export to PDF in minutes.",
  keywords: ["resume", "AI", "resume builder", "CV", "job", "career"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} ${playfair.variable} ${merriweather.variable} ${montserrat.variable} antialiased font-sans`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}