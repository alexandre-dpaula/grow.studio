"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type ClaudeSkill = {
  id: string;
  title: string;
  content: string;
};

type ClaudeSkillsGridProps = {
  isLightTheme?: boolean;
};

const CLAUDE_SKILLS: ClaudeSkill[] = [
  {
    id: "copywriter-direto",
    title: "Copywriter Direto",
    content:
      "Atue como copywriter de resposta direta. Estruture: 1) promessa central, 2) dor e consequência, 3) mecanismo único, 4) prova, 5) oferta, 6) CTA. Entregue em português, frases curtas e linguagem clara.",
  },
  {
    id: "estrategista-ofertas",
    title: "Estrategista de Ofertas",
    content:
      "Analise o produto e crie 3 ofertas: entrada, principal e premium. Para cada uma: público, promessa, objeções, bônus, garantia e ângulo de preço. Finalize com recomendação de qual oferta lançar primeiro.",
  },
  {
    id: "roteirista-reels",
    title: "Roteirista de Reels",
    content:
      "Crie 5 roteiros curtos para Reels com estrutura: Hook (0-3s), desenvolvimento (3-20s), prova/exemplo (20-35s), CTA (35-45s). Linguagem natural, ritmo rápido e foco em retenção.",
  },
  {
    id: "auditor-landing",
    title: "Auditor de Landing Page",
    content:
      "Faça auditoria da landing page e dê nota de 0 a 10 para: headline, oferta, prova, clareza e CTA. Liste o que manter, o que remover e as 5 mudanças com maior impacto em conversão.",
  },
  {
    id: "mentor-vibe-coding",
    title: "Mentor de Vibe Coding",
    content:
      "Atue como mentor técnico. Sempre responda com: diagnóstico rápido, plano em etapas, código completo funcional e checklist de validação. Priorize simplicidade, legibilidade e implementação prática.",
  },
  {
    id: "pesquisa-avatar",
    title: "Pesquisa de Avatar",
    content:
      "Construa um avatar detalhado: contexto, desejos, dores, objeções, gatilhos e linguagem real. Entregue também 10 frases que esse avatar diria e 10 argumentos para converter esse perfil.",
  },
  {
    id: "planejador-conteudo",
    title: "Planejador de Conteúdo",
    content:
      "Monte um plano de conteúdo de 30 dias com pilares, formatos, objetivo por post e CTA. Inclua calendário semanal e uma rotina simples de produção para execução em lote.",
  },
  {
    id: "fechador-objeções",
    title: "Fechador de Objeções",
    content:
      "Receba objeções de compra e responda com: validação, reframe, prova e convite para ação. Gere 12 respostas prontas para WhatsApp, diretas e sem parecer script robótico.",
  },
];

export default function ClaudeSkillsGrid({
  isLightTheme = false,
}: ClaudeSkillsGridProps) {
  const [copiedSkillId, setCopiedSkillId] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedSkillId) {
      return;
    }
    const timer = window.setTimeout(() => setCopiedSkillId(null), 1600);
    return () => window.clearTimeout(timer);
  }, [copiedSkillId]);

  async function handleCopy(skill: ClaudeSkill) {
    try {
      await navigator.clipboard.writeText(skill.content);
      setCopiedSkillId(skill.id);
    } catch {
      setCopiedSkillId(null);
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {CLAUDE_SKILLS.map((skill) => {
        const isCopied = copiedSkillId === skill.id;

        return (
          <article
            key={skill.id}
            className={`rounded-2xl border p-5 ${
              isLightTheme
                ? "border-[#E0DDD8] bg-[#FFFFFF]"
                : "border-white/12 bg-[rgba(55,55,53,0.45)]"
            }`}
          >
            <p
              className={`text-[0.72rem] uppercase tracking-[0.12em] ${
                isLightTheme ? "text-[#1A1A18]" : "text-[#a9a59d]"
              }`}
            >
              Skill
            </p>
            <h3
              className={`mt-2 text-[1rem] font-semibold ${
                isLightTheme ? "text-[#1A1A18]" : "text-[#e3dfd7]"
              }`}
            >
              {skill.title}
            </h3>
            <p
              className={`mt-3 whitespace-pre-wrap text-[0.84rem] leading-relaxed ${
                isLightTheme ? "text-[#1A1A18]" : "text-[#b6b3ab]"
              }`}
            >
              {skill.content}
            </p>

            <button
              type="button"
              onClick={() => handleCopy(skill)}
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                isLightTheme
                  ? "border-[#CC5F4A] bg-[#CC5F4A] text-[#FFFFFF] hover:bg-[#A84B38] focus-visible:ring-[#CC5F4A]/60"
                  : "border-[#f47b4f]/55 bg-[#f47b4f] text-[#1f1f1d] hover:bg-[#f69069] focus-visible:ring-[#f47b4f]/60"
              }`}
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              {isCopied ? "Skill copiada" : "Copiar Skill"}
            </button>
          </article>
        );
      })}
    </div>
  );
}
