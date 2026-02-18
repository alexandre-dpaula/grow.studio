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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://grow-s.vercel.app"
  ),
  openGraph: {
    title: "Grow+ Studio | Creative Agency & Content Production",
    description:
      "Grow+ Studio is a creative agency and production studio focused on branding, audiovisual storytelling, and digital infrastructure for entrepreneurs in Brazil and the United States.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grow+ Studio - Creative Agency & Content Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow+ Studio | Creative Agency & Content Production",
    description:
      "Grow+ Studio is a creative agency and production studio focused on branding, audiovisual storytelling, and digital infrastructure for entrepreneurs in Brazil and the United States.",
    images: ["/og-image.png"],
  },
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
