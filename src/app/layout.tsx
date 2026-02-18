import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Grow+ Studio | Creative Agency & Content Production",
  description:
    "Grow+ Studio is a creative agency and production studio focused on branding, audiovisual storytelling, and digital infrastructure for entrepreneurs in Brazil and the United States.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} font-sans bg-[color:var(--bg)] text-[color:var(--text-primary)]`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
