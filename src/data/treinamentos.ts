export type Treinamento = {
  slug: string;
  title: string;
  cardDescription: string;
  heroDescription: string;
  promptText: string;
  promiseTitle: string;
  promiseDescription: string;
  deliverables: string[];
};

export const TREINAMENTOS: Treinamento[] = [
  {
    slug: "crie-paginas",
    title: "Crie Projetos WEB em 5min",
    cardDescription:
      "Sai do treinamento com sua página no ar. Oferta estruturada, copy pronta e projeto publicado no mesmo dia.",
    heroDescription:
      "Treinamento presencial para você criar e publicar projetos web prontos para conversão no mesmo dia.",
    promptText:
      "Crie um projeto web para curso presencial com CTA e prova social",
    promiseTitle:
      "Você sai com seu projeto web pronto para captar e vender.",
    promiseDescription:
      "Execução presencial e assistida para transformar oferta em projeto web publicado, sem travar na parte técnica.",
    deliverables: [
      "Projeto web publicado com estrutura de venda",
      "Copy principal de headline, oferta e CTA",
      "Checklist de revisão para publicar no mesmo dia",
    ],
  },
  {
    slug: "proprio-comercial",
    title: "Crie seu Próprio Comercial",
    cardDescription:
      "Roteiro, gravação e edição no presencial. Você sai com o comercial finalizado e pronto para rodar.",
    heroDescription:
      "Treinamento presencial para você produzir um comercial com IA e direcionamento profissional.",
    promptText:
      "Escreva um roteiro de comercial de 30 segundos para oferta premium",
    promiseTitle:
      "Você sai com um comercial finalizado e pronto para rodar em campanha.",
    promiseDescription:
      "Do roteiro à versão final: você executa cada etapa no presencial com feedback para acelerar o resultado.",
    deliverables: [
      "Roteiro e estrutura narrativa validada",
      "Versão final do comercial pronta para publicar",
      "Variações de gancho para anúncios",
    ],
  },
  {
    slug: "ensaios-fotograficos",
    title: "Crie Ensaios Fotográficos",
    cardDescription:
      "Direção visual, estilo e geração com IA. Você sai com um ensaio completo pronto para feed, anúncio e proposta.",
    heroDescription:
      "Treinamento presencial para você criar ensaios fotográficos com consistência visual e padrão comercial.",
    promptText:
      "Gere um ensaio fotográfico editorial com 12 imagens para marca premium",
    promiseTitle:
      "Você sai com um ensaio fotográfico completo para vender e posicionar melhor sua marca.",
    promiseDescription:
      "Aprenda direção, estilo e refinamento visual para produzir ensaios que aumentam percepção de valor.",
    deliverables: [
      "Ensaio com identidade visual consistente",
      "Seleção de imagens para feed, anúncio e landing page",
      "Biblioteca de prompts para replicar campanhas",
    ],
  },
];

const TREINAMENTO_SLUG_ALIASES: Record<string, string> = {
  "site-paginas-vendas-5min": "crie-paginas",
};

export function getTreinamentoBySlug(slug: string) {
  const normalizedSlug = TREINAMENTO_SLUG_ALIASES[slug] ?? slug;
  return TREINAMENTOS.find((item) => item.slug === normalizedSlug);
}
