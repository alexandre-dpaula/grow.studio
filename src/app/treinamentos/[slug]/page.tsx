import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowRight,
  BadgeCheck,
  CircleX,
  Clock3,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";
import PromptTypewriter from "@/components/PromptTypewriter";
import RollingWordsHero from "@/components/RollingWordsHero";
import Reveal from "@/components/Reveal";
import {
  TREINAMENTOS,
  getTreinamentoBySlug,
  type Treinamento,
} from "@/data/treinamentos";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const siteLearnHighlights = [
  "Estruturar uma oferta que vende",
  "Criar copy de vendas usando IA",
  "Desenvolver projetos web profissionais",
  "Publicar seu projeto web rapidamente",
];

const siteProblemPoints = [
  "Dependentes de programadores",
  "Pagando caro por desenvolvimento",
  "Demorando semanas para lançar uma ideia",
];

const siteRealityNeeds = [
  "Estrutura de projetos web",
  "Copy de vendas",
  "Organização da oferta",
  "Lógica de conversão",
];

const siteProcessSteps = [
  {
    title: "1. Estrutura de Oferta",
    description: "Como organizar uma oferta clara e atrativa.",
  },
  {
    title: "2. Copy de Vendas com IA",
    description: "Como gerar textos que realmente vendem.",
  },
  {
    title: "3. Estrutura do Projeto Web",
    description: "Como montar projetos web com lógica de conversão.",
  },
  {
    title: "4. Criação do Projeto Web",
    description: "Como construir seu projeto web rapidamente com IA.",
  },
  {
    title: "5. Publicação",
    description: "Como colocar seu projeto web no ar.",
  },
];

const siteResultOutcomes = [
  "Um projeto web estruturado",
  "Copy de vendas",
  "Layout profissional",
  "Projeto web pronto para publicar",
];

const siteBonusBusinessItems = [
  "Como vender projetos web para clientes",
  "Como oferecer esse serviço no mercado",
  "Como criar projetos para empresas",
];

const siteAudience = [
  "Renda Extra",
  "Empreendedores",
  "Criadores de conteúdo",
  "Social media",
  "Freelancers",
  "Profissionais de marketing",
];

const siteTrainingInfo = [
  {
    icon: MapPin,
    title: "Treinamento presencial",
    description: "Evento prático com execução guiada.",
  },
  {
    icon: Clock3,
    title: "Duração de 4 horas",
    description: "Conteúdo direto ao ponto com aplicação real.",
  },
  {
    icon: Users,
    title: "Vagas limitadas",
    description: "Turma reduzida para acompanhamento próximo.",
  },
];

const commercialQuickBenefits = [
  "Crie roteiros com IA",
  "Gere imagens e vídeos cinematográficos",
  "Produza comerciais para redes sociais e anúncios",
  "Tenha um comercial profissional para sua marca",
];

const commercialCreateDuringEvent = [
  "Roteiro publicitário",
  "Cenas cinematográficas com IA",
  "Locução profissional",
  "Comercial pronto para divulgação",
];

const commercialModules = [
  "Módulo 1: Estrutura de propaganda que vende",
  "Módulo 2: Criando roteiro publicitário com IA",
  "Módulo 3: Gerando cenas cinematográficas",
  "Módulo 4: Criando locução profissional com IA",
  "Módulo 5: Montando o comercial final",
];

const commercialAudience = [
  "Empreendedores",
  "Social medias",
  "Criadores de conteúdo",
  "Donos de negócio",
  "Agências",
  "Igrejas e ministérios",
];

const commercialFinalResult = [
  "Roteiro publicitário",
  "Cenas cinematográficas",
  "Narração profissional",
  "Comercial pronto para publicar",
];

const commercialBonuses = [
  "Prompts cinematográficos",
  "Estrutura de roteiro de propaganda",
  "Guia de anúncios para redes sociais",
];

const commercialProblemNeeds = [
  "Câmeras profissionais",
  "Equipe de filmagem",
  "Iluminação",
  "Editor de vídeo",
  "Alto investimento",
];

const commercialRealityItems = [
  "Anúncios para Instagram",
  "Comerciais para empresas",
  "Campanhas visuais",
  "Vídeos publicitários",
];

const ensaioQuickBenefits = [
  "Crie fotos profissionais com IA",
  "Produza imagens de campanha",
  "Crie conteúdo premium para redes sociais",
  "Desenvolva identidade visual para marcas",
];

const ensaioProblemNeeds = [
  "Estúdio fotográfico",
  "Fotógrafo profissional",
  "Iluminação",
  "Produção de cenário",
  "Edição",
];

const ensaioRealityItems = [
  "Campanhas visuais",
  "Fotos para Instagram",
  "Imagens para produtos",
  "Identidade visual de marca",
];

const ensaioCreateDuringEvent = [
  "Conceito visual do ensaio",
  "Direção de arte com IA",
  "Imagens profissionais",
  "Ensaio completo para redes sociais",
];

const ensaioModules = [
  "Módulo 1: Fundamentos de fotografia visual",
  "Módulo 2: Criando conceito visual",
  "Módulo 3: Prompts fotográficos profissionais",
  "Módulo 4: Gerando imagens com IA",
  "Módulo 5: Finalização e aplicação em redes sociais",
];

const ensaioAudience = [
  "Criadores de conteúdo",
  "Influenciadores",
  "Empreendedores",
  "Social media",
  "Fotógrafos",
  "Marcas pessoais",
];

const ensaioFinalResult = [
  "Ensaio fotográfico completo",
  "Imagens para redes sociais",
  "Identidade visual para sua marca",
  "Conteúdo pronto para publicar",
];

const ensaioBonuses = [
  "Biblioteca de prompts fotográficos",
  "Guia de direção de arte com IA",
  "Presets visuais para redes sociais",
];

const CRIE_PAGINAS_CHECKOUT_URL = "https://pay.kiwify.com.br/LjDaFD8";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const treinamento = getTreinamentoBySlug(slug);

  if (!treinamento) {
    return {
      title: "Treinamento | GrowS",
    };
  }

  return {
    title: `${treinamento.title} | GrowS`,
    description: treinamento.cardDescription,
  };
}

function SitePaginasVendasSalesPage({
  treinamento,
}: {
  treinamento: Treinamento;
}) {
  return (
    <>
      <Script
        id="meta-pixel-crie-paginas"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1391779208808144');
fbq('track', 'PageView');`,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1391779208808144&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <main className="training-sales-page min-h-screen bg-[#03070d] text-white [&_h1]:uppercase [&_h2]:uppercase [&_h3]:uppercase">
        <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(163,230,53,0.18),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(74,222,128,0.12),transparent_32%),linear-gradient(180deg,#03070d_0%,#040911_100%)]" />

      <section className="relative isolate overflow-hidden" id="hero">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/2hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpg"
            alt={treinamento.title}
            fill
            priority
            unoptimized
            className="object-cover object-center sm:hidden"
          />
          <Image
            src="/hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpeg"
            alt={treinamento.title}
            fill
            priority
            unoptimized
            className="hidden object-cover object-center sm:block"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.06)_0%,rgba(3,7,13,0.22)_42%,rgba(3,7,13,0.58)_72%,rgba(3,7,13,0.9)_100%)]" />
        </div>

        <div className="training-sales-hero-content mx-auto flex w-full max-w-6xl flex-col items-center justify-end text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              <BadgeCheck size={14} className="text-lime-300" />
              TREINAMENTO PRESENCIAL
            </span>
          </Reveal>

          <Reveal delay={0.08} className="mt-5 w-full max-w-6xl">
            <h1 className="font-heading font-semibold leading-[0.95]">
              <span className="sr-only">
                Projetos web, página de vendas, links de afiliados, web site,
                formulários ou checkouts em minutos usando IA
              </span>
              <span
                aria-hidden
                className="hero-headline-inline text-[2rem] sm:text-5xl md:text-6xl"
              >
                <span className="hero-text-roller hero-text-roller-lime">
                  <span className="hero-text-roller-track">
                    <span className="hero-text-roller-item">
                      PROJETOS WEB
                    </span>
                    <span className="hero-text-roller-item">
                      PÁGINA DE VENDAS
                    </span>
                    <span className="hero-text-roller-item">
                      LINKS DE AFILIADOS
                    </span>
                    <span className="hero-text-roller-item">WEB SITE</span>
                    <span className="hero-text-roller-item">FORMULÁRIOS</span>
                    <span className="hero-text-roller-item">CHECKOUTS</span>
                    <span className="hero-text-roller-item">
                      PROJETOS WEB
                    </span>
                  </span>
                </span>
                <span className="hero-tail-text">EM MINUTOS USANDO IA</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-6 max-w-3xl">
            <p className="text-base text-white/75 sm:text-lg">
              Mesmo que você não saiba programar, design ou marketing, você vai
              aprender a criar projetos web profissionais prontos para vender.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8">
            <a
              href={CRIE_PAGINAS_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-300 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
            >
              QUERO CRIAR MEU PROJETO WEB
              <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="normal-case text-4xl font-semibold leading-tight sm:text-5xl">
              O que você vai aprender no curso "Crie Projetos WEB em 5min" 🚀
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed sm:leading-8">
              Esse treinamento é 100% prático. Você aprenderá a transformar sua
              ideia ou oferta em uma página web real, persuasiva e funcional -
              tudo no mesmo dia, sem precisar ser expert em programação.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <article className="rounded-3xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                  O que você vai aprender
                </p>
                <ul className="mt-5 space-y-3 text-sm text-white/90 sm:text-base">
                  {siteLearnHighlights.map((item) => (
                    <li key={item}>
                      <span className="mr-2 text-lime-300">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="rounded-3xl border border-lime-300/35 bg-[linear-gradient(180deg,rgba(22,36,22,0.86),rgba(8,14,10,0.9))] p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
                  BÔNUS
                </p>
                <p className="mt-4 text-white/85">
                  Aprenda também como transformar isso em um serviço e vender
                  projetos web para clientes.
                </p>
                <a
                  href={CRIE_PAGINAS_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                >
                  Quero aprender esse método
                  <ArrowRight size={16} />
                </a>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                O PROBLEMA
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Hoje qualquer pessoa pode vender na internet.
              </h2>
              <p className="mt-4 text-white/90">Mas existe um problema:</p>
              <p className="mt-2 text-white/80">
                A maioria das pessoas não sabe como criar projetos web
                profissionais.
              </p>
              <p className="mt-6 text-white/90">Então acabam:</p>
              <ul className="mt-4 space-y-2 text-white/80">
                {siteProblemPoints.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/12 sm:min-h-[360px]">
                <Image
                  src="/hf_20260314_214334_b0f80242-6be4-4125-9e9c-49e3f24ef1fe.jpeg"
                  alt="Desafios para estruturar projetos web de vendas"
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.08)_0%,rgba(3,7,13,0.42)_100%)]" />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              A NOVA REALIDADE
            </p>
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal>
              <article className="rounded-3xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-7 sm:p-8">
                <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  HOJE A INTELIGÊNCIA ARTIFICIAL PERMITE CRIAR PROJETOS WEB DE
                  FORMA MUITO MAIS RÁPIDA.
                </h2>

              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mb-4 text-white/90">É preciso entender:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {siteRealityNeeds.map((item, index) => (
                  <Reveal key={item} delay={index * 0.05}>
                    <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                      <BadgeCheck size={16} className="mr-2 inline-block text-lime-300" />
                      {item}
                    </article>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                O DIFERENCIAL DO TREINAMENTO
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Esse não é apenas um treinamento sobre ferramentas de IA.
              </h2>
              <p className="mt-3 text-white/80">
                Você vai aprender o processo profissional que utilizo para
                desenvolver projetos web para meus clientes.
              </p>
              <p className="mt-3 text-white/80">
                O mesmo processo usado em projetos reais.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/12 sm:min-h-[360px]">
                <Image
                  src="/diferencial2.jpg"
                  alt="Imagem diferencial do treinamento"
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.06)_0%,rgba(3,7,13,0.36)_100%)]" />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              O PROCESSO QUE VOCÊ VAI APRENDER
            </p>
            <p className="mt-4 text-white/85">
              Durante o treinamento você vai aprender:
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {siteProcessSteps.map((step, index) => (
              <Reveal key={step.title} delay={0.05 * index}>
                <article className="h-full rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-5">
                  <h3 className="text-base font-semibold text-white/95">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/75">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              RESULTADO DO TREINAMENTO
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Ao final do treinamento você terá:
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {siteResultOutcomes.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                  <span className="mr-2 text-lime-300">✔</span>
                  {item}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                BÔNUS ESPECIAL
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Como transformar
                <br />
                isso em um negócio
              </h2>
              <p className="mt-4 text-white/85">Você também vai aprender:</p>

              <div className="mt-6 grid gap-3">
                {siteBonusBusinessItems.map((item, index) => (
                  <Reveal key={item} delay={0.05 * index}>
                    <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                      <span className="mr-2 text-lime-300">✔</span>
                      {item}
                    </article>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/12 sm:min-h-[360px]">
                <Image
                  src="/diferencial.png"
                  alt="Imagem bônus especial do treinamento"
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.06)_0%,rgba(3,7,13,0.36)_100%)]" />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal className="max-w-4xl">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Se você quer criar projetos profissionais ou vender esse serviço,
              esse treinamento é para você.
            </h2>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              PARA QUEM É
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {siteAudience.map((item, index) => (
                <Reveal key={item} delay={0.05 * index}>
                  <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                    <span className="mr-2 text-lime-300">✔</span>
                    {item}
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="oferta" className="border-t border-white/10 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-3xl border border-white/12 bg-[rgba(7,12,20,0.8)] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                INFORMAÇÕES DO TREINAMENTO
              </p>
              <p className="mt-3 max-w-lg text-sm text-white/70 sm:text-base">
                Imersão presencial para você sair com estrutura, copy e projeto
                web pronto para publicar.
              </p>

              <div className="mt-6 grid gap-3">
                {siteTrainingInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/12 bg-black/30 px-4 py-4"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-lime-300/35 bg-lime-300/10 text-lime-200">
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white/95 sm:text-base">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-white/70 sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="relative overflow-hidden rounded-3xl border border-lime-300/35 bg-[linear-gradient(180deg,rgba(22,36,22,0.9),rgba(8,14,10,0.92))] p-7 sm:p-8">
              <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-lime-300/20 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-200">
                  INVESTIMENTO
                </p>

                <div className="mt-5 rounded-2xl border border-white/12 bg-black/25 p-5">
                  <p className="text-sm text-white/65 line-through">De R$497</p>
                  <p className="mt-1 text-5xl font-semibold leading-none text-white">
                    R$197
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    Confira as formas de pagamento disponíveis.
                  </p>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-100">
                  <Users size={14} />
                  Vagas limitadas por turma
                </div>

                <a
                  href={CRIE_PAGINAS_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                >
                  QUERO APRENDER ESSE MÉTODO
                  <ArrowRight size={16} />
                </a>

                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-white/70">
                  <ShieldCheck size={14} className="text-lime-200" />
                  Treinamento prático, presencial e aplicado.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/15 px-6 py-10 text-center sm:px-10">
              <Image
                src="/cc57c1955a57d404845f9c186dfcf554.jpg"
                alt="Garanta sua vaga"
                fill
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(8,12,18,0.72),rgba(20,38,18,0.66))]" />

              <div className="relative z-10">
                <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Garanta sua vaga
                </h2>
                <a
                  href={CRIE_PAGINAS_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime-300 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                >
                  Quero aprender a criar projetos web
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      </main>
    </>
  );
}

function ProprioComercialSalesPage({
  treinamento,
  otherTrainings,
}: {
  treinamento: Treinamento;
  otherTrainings: Treinamento[];
}) {
  return (
    <main className="training-sales-page min-h-screen bg-[#03070d] text-white [&_h1]:uppercase [&_h2]:uppercase [&_h3]:uppercase">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(163,230,53,0.18),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(74,222,128,0.12),transparent_32%),linear-gradient(180deg,#03070d_0%,#040911_100%)]" />

      <section className="relative isolate overflow-hidden" id="hero">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/2hf_20260221_174057_4a7dbb61-3676-4c05-892e-3d61a5ffd0ef.jpg"
            alt={treinamento.title}
            fill
            priority
            unoptimized
            className="object-cover object-center sm:hidden"
          />
          <Image
            src="/hf_20260221_174057_4a7dbb61-3676-4c05-892e-3d61a5ffd0ef.jpeg"
            alt={treinamento.title}
            fill
            priority
            unoptimized
            className="hidden object-cover object-center sm:block"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.06)_0%,rgba(3,7,13,0.22)_42%,rgba(3,7,13,0.58)_72%,rgba(3,7,13,0.9)_100%)]" />
        </div>

        <div className="training-sales-hero-content mx-auto flex w-full max-w-6xl flex-col items-center justify-end text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              <BadgeCheck size={14} className="text-lime-300" />
              TREINAMENTO PRESENCIAL
            </span>
          </Reveal>

          <Reveal delay={0.08} className="mt-5 w-full max-w-6xl">
            <h1 className="font-heading font-semibold leading-[0.95]">
              <span className="sr-only">
                Crie comerciais profissionais, criativos, vídeo institucional,
                publi ou reels usando inteligência artificial.
              </span>
              <span
                aria-hidden
                className="block text-[2rem] sm:text-5xl md:text-6xl"
              >
                <div className="hero-headline-inline justify-center">
                  <span className="hero-static-word">CRIE</span>
                  <RollingWordsHero
                    words={[
                      "Comerciais",
                      "Profissionais",
                      "Criativos",
                      "Vídeo",
                      "Institucional",
                      "Publi",
                      "Reels",
                    ]}
                    align="left"
                  />
                </div>
                <span className="hero-tail-text mt-1 block text-center text-[0.82em] sm:text-[0.78em]">
                  USANDO INTELIGÊNCIA ARTIFICIAL
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-6 max-w-3xl">
            <p className="text-base text-white/75 sm:text-lg">
              Mesmo sem câmera profissional, equipe de filmagem ou experiência
              em produção.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-300 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
            >
              QUERO CRIAR MEU COMERCIAL
              <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                O PROBLEMA
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Produzir um comercial sempre foi caro e complicado.
              </h2>
              <p className="mt-4 text-white/90">Normalmente é necessário:</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {commercialProblemNeeds.map((item, index) => (
                  <Reveal key={item} delay={index * 0.05}>
                    <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                      <CircleX size={16} className="mr-2 inline-block text-red-300" />
                      {item}
                    </article>
                  </Reveal>
                ))}
              </div>

              <article className="mt-5 rounded-2xl border border-red-300/25 bg-[linear-gradient(180deg,rgba(52,15,15,0.46),rgba(15,8,10,0.64))] px-5 py-4 text-sm text-white/90 sm:text-base">
                <span className="mr-2 font-semibold text-red-300">Resultado:</span>
                Pequenas empresas nunca fazem propaganda profissional.
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/12 sm:min-h-[360px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="https://cdn.higgsfield.ai/user_381ECYX3fWPZSY5qktp8hXNBCFW/hf_20260305_220441_1f561d05-5f13-430c-8352-3f51fb8f8af8_thumbnail.webp"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                >
                  <source
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_381ECYX3fWPZSY5qktp8hXNBCFW/hf_20260305_220441_1f561d05-5f13-430c-8352-3f51fb8f8af8.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.08)_0%,rgba(3,7,13,0.42)_100%)]" />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              A NOVA REALIDADE
            </p>
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal>
              <article className="rounded-3xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-7 sm:p-8">
                <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Hoje a IA permite criar comerciais cinematográficos com
                  ferramentas digitais.
                </h2>
                <p className="mt-4 text-white/85">Tudo usando prompts e IA.</p>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mb-4 text-white/90">Você pode criar:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {commercialRealityItems.map((item, index) => (
                  <Reveal key={item} delay={index * 0.05}>
                    <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                      <BadgeCheck size={16} className="mr-2 inline-block text-lime-300" />
                      {item}
                    </article>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              A transformação
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Antes e depois do treinamento.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal>
              <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-6">
                <h3 className="text-xl font-semibold text-white/90">Antes</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  <li>- Ideia de propaganda</li>
                  <li>- Sem produção profissional</li>
                  <li>- Conteúdo fraco nas redes</li>
                </ul>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="rounded-2xl border border-lime-300/30 bg-[rgba(20,40,22,0.55)] p-6">
                <h3 className="text-xl font-semibold text-lime-100">
                  Depois do treinamento
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/90">
                  <li>+ Comercial cinematográfico</li>
                  <li>+ Roteiro profissional</li>
                  <li>+ Vídeo pronto para anúncios</li>
                  <li>+ Conteúdo premium para redes sociais</li>
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              O que você vai criar
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Durante o treinamento você vai criar:
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {commercialCreateDuringEvent.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-5 text-sm text-white/85">
                  <span className="mr-2 text-lime-300">+</span>
                  {item}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              O que você vai aprender
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {commercialModules.map((module, index) => (
              <Reveal key={module} delay={0.05 * index}>
                <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-5">
                  <p className="text-sm font-medium text-white/90">{module}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="rounded-3xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-7 sm:p-8">
            <h2 className="!normal-case text-4xl font-semibold leading-tight sm:text-5xl">
              💡 Exemplo de mini copy para seu curso de fotografia
            </h2>
            <div className="mt-6 space-y-4 text-white/85 leading-relaxed sm:leading-8">
              <p>
                <span className="font-semibold text-white/95">Título:</span>{" "}
                Aprenda Fotografia Profissional e Destaque-se com Imagens
                Incríveis.
              </p>
              <p>
                <span className="font-semibold text-white/95">Dores:</span>{" "}
                Não sabe usar a câmera? Fotos sem foco e luz? Falta de técnica
                para vender seu trabalho?
              </p>
              <p>
                <span className="font-semibold text-white/95">Benefícios:</span>{" "}
                Aulas práticas, edição passo a passo, projetos reais, acesso
                vitalício e suporte online.
              </p>
              <p>
                <span className="font-semibold text-white/95">
                  Prova social:
                </span>{" "}
                "O curso mudou minha visão e minhas fotos melhoraram muito!" -
                Ana Silva.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 rounded-3xl border border-lime-300/30 bg-[rgba(20,40,22,0.55)] p-7 sm:p-8">
            <h2 className="!normal-case text-4xl font-semibold leading-tight text-white sm:text-5xl">
              ⚙️ Passo a passo prático para criar agora
            </h2>
            <ol className="mt-6 list-decimal space-y-3 pl-6 text-white/90 leading-relaxed sm:leading-8">
              <li>
                Defina o título forte que mostra o principal benefício do curso.
              </li>
              <li>
                Liste 3-5 dores do seu público que seu curso resolve.
              </li>
              <li>Escreva os benefícios e diferenciais do curso.</li>
              <li>
                Cole depoimentos ou crie provas sociais (mesmo em texto curto).
              </li>
              <li>
                Faça um call to action claro para captar o lead (ex: Garanta
                sua Vaga).
              </li>
            </ol>
            <p className="mt-6 text-white/95 leading-relaxed sm:leading-8">
              <span className="font-semibold text-lime-200">CTA:</span>{" "}
              Inscreva-se hoje e comece a fotografar como um profissional!
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              Para quem é
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Se você quer criar propaganda profissional, esse treinamento é
              para você.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {commercialAudience.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                  <span className="mr-2 text-lime-300">+</span>
                  {item}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              Resultado final
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              No final do treinamento você terá:
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {commercialFinalResult.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                  <span className="mr-2 text-lime-300">+</span>
                  {item}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="oferta" className="border-t border-white/10 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-3xl border border-white/12 bg-[rgba(7,12,20,0.8)] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                Treinamento presencial
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Evento prático de 4 horas com vagas limitadas.
              </h2>
              <p className="mt-3 max-w-lg text-sm text-white/70 sm:text-base">
                Aprenda roteiro, produção e montagem para sair com um comercial
                pronto para publicar e anunciar.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/12 bg-black/35 p-4 text-center">
                  <MapPin size={16} className="mx-auto text-lime-200" />
                  <p className="mt-2 text-sm text-white/80">Evento prático</p>
                </div>
                <div className="rounded-xl border border-white/12 bg-black/35 p-4 text-center">
                  <Clock3 size={16} className="mx-auto text-lime-200" />
                  <p className="mt-2 text-sm text-white/80">4 horas</p>
                </div>
                <div className="rounded-xl border border-white/12 bg-black/35 p-4 text-center">
                  <Users size={16} className="mx-auto text-lime-200" />
                  <p className="mt-2 text-sm text-white/80">Vagas limitadas</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="relative overflow-hidden rounded-3xl border border-lime-300/35 bg-[linear-gradient(180deg,rgba(22,36,22,0.9),rgba(8,14,10,0.92))] p-7 sm:p-8">
              <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-lime-300/20 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-200">
                  INVESTIMENTO
                </p>
                <div className="mt-5 rounded-2xl border border-white/12 bg-black/25 p-5">
                  <p className="text-sm text-white/65 line-through">De R$697</p>
                  <p className="mt-1 text-5xl font-semibold leading-none text-white">
                    R$397
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    Confira as formas de pagamento disponíveis.
                  </p>
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-lime-200">
                  BÔNUS
                </p>
                <ul className="mt-3 space-y-3 text-sm text-white/80">
                  {commercialBonuses.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <BadgeCheck size={16} className="mt-0.5 text-lime-200" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://checkout.infinitepay.io/qt-sala01-stageone/1Grvikzzw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                >
                  QUERO CRIAR MEU COMERCIAL
                  <ArrowRight size={16} />
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/15 px-6 py-10 text-center sm:px-10">
              <Image
                src="/cc57c1955a57d404845f9c186dfcf554.jpg"
                alt="Garanta sua vaga"
                fill
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(8,12,18,0.72),rgba(20,38,18,0.66))]" />

              <div className="relative z-10">
                <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Garanta sua vaga
                </h2>
                <a
                  href="#oferta"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime-300 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                >
                  QUERO CRIAR MEU COMERCIAL
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {otherTrainings.length ? (
        <section className="border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                Outros treinamentos
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Veja outras páginas de vendas no layout padrão.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {otherTrainings.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.07}>
                  <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-6">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm text-white/70">{item.cardDescription}</p>
                    <Link
                      href={`/treinamentos/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                    >
                      Abrir página de vendas
                      <ArrowRight size={16} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function EnsaiosFotograficosSalesPage({
  treinamento,
  otherTrainings,
}: {
  treinamento: Treinamento;
  otherTrainings: Treinamento[];
}) {
  return (
    <main className="training-sales-page min-h-screen bg-[#03070d] text-white [&_h1]:uppercase [&_h2]:uppercase [&_h3]:uppercase">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(163,230,53,0.18),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(74,222,128,0.12),transparent_32%),linear-gradient(180deg,#03070d_0%,#040911_100%)]" />

      <section className="relative isolate overflow-hidden" id="hero">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hf_20260315_104627_712f5a54-af82-4b0b-b968-a96480fee90a.jpeg"
            alt={treinamento.title}
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.06)_0%,rgba(3,7,13,0.22)_42%,rgba(3,7,13,0.58)_72%,rgba(3,7,13,0.9)_100%)]" />
        </div>

        <div className="training-sales-hero-content mx-auto flex w-full max-w-6xl flex-col items-center justify-end text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              <BadgeCheck size={14} className="text-lime-300" />
              TREINAMENTO PRESENCIAL
            </span>
          </Reveal>

          <Reveal delay={0.08} className="mt-5 max-w-6xl">
            <h1 className="font-heading text-[2rem] font-semibold leading-[0.95] sm:text-5xl md:text-6xl">
              Crie Ensaios Fotográficos Profissionais Usando Inteligência
              Artificial.
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-6 max-w-3xl">
            <p className="text-base text-white/75 sm:text-lg">
              Produza imagens de campanha, redes sociais e catálogo sem estúdio
              e sem fotógrafo.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8">
            <a
              href="#oferta"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-300 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
            >
              QUERO CRIAR MEU ENSAIO
              <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                O PROBLEMA
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Produzir fotos profissionais sempre foi caro.
              </h2>
              <p className="mt-4 text-white/90">Normalmente exige:</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {ensaioProblemNeeds.map((item, index) => (
                  <Reveal key={item} delay={index * 0.05}>
                    <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                      <CircleX size={16} className="mr-2 inline-block text-red-300" />
                      {item}
                    </article>
                  </Reveal>
                ))}
              </div>

              <article className="mt-5 rounded-2xl border border-red-300/25 bg-[linear-gradient(180deg,rgba(52,15,15,0.46),rgba(15,8,10,0.64))] px-5 py-4 text-sm text-white/90 sm:text-base">
                <span className="mr-2 font-semibold text-red-300">Resultado:</span>
                Alto custo, baixa frequência de conteúdo e dificuldade para
                pequenas empresas.
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <figure className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/12 sm:min-h-[360px]">
                <Image
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_381ECYX3fWPZSY5qktp8hXNBCFW/hf_20260303_141105_40785915-0da4-401f-a8f1-ec208c09809c.jpeg"
                  alt="Imagem de referência para o desafio de produzir ensaios fotográficos"
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.08)_0%,rgba(3,7,13,0.42)_100%)]" />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              A NOVA REALIDADE
            </p>
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal>
              <article className="rounded-3xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-7 sm:p-8">
                <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Hoje a IA permite criar ensaios fotográficos completos usando
                  apenas prompts.
                </h2>
                <p className="mt-4 text-white/85">
                  Tudo usando IA e direção criativa.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mb-4 text-white/90">Você pode criar:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {ensaioRealityItems.map((item, index) => (
                  <Reveal key={item} delay={index * 0.05}>
                    <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                      <BadgeCheck size={16} className="mr-2 inline-block text-lime-300" />
                      {item}
                    </article>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              A transformação
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Antes e depois do treinamento.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal>
              <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-6">
                <h3 className="text-xl font-semibold text-white/90">Antes</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  <li>- Dificuldade de produzir fotos</li>
                  <li>- Conteúdo simples nas redes</li>
                  <li>- Baixa identidade visual</li>
                </ul>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="rounded-2xl border border-lime-300/30 bg-[rgba(20,40,22,0.55)] p-6">
                <h3 className="text-xl font-semibold text-lime-100">
                  Depois do treinamento
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/90">
                  <li>+ Ensaio profissional</li>
                  <li>+ Identidade visual forte</li>
                  <li>+ Imagens de campanha</li>
                  <li>+ Conteúdo premium para redes</li>
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              O que você vai criar
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Durante o treinamento você vai criar:
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ensaioCreateDuringEvent.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-5 text-sm text-white/85">
                  <span className="mr-2 text-lime-300">+</span>
                  {item}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              O que você vai aprender
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ensaioModules.map((module, index) => (
              <Reveal key={module} delay={0.05 * index}>
                <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-5">
                  <p className="text-sm font-medium text-white/90">{module}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              Para quem é
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Se você quer conteúdo visual profissional, esse treinamento é para
              você.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {ensaioAudience.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                  <span className="mr-2 text-lime-300">+</span>
                  {item}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              Resultado final
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              No final do treinamento você terá:
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {ensaioFinalResult.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <article className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/85">
                  <span className="mr-2 text-lime-300">+</span>
                  {item}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="oferta" className="border-t border-white/10 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-3xl border border-white/12 bg-[rgba(7,12,20,0.8)] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                Treinamento presencial
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Evento prático de 3 horas com vagas limitadas.
              </h2>
              <p className="mt-3 max-w-lg text-sm text-white/70 sm:text-base">
                Aprenda conceito, direção criativa e geração de imagens para
                sair com um ensaio completo pronto para publicação.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/12 bg-black/35 p-4 text-center">
                  <MapPin size={16} className="mx-auto text-lime-200" />
                  <p className="mt-2 text-sm text-white/80">Evento prático</p>
                </div>
                <div className="rounded-xl border border-white/12 bg-black/35 p-4 text-center">
                  <Clock3 size={16} className="mx-auto text-lime-200" />
                  <p className="mt-2 text-sm text-white/80">3 horas</p>
                </div>
                <div className="rounded-xl border border-white/12 bg-black/35 p-4 text-center">
                  <Users size={16} className="mx-auto text-lime-200" />
                  <p className="mt-2 text-sm text-white/80">Vagas limitadas</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="relative overflow-hidden rounded-3xl border border-lime-300/35 bg-[linear-gradient(180deg,rgba(22,36,22,0.9),rgba(8,14,10,0.92))] p-7 sm:p-8">
              <div className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-lime-300/20 blur-3xl" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-200">
                  INVESTIMENTO
                </p>
                <div className="mt-5 rounded-2xl border border-white/12 bg-black/25 p-5">
                  <p className="text-sm text-white/65 line-through">De R$597</p>
                  <p className="mt-1 text-5xl font-semibold leading-none text-white">
                    R$297
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    Confira as formas de pagamento disponíveis.
                  </p>
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-lime-200">
                  BÔNUS
                </p>
                <ul className="mt-3 space-y-3 text-sm text-white/80">
                  {ensaioBonuses.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <BadgeCheck size={16} className="mt-0.5 text-lime-200" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://checkout.infinitepay.io/qt-sala01-stageone/qZwaYdEZ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                >
                  QUERO CRIAR MEU ENSAIO
                  <ArrowRight size={16} />
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-5xl px-5">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/15 px-6 py-10 text-center sm:px-10">
              <Image
                src="/cc57c1955a57d404845f9c186dfcf554.jpg"
                alt="Garanta sua vaga"
                fill
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(8,12,18,0.72),rgba(20,38,18,0.66))]" />

              <div className="relative z-10">
                <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Garanta sua vaga
                </h2>
                <a
                  href="#oferta"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime-300 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                >
                  QUERO CRIAR MEU ENSAIO
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {otherTrainings.length ? (
        <section className="border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                Outros treinamentos
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Veja outras páginas de vendas no layout padrão.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {otherTrainings.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.07}>
                  <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-6">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm text-white/70">{item.cardDescription}</p>
                    <Link
                      href={`/treinamentos/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                    >
                      Abrir página de vendas
                      <ArrowRight size={16} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default async function TreinamentoSalesPage({ params }: PageProps) {
  const { slug } = await params;
  const treinamento = getTreinamentoBySlug(slug);

  if (!treinamento) {
    notFound();
  }

  const otherTrainings = TREINAMENTOS.filter((item) => item.slug !== treinamento.slug);

  if (treinamento.slug === "crie-paginas") {
    return <SitePaginasVendasSalesPage treinamento={treinamento} />;
  }

  if (treinamento.slug === "proprio-comercial") {
    return (
      <ProprioComercialSalesPage
        treinamento={treinamento}
        otherTrainings={otherTrainings}
      />
    );
  }

  if (treinamento.slug === "ensaios-fotograficos") {
    return (
      <EnsaiosFotograficosSalesPage
        treinamento={treinamento}
        otherTrainings={otherTrainings}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#03070d] text-white">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(163,230,53,0.18),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(74,222,128,0.12),transparent_32%),linear-gradient(180deg,#03070d_0%,#040911_100%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(2,6,12,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-end px-5 py-3.5">
          <a
            href="#oferta"
            className="inline-flex items-center gap-2 rounded-full border border-lime-300/35 bg-lime-400/15 px-4 py-2 text-sm font-semibold text-lime-100 transition-all duration-300 hover:border-lime-200/60 hover:bg-lime-300/22"
          >
            Quero participar
            <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <section className="relative isolate overflow-hidden" id="hero">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hf_20260314_214334_b0f80242-6be4-4125-9e9c-49e3f24ef1fe.jpeg"
            alt={treinamento.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(4,9,16,0.9)_12%,rgba(4,9,16,0.6)_42%,rgba(163,230,53,0.26)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(163,230,53,0.2),transparent_45%)]" />
        </div>

        <div className="mx-auto flex min-h-[calc(100svh-68px)] w-full max-w-6xl flex-col items-center justify-center px-5 py-16 text-center md:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              <BadgeCheck size={14} className="text-lime-300" />
              Treinamento Presencial
            </span>
          </Reveal>

          <Reveal delay={0.08} className="mt-5 max-w-4xl">
            <h1 className="font-heading text-4xl font-semibold leading-[1.02] sm:text-5xl md:text-6xl">
              {treinamento.title}
            </h1>
          </Reveal>

          <Reveal delay={0.16} className="mt-5 max-w-2xl">
            <p className="text-base text-white/75 sm:text-lg">
              {treinamento.heroDescription}
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-8 w-full max-w-3xl">
            <PromptTypewriter text={treinamento.promptText} />
          </Reveal>

          <Reveal
            delay={0.32}
            className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#oferta"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200 sm:w-auto"
            >
              Garantir minha vaga
              <ArrowRight size={16} />
            </a>
            <a
              href="#entregaveis"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white/90 transition-all duration-300 hover:border-white/45 hover:bg-white/14 sm:w-auto"
            >
              Ver entregáveis
            </a>
          </Reveal>
        </div>
      </section>

      <section id="entregaveis" className="border-t border-white/10 py-20">
        <div className="mx-auto w-full max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
              O que você leva pronto
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Entregáveis concretos no mesmo dia.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {treinamento.deliverables.map((item, index) => (
              <Reveal key={item} delay={index * 0.07}>
                <article className="h-full rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-6">
                  <BadgeCheck size={18} className="text-lime-300" />
                  <p className="mt-4 text-base leading-relaxed text-white/80">{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="oferta" className="border-t border-white/10 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-3xl border border-white/12 bg-[rgba(7,12,20,0.8)] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                Promessa da oferta
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                {treinamento.promiseTitle}
              </h2>
              <p className="mt-4 text-white/70">{treinamento.promiseDescription}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/12 bg-black/35 p-4">
                  <div className="flex items-center gap-2 text-lime-200">
                    <ShieldCheck size={16} />
                    <span className="text-sm font-semibold">Garantia de aplicação</span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Se não sair com os entregáveis estruturados, você recebe uma nova vaga sem custo.
                  </p>
                </div>
                <div className="rounded-xl border border-white/12 bg-black/35 p-4">
                  <div className="flex items-center gap-2 text-lime-200">
                    <Users size={16} />
                    <span className="text-sm font-semibold">Mentoria pós-evento</span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Grupo exclusivo para ajustes finais e dúvidas após o presencial.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="rounded-3xl border border-lime-300/35 bg-[linear-gradient(180deg,rgba(22,36,22,0.86),rgba(8,14,10,0.9))] p-7 sm:p-8">
              <p className="text-sm font-semibold text-lime-200">
                Investimento da imersão presencial
              </p>
              <p className="mt-2 text-4xl font-semibold text-white">
                R$ 1.497
                <span className="ml-2 text-base font-medium text-white/60">
                  à vista
                </span>
              </p>
              <p className="mt-2 text-sm text-white/70">ou 12x de R$ 149,70</p>

              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {treinamento.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck size={16} className="mt-0.5 text-lime-200" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:contato@growstudio.com?subject=${encodeURIComponent(`Inscrição - ${treinamento.title}`)}`}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
              >
                Quero garantir minha vaga
                <ArrowRight size={16} />
              </a>
            </aside>
          </Reveal>
        </div>
      </section>

      {otherTrainings.length ? (
        <section className="border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300/90">
                Próximos treinamentos
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Veja outros temas no mesmo layout de vendas.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {otherTrainings.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.07}>
                  <article className="rounded-2xl border border-white/12 bg-[rgba(8,14,22,0.72)] p-6">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm text-white/70">{item.cardDescription}</p>
                    <Link
                      href={`/treinamentos/${item.slug}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200"
                    >
                      Abrir página de vendas
                      <ArrowRight size={16} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
