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
  title: "Grow+ Studio | Agência Criativa & Produção de Conteúdo",
  description:
    "Grow+ Studio é uma agência criativa e produtora focada em branding, storytelling audiovisual e infraestrutura digital para empreendedores brasileiros com empresas no Brasil e nos Estados Unidos.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://growstudio.vercel.app"
  ),
  openGraph: {
    title: "Grow+ Studio | Agência Criativa & Produção de Conteúdo",
    description:
      "Grow+ Studio é uma agência criativa e produtora focada em branding, storytelling audiovisual e infraestrutura digital para empreendedores brasileiros com empresas no Brasil e nos Estados Unidos.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grow+ Studio - Agência Criativa & Produção de Conteúdo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow+ Studio | Agência Criativa & Produção de Conteúdo",
    description:
      "Grow+ Studio é uma agência criativa e produtora focada em branding, storytelling audiovisual e infraestrutura digital para empreendedores brasileiros com empresas no Brasil e nos Estados Unidos.",
    images: ["/og-image.jpg"],
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
