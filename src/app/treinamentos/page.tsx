import type { Metadata } from "next";
import TreinamentosHero from "@/components/TreinamentosHero";
import TreinamentosCardsGrid from "@/components/TreinamentosCardsGrid";

export const metadata: Metadata = {
  title: "Treinamentos Presenciais | GrowS",
  description:
    "Escolha um dos 3 treinamentos presenciais e abra a página de vendas no layout padrão.",
};

export default function TreinamentosHubPage() {
  return (
    <main className="min-h-screen bg-[#03070d] text-white">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(163,230,53,0.18),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(74,222,128,0.12),transparent_32%),linear-gradient(180deg,#03070d_0%,#040911_100%)]" />

      <TreinamentosHero />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <TreinamentosCardsGrid />
        </div>
      </section>
    </main>
  );
}
