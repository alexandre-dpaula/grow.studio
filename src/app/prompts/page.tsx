"use client";

import { useState } from "react";
import { BadgeCheck, Sparkles, Copy } from "lucide-react";

type Prompt = {
  id: string;
  label: string;
  title: string;
  body: string;
};

type Block = {
  id: string;
  tab: string;
  tag: string;
  title: string;
  prompts: Prompt[];
};

const blocks: Block[] = [
  {
    id: "redes-sociais",
    tab: "Redes Sociais",
    tag: "Bloco A",
    title: "CONTEÚDO PARA REDES SOCIAIS",
    prompts: [
      {
        id: "a1",
        label: "A1",
        title: "LEGENDA DE POST (INSTAGRAM / FACEBOOK)",
        body: `Você é especialista em marketing para pequenos negócios.

MINHA EMPRESA: [nome e o que faz em 1 frase]
MEU PÚBLICO: [quem compra de mim — idade, perfil, o que valoriza]
TOM DE VOZ: [ex: descontraído e próximo / profissional e direto / bem-humorado]

OBJETIVO DESTE POST: [ex: anunciar promoção / gerar engajamento / apresentar produto]
CONTEXTO: [ex: semana do Dia das Mães / lançamento de novo serviço / oferta relâmpago]

Crie uma legenda de Instagram com:
- Gancho forte na primeira linha (sem "Olá" ou "Ei")
- Máximo [100 / 150 / 200] palavras
- CTA no final: [ex: "Comenta aqui" / "Link na bio" / "Chama no WhatsApp"]
- Não use a palavra "incrível" nem emojis em excesso`,
      },
      {
        id: "a2",
        label: "A2",
        title: "PLANO DE CONTEÚDO SEMANAL",
        body: `Você conhece meu negócio:
[Cole aqui seu Kit de Contexto completo]

Esta semana quero destacar: [produto / serviço / data comemorativa / promoção]

Crie um plano de 7 posts para Instagram com:
- Tema de cada post
- Gancho de abertura (primeira frase)
- Tipo de formato sugerido: carrossel, reels, imagem única ou stories
- Objetivo de cada post: engajamento, venda ou awareness

Organize em ordem de dia da semana.`,
      },
      {
        id: "a3",
        label: "A3",
        title: "ADAPTAÇÃO PARA STORIES",
        body: `Tenho essa legenda de post:
[Cole a legenda aqui]

Adapte para 3 versões de story:
- Cada story tem no máximo 3 frases curtas
- Tom mais direto e urgente do que o post original
- A última frase de cada story deve ser uma ação clara`,
      },
      {
        id: "a4",
        label: "A4",
        title: "ROTEIRO DE REELS (30 SEGUNDOS)",
        body: `Você é roteirista de conteúdo para redes sociais de pequenos negócios.

NEGÓCIO: [descreva]
TEMA DO REEL: [o que vai mostrar ou explicar]
OBJETIVO: [vender / educar / engajar / mostrar bastidores]
TOM: [descontraído / informativo / empolgante]

Crie um roteiro de Reels de 30 segundos com:
- Gancho nos primeiros 3 segundos (o que vai fazer a pessoa parar de rolar)
- Desenvolvimento em 3 blocos de 5–8 segundos
- CTA nos últimos 5 segundos
- Indicação de texto para colocar na tela (legenda visual)`,
      },
      {
        id: "a5",
        label: "A5",
        title: "CARROSSEL (SEQUÊNCIA DE SLIDES)",
        body: `Você é especialista em conteúdo educativo para Instagram.

NEGÓCIO: [descreva]
TEMA DO CARROSSEL: [o que vai ensinar ou mostrar]
PÚBLICO: [quem vai ler]

Crie um carrossel de [5 / 7 / 10] slides com:
- Slide 1: título gancho que faça a pessoa querer deslizar
- Slides 2 a [N-1]: um ponto por slide, com título curto e explicação em 2 linhas
- Último slide: CTA claro com o que a pessoa deve fazer agora
- Linguagem: simples, sem jargão técnico`,
      },
      {
        id: "a6",
        label: "A6",
        title: "RESPOSTA PARA COMENTÁRIO DIFÍCIL",
        body: `Você é especialista em relacionamento com clientes para pequenos negócios.

MEU NEGÓCIO: [descreva]
MEU TOM DE VOZ: [ex: próximo e empático / profissional e direto]

O comentário que recebi foi:
"[Cole o comentário aqui]"

Crie 3 opções de resposta que:
- Não sejam defensivas nem agressivas
- Reconheçam o sentimento do cliente
- Ofereçam uma solução ou próximo passo
- Tenham no máximo 3 linhas cada
- Soem humanas, não robóticas`,
      },
      {
        id: "a7",
        label: "A7",
        title: "COPY PARA PROMOÇÃO / OFERTA",
        body: `Você é copywriter especializado em pequenos negócios.

PRODUTO/SERVIÇO: [descreva]
OFERTA: [qual é o desconto / bônus / condição especial]
VALIDADE: [até quando]
PÚBLICO: [quem é o cliente ideal]
TOM: [urgente / caloroso / direto]

Crie um texto de oferta para [Instagram / WhatsApp / E-mail] com:
- Abertura que cria desejo ou urgência
- Benefício principal em destaque
- Condições da oferta claras
- CTA direto no final
- Máximo [120 / 200] palavras`,
      },
    ],
  },
  {
    id: "vendas",
    tab: "Vendas",
    tag: "Bloco B",
    title: "ATENDIMENTO E VENDAS",
    prompts: [
      {
        id: "b1",
        label: "B1",
        title: "BANCO DE RESPOSTAS PARA WHATSAPP",
        body: `Você é especialista em atendimento para pequenos negócios.

MEU NEGÓCIO: [descreva]
MEU TOM DE VOZ: [ex: próximo e descontraído / profissional]

Crie respostas prontas para as 10 situações mais comuns:
1. "Qual o preço?"
2. "Tem desconto?"
3. "Quando fica pronto?"
4. "Posso parcelar?"
5. "Vocês entregam?"
6. "Posso ver antes de comprar?"
7. "Ainda tem disponível?"
8. "Preciso para amanhã, conseguem?"
9. Cliente sumiu após orçamento — follow-up
10. Reclamação de atraso ou problema

Cada resposta: máximo 3 linhas, tom [especifique], com abertura personalizada.`,
      },
      {
        id: "b2",
        label: "B2",
        title: "ROTEIRO DE ABORDAGEM DE VENDA",
        body: `Você é especialista em vendas consultivas para pequenos negócios.

MEU NEGÓCIO: [descreva]
MEU PRODUTO/SERVIÇO: [descreva]
MEU CLIENTE TÍPICO: [perfil e dores principais]

Crie um roteiro de abordagem de venda com:
1. Como abrir a conversa sem parecer vendedor
2. Perguntas para entender a necessidade do cliente
3. Como apresentar o produto/serviço conectado à dor dele
4. Como apresentar o preço com confiança
5. Como responder as 3 objeções mais comuns: [liste as que você ouve]
6. Como fechar ou marcar próximo passo

Linguagem: natural, sem script engessado.`,
      },
      {
        id: "b3",
        label: "B3",
        title: "FOLLOW-UP PARA CLIENTE SUMIDO",
        body: `Você é especialista em follow-up de vendas.

CONTEXTO: Enviei um orçamento/proposta há [X dias] e o cliente não respondeu.
MEU NEGÓCIO: [descreva]
PRODUTO/SERVIÇO OFERTADO: [descreva]
TOM DO RELACIONAMENTO: [ex: formal / descontraído]

Crie 3 mensagens de follow-up diferentes:
- Versão 1: gentil e curiosa (primeiro contato pós-silêncio)
- Versão 2: agrega valor com uma informação nova
- Versão 3: cria leve urgência sem pressionar

Cada mensagem: máximo 4 linhas, sem ser invasivo.`,
      },
      {
        id: "b4",
        label: "B4",
        title: "PROPOSTA COMERCIAL SIMPLIFICADA",
        body: `Você é especialista em propostas comerciais para pequenos negócios.

CLIENTE: [perfil / empresa]
NECESSIDADE DELES: [o que precisam]
MINHA SOLUÇÃO: [o que vou oferecer]
PREÇO: [valor e condições]
PRAZO DE ENTREGA: [quando fica pronto]
DIFERENCIAIS: [por que eu e não outro]

Crie uma proposta comercial clara e persuasiva com:
- Entendimento do problema deles
- Solução que estou propondo
- Entregáveis e prazo
- Investimento e condições
- Próximo passo
Máximo 1 página. Tom: [profissional / consultivo / direto].`,
      },
    ],
  },
  {
    id: "estrategia",
    tab: "Estratégia",
    tag: "Bloco C",
    title: "ESTRATÉGIA E PLANEJAMENTO",
    prompts: [
      {
        id: "c1",
        label: "C1",
        title: "DIAGNÓSTICO DO MEU NEGÓCIO",
        body: `Você é consultor de marketing estratégico para pequenos negócios.

Vou descrever minha situação atual:
NEGÓCIO: [descreva]
SITUAÇÃO ATUAL: [principais desafios, o que está funcionando e o que não está]
OBJETIVO DOS PRÓXIMOS 90 DIAS: [o que quero alcançar]
ORÇAMENTO DISPONÍVEL PARA MARKETING: [estimativa]

Me dê:
1. Diagnóstico dos 3 principais pontos de melhoria
2. Oportunidade que mais estou deixando passar
3. Plano de ação com 5 passos práticos para os próximos 30 dias
4. O que NÃO fazer agora (evitar desperdício de energia)`,
      },
      {
        id: "c2",
        label: "C2",
        title: "CALENDÁRIO DE CONTEÚDO (30 DIAS)",
        body: `Você é especialista em planejamento de conteúdo para redes sociais.

[Cole seu Kit de Contexto aqui]

Crie um calendário de conteúdo para 30 dias com:
- 4 posts por semana
- Mix de formatos: [ex: 2 educativos, 1 venda, 1 bastidores]
- Datas comemorativas do meu setor em [mês/ano]
- Tema de cada semana
- Sugestão de formato (reels / carrossel / feed / story)

Organize em tabela: Data | Tema | Formato | Objetivo.`,
      },
      {
        id: "c3",
        label: "C3",
        title: "SIMULAÇÃO DE CENÁRIO",
        body: `Você é consultor estratégico de negócios.

Minha situação: [descreva o negócio e momento atual]

Quero simular o seguinte cenário:
[Ex: subir 20% o preço / lançar novo serviço / abrir segundo ponto / parar de atender pessoa física]

Me dê:
1. Prós e contras objetivos dessa decisão
2. Riscos que posso não estar enxergando
3. Como anunciar essa mudança para clientes atuais
4. Indicadores para saber se foi a decisão certa após 60 dias`,
      },
      {
        id: "c4",
        label: "C4",
        title: "FAQ DO MEU NEGÓCIO",
        body: `Você é especialista em comunicação para pequenos negócios.

MEU NEGÓCIO: [descreva]
MEU PÚBLICO: [perfil dos clientes]
PRINCIPAIS PRODUTOS/SERVIÇOS: [liste]

Crie um FAQ com as 15 perguntas mais prováveis que meus clientes fazem,
organizadas por categoria:
- Sobre o produto/serviço
- Sobre preço e pagamento
- Sobre prazo e entrega
- Sobre garantia e suporte

Para cada pergunta: a resposta ideal no meu tom de voz: [defina].`,
      },
    ],
  },
  {
    id: "gestao",
    tab: "Gestão",
    tag: "Bloco D",
    title: "GESTÃO E OPERAÇÃO",
    prompts: [
      {
        id: "d1",
        label: "D1",
        title: "ROTEIRO DE REUNIÃO COM CLIENTE",
        body: `Você é especialista em condução de reuniões de venda e diagnóstico.

MEU NEGÓCIO: [descreva]
TIPO DE REUNIÃO: [primeira reunião / apresentação de proposta / reunião de alinhamento]
PERFIL DO CLIENTE: [o que você sabe sobre ele]
OBJETIVO DA REUNIÃO: [fechar venda / entender necessidade / apresentar resultado]

Crie um roteiro de reunião com:
1. Como abrir (quebra-gelo e agenda)
2. Perguntas de diagnóstico (para entender a situação deles)
3. Como apresentar minha solução
4. Como lidar com a pergunta "quanto custa?"
5. Como encerrar com próximo passo claro

Duração prevista: [30 / 45 / 60] minutos.`,
      },
      {
        id: "d2",
        label: "D2",
        title: "E-MAIL PROFISSIONAL",
        body: `Você é especialista em comunicação profissional.

CONTEXTO DO E-MAIL: [ex: envio de proposta / follow-up / confirmação de reunião / cobrança amigável]
DESTINATÁRIO: [quem vai receber — cargo / perfil]
RELACIONAMENTO ATUAL: [ex: primeiro contato / já somos parceiros / cliente antigo]
TOM: [formal / profissional mas próximo / direto]

Crie o e-mail com:
- Assunto que convida à abertura
- Abertura sem "Espero que esteja bem"
- Corpo direto e claro
- Encerramento com próximo passo
Máximo [200 / 300] palavras.`,
      },
      {
        id: "d3",
        label: "D3",
        title: "ANÁLISE SEMANAL DO NEGÓCIO",
        body: `Você é analista de negócios para pequenos empreendedores.

NEGÓCIO: [descreva]
PERÍODO: [semana / mês de referência]
O QUE ACONTECEU: [descreva os principais eventos — vendas, problemas, conquistas]
NÚMEROS (se tiver): [ex: faturamento, novos clientes, posts com melhor resultado]

Me dê:
1. Análise objetiva do que funcionou e do que não funcionou
2. Padrão que você identificou que eu posso não estar enxergando
3. 3 ações práticas para a próxima semana
4. Uma pergunta estratégica que eu deveria estar me fazendo`,
      },
    ],
  },
];

const quickTechniques = [
  {
    id: "refinamento",
    label: "Refinamento",
    title: "QUANDO O RESULTADO FICOU QUASE BOM",
    items: [
      `"Gostei da estrutura, mas o tom ficou muito [formal/genérico/distante]. Reescreva com [mais emoção / mais urgência / mais proximidade]."`,
      `"A primeira parte ficou ótima. A última frase não me convenceu — substitua por algo que gere mais [curiosidade / urgência / desejo]."`,
      `"Ficou longo. Corte pela metade sem perder o essencial. Mantenha o CTA no final."`,
      `"Esse texto soa genérico. Adicione uma referência específica ao meu [produto / cidade / público] para personalizar."`,
      `"Crie mais 3 versões com tons diferentes: uma mais emocional, uma mais racional e uma mais bem-humorada."`,
    ],
  },
  {
    id: "persona",
    label: "Persona",
    title: "QUANDO QUISER UMA PERSPECTIVA ESPECIALIZADA",
    items: [
      `"Você é um [especialista em marketing / consultor de vendas / copywriter sênior / especialista no setor de _____] com 15 anos de experiência trabalhando com pequenos negócios no Brasil. Com base nesse contexto, me ajude com: [seu pedido]"`,
    ],
  },
  {
    id: "cadeia",
    label: "Cadeia",
    title: "QUANDO QUISER PRODUZIR MUITO DE UMA VEZ",
    items: [
      `PASSO 1 — "Vou te contar sobre minha empresa. [Descreva]. Confirme que entendeu e me faça 3 perguntas para me conhecer melhor."`,
      `PASSO 2 — "Ótimo. Agora crie [plano de posts / estratégia / roteiro] com base no que conversamos."`,
      `PASSO 3 — "Perfeito. Pegue o item [X] e desenvolva completamente."`,
      `PASSO 4 — "Adapte esse conteúdo para [story / e-mail / WhatsApp / Reels]."`,
    ],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium transition-colors"
      style={{ color: copied ? "#86efac" : "#f7d1be" }}
    >
      <Copy size={12} />
      {copied ? "Copiado!" : "Copiar prompt"}
    </button>
  );
}

const TAB_IDS = blocks.map((b) => b.id);

export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState(TAB_IDS[0]);
  const [showTecnicas, setShowTecnicas] = useState(false);

  const activeBlock = blocks.find((b) => b.id === activeTab)!;

  return (
    <main className="min-h-screen bg-[#1f1f1d] text-[#e6e2d9]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,rgba(244,123,79,0.16),transparent_38%),radial-gradient(circle_at_88%_0%,rgba(241,237,228,0.13),transparent_30%),linear-gradient(180deg,#1f1f1d_0%,#181816_100%)]" />

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1140px] px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_120px_-75px_rgba(0,0,0,0.95)] sm:p-8 lg:p-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#f47b4f]/45 bg-[#f47b4f]/16 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ffd8c7]">
            <BadgeCheck size={14} />
            Grow+Studio · v1.0 · 2025
          </span>

          <h1 className="mt-5 font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[0.95] text-[#f3efe7] uppercase">
            Pack de Prompts Avançado
          </h1>
          <p className="mt-2 text-[1rem] font-bold uppercase tracking-wide text-[#f4c7a9]">
            IA para Empreendedores — Nível 1
          </p>

          <p className="mt-4 max-w-2xl text-[0.95rem] text-[#b8b4ac] sm:text-[1.02rem]">
            Templates prontos para usar no ChatGPT ou qualquer outra IA.
            Substitua o que está entre colchetes pelo seu contexto real e cole.
          </p>

          {/* How to use */}
          <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.13em] text-[#9f9b94]">
              <Sparkles size={13} />
              Como usar este material
            </div>
            <ol className="mt-4 space-y-2">
              {[
                "Abra o ChatGPT (ou qualquer IA que você usa)",
                "Escolha o template da situação que você precisa",
                "Substitua tudo que está entre [ colchetes ] pelo seu contexto real",
                "Cole e envie — refine se necessário",
                "Guarde os prompts que funcionaram bem para reusar",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.87rem] text-[#c2beb7]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#f47b4f]/40 bg-[#f47b4f]/12 text-[0.65rem] font-bold text-[#ffd8c7]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-[#1f1f1d]/90 backdrop-blur-md border-b border-white/8">
        <div className="mx-auto w-full max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => { setActiveTab(block.id); setShowTecnicas(false); }}
                className={`shrink-0 rounded-xl px-4 py-2 text-[0.8rem] font-bold uppercase tracking-wide transition-all ${
                  activeTab === block.id && !showTecnicas
                    ? "bg-[#f47b4f] text-[#1f1f1d]"
                    : "border border-white/10 bg-white/[0.03] text-[#a9a59d] hover:border-white/20 hover:text-[#e6e2d9]"
                }`}
              >
                {block.tab}
              </button>
            ))}
            <button
              onClick={() => { setShowTecnicas(true); setActiveTab(""); }}
              className={`shrink-0 rounded-xl px-4 py-2 text-[0.8rem] font-bold uppercase tracking-wide transition-all ${
                showTecnicas
                  ? "bg-[#f47b4f] text-[#1f1f1d]"
                  : "border border-white/10 bg-white/[0.03] text-[#a9a59d] hover:border-white/20 hover:text-[#e6e2d9]"
              }`}
            >
              Técnicas
            </button>
          </div>
        </div>
      </div>

      {/* Prompt Cards */}
      {!showTecnicas && (
        <section className="mx-auto w-full max-w-[1140px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-6">
            <p className="text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[#9f9b94]">
              {activeBlock.tag}
            </p>
            <h2 className="mt-2 font-serif text-[clamp(1.5rem,2.2vw,2rem)] font-bold uppercase text-[#ebe7df]">
              {activeBlock.title}
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {activeBlock.prompts.map((prompt) => (
              <article
                key={prompt.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
              >
                <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3.5">
                  <span className="rounded-md border border-[#f47b4f]/35 bg-[#f47b4f]/12 px-2 py-0.5 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-[#ffd8c7]">
                    {prompt.label}
                  </span>
                  <h3 className="text-[0.88rem] font-bold uppercase tracking-wide text-[#e4e0d8]">
                    {prompt.title}
                  </h3>
                </div>

                <pre className="flex-1 overflow-x-auto whitespace-pre-wrap break-words px-5 py-4 font-mono text-[0.78rem] leading-relaxed text-[#a9a59d]">
                  {prompt.body}
                </pre>

                <div className="border-t border-white/8 px-5 py-3">
                  <CopyButton text={prompt.body} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Quick Techniques */}
      {showTecnicas && (
        <section className="mx-auto w-full max-w-[1140px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-6">
            <p className="text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[#9f9b94]">
              Técnicas Rápidas
            </p>
            <h2 className="mt-2 font-serif text-[clamp(1.5rem,2.2vw,2rem)] font-bold uppercase text-[#ebe7df]">
              PARA USAR EM QUALQUER PROMPT
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {quickTechniques.map((tech) => (
              <article
                key={tech.id}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
              >
                <span className="inline-block rounded-md border border-[#f47b4f]/35 bg-[#f47b4f]/12 px-2 py-0.5 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-[#ffd8c7]">
                  {tech.label}
                </span>
                <h3 className="mt-3 text-[0.88rem] font-bold uppercase tracking-wide text-[#e4e0d8]">
                  {tech.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {tech.items.map((item, i) => (
                    <li
                      key={i}
                      className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 font-mono text-[0.75rem] leading-relaxed text-[#a9a59d]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
