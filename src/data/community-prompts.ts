export type CommunityPrompt = {
  id: string;
  title: string;
  description: string;
  prompt: string;
};

export const COMMUNITY_PROMPTS: CommunityPrompt[] = [
  {
    id: "imagem-cinematica-anuncio",
    title: "Trailer de Oferta Cinemático",
    description:
      "Gera prompts visuais com estética de filme para anúncios de alto impacto.",
    prompt:
      "Atue como diretor de arte. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 4 prompts cinematográficos para Midjourney, Leonardo e DALL-E com: cena principal, enquadramento, lente, iluminação, paleta, emoção e CTA visual curto.",
  },
  {
    id: "imagem-produto-premium",
    title: "Produto Premium em Cena",
    description:
      "Cria imagens de produto com aparência comercial e alta percepção de valor.",
    prompt:
      "Você é fotógrafo publicitário. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 3 prompts de imagem para anúncio com fundo, composição, textura, luz, estilo visual e versão para feed, story e capa.",
  },
  {
    id: "imagem-lifestyle-publico",
    title: "Lifestyle que Conecta",
    description:
      "Gera imagens com pessoas reais usando a oferta no contexto ideal.",
    prompt:
      "Atue como especialista em campanhas lifestyle. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 5 prompts de imagem mostrando uso real do produto por [público], incluindo cenário, ação, emoção, roupa e ambiente.",
  },
  {
    id: "reels-gancho-3s",
    title: "Gancho Reels 3s",
    description:
      "Cria roteiro curto com abertura forte para segurar atenção imediata.",
    prompt:
      "Você é roteirista de Reels. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva 5 roteiros de 30 a 45 segundos com: gancho de 3 segundos, história em 3 blocos, quebra de objeção e CTA final para ação.",
  },
  {
    id: "reels-storytelling-transformacao",
    title: "Story de Transformação",
    description:
      "Monta roteiro com antes e depois para gerar desejo e prova de resultado.",
    prompt:
      "Atue como copywriter de storytelling. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie um roteiro de Reels no formato antes-durante-depois, com narrativa simples, emoção e chamada para contato.",
  },
  {
    id: "reels-prova-social",
    title: "Reels com Prova Social",
    description:
      "Gera roteiro com depoimento e estrutura de credibilidade para conversão.",
    prompt:
      "Você é estrategista de conteúdo. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 3 roteiros de Reels com depoimento, dados de resultado, mini história do cliente e CTA para mensagem no WhatsApp.",
  },
  {
    id: "copy-hero-section",
    title: "Hero Section Magnética",
    description:
      "Cria headline, subtítulo e CTA para o topo da página com foco em conversão.",
    prompt:
      "Atue como copywriter de landing page. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 7 variações de Hero Section com headline forte, subtítulo orientado a benefício, CTA e promessa clara.",
  },
  {
    id: "copy-pagina-vendas-completa",
    title: "Página de Vendas Completa",
    description:
      "Monta toda a estrutura de copy para uma página pronta para vender.",
    prompt:
      "Você é especialista em páginas de vendas. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva a copy completa: hero, dores, solução, benefícios, provas, ofertas, bônus, garantia, FAQ e CTA final.",
  },
  {
    id: "copy-faq-inteligente",
    title: "FAQ Inteligente de Conversão",
    description:
      "Cria perguntas e respostas que quebram objeções de compra com clareza.",
    prompt:
      "Atue como especialista em objeções. Contexto: [produto], [nicho], [tema], [cidade], [público]. Monte um FAQ com 15 perguntas reais de clientes e respostas simples, diretas e orientadas a fechamento.",
  },
  {
    id: "oferta-irresistivel-7-blocos",
    title: "Oferta Irresistível 7 Blocos",
    description:
      "Estrutura uma oferta premium com proposta de valor clara e acionável.",
    prompt:
      "Você é estrategista de oferta. Contexto: [produto], [nicho], [tema], [cidade], [público]. Estruture uma oferta em 7 blocos: promessa, mecanismo, entrega, bônus, garantia, urgência e CTA.",
  },
  {
    id: "oferta-bonus-garantia",
    title: "Bônus + Garantia que Vendem",
    description:
      "Cria bônus e garantias com lógica de valor sem parecer exagerado.",
    prompt:
      "Atue como consultor de conversão. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 10 ideias de bônus e 5 opções de garantia para aumentar valor percebido e reduzir risco de compra.",
  },
  {
    id: "meta-ads-5-angulos",
    title: "Meta Ads 5 Ângulos",
    description:
      "Gera variações de anúncio para testar criatividade e mensagem.",
    prompt:
      "Você é gestor de tráfego. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 5 anúncios para Meta Ads com ângulos: dor, desejo, autoridade, prova e urgência. Entregue headline, texto principal e CTA.",
  },
  {
    id: "meta-ads-criativos-copys",
    title: "Criativos + Copys de Campanha",
    description:
      "Monta pacote de criativos com copys alinhadas ao mesmo objetivo.",
    prompt:
      "Atue como estrategista de campanha. Contexto: [produto], [nicho], [tema], [cidade], [público]. Monte 6 ideias de criativos e 6 copys correspondentes para tráfego frio, morno e quente.",
  },
  {
    id: "meta-ads-remarketing-fechamento",
    title: "Remarketing que Fecha",
    description:
      "Cria anúncios para recuperar leads indecisos e aumentar fechamento.",
    prompt:
      "Você é especialista em remarketing. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva 8 anúncios de retomada para quem clicou e não comprou, com prova, objeção e CTA de retorno.",
  },
  {
    id: "whatsapp-funil-7-mensagens",
    title: "Funil WhatsApp 7 Mensagens",
    description:
      "Entrega um fluxo completo para nutrir, qualificar e fechar no WhatsApp.",
    prompt:
      "Atue como closer por WhatsApp. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie funil com 7 mensagens: boas-vindas, contexto, dor, valor, prova, oferta e fechamento.",
  },
  {
    id: "whatsapp-qualificacao-sdr",
    title: "SDR WhatsApp Inteligente",
    description:
      "Cria roteiro de qualificação para separar curiosos de compradores.",
    prompt:
      "Você é SDR de alta performance. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere script de qualificação com perguntas objetivas, critérios de lead quente e resposta pronta para cada cenário.",
  },
  {
    id: "vibe-coding-landing-page",
    title: "Landing Page em 1 Prompt",
    description:
      "Gera estrutura de página com código inicial para publicar rápido.",
    prompt:
      "Atue como desenvolvedor de Vibe Coding. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere uma landing page completa em HTML, CSS e JS com Hero, benefícios, prova, FAQ e CTA.",
  },
  {
    id: "vibe-coding-ideia-projeto",
    title: "Ideia para Projeto Web",
    description:
      "Transforma uma ideia em estrutura pronta de projeto com etapas claras.",
    prompt:
      "Você é arquiteto de produto digital. Contexto: [produto], [nicho], [tema], [cidade], [público]. Transforme a ideia em projeto web com mapa de páginas, funcionalidades, prioridade MVP e plano de execução em 7 dias.",
  },
  {
    id: "vibe-coding-pagina-captura",
    title: "Página de Captura + Automação",
    description:
      "Cria página com formulário e lógica para envio de leads.",
    prompt:
      "Atue como especialista em automação web. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere código de página de captura com formulário, validação, mensagem de sucesso e integração simulada com webhook.",
  },
  {
    id: "higgsfield-animacao-cinematica",
    title: "Higgsfield Motion Pro",
    description:
      "Converte imagem estática em animação com movimento cinematográfico.",
    prompt:
      "Você é especialista em Higgsfield. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 3 prompts de animação de imagem (8s) com movimento de câmera, parallax, luz dramática e final com CTA visual.",
  },
  {
    id: "trend-viral-01",
    title: "POV Viral de Dor",
    description:
      "Cria roteiros POV curtos com dor real e virada rápida para gerar retenção.",
    prompt:
      "Atue como roteirista de trends. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 5 roteiros no formato POV com dor inicial, virada em 3 segundos, solução prática e CTA para comentário.",
  },
  {
    id: "trend-viral-02",
    title: "Hook Polêmico 5s",
    description:
      "Gera ganchos de abertura com opinião forte para aumentar watch time.",
    prompt:
      "Você é estrategista de conteúdo viral. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 12 hooks polêmicos de 5 segundos para Reels e TikTok sem linguagem ofensiva, com CTA de continuidade.",
  },
  {
    id: "trend-viral-03",
    title: "Top 3 que Viraliza",
    description:
      "Monta conteúdo rápido de lista com estrutura pronta para vídeo curto.",
    prompt:
      "Atue como social media de performance. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 8 roteiros no formato Top 3 com frase de abertura, item 1, item 2, item 3 e CTA.",
  },
  {
    id: "trend-viral-04",
    title: "Dueto de Reação",
    description:
      "Cria roteiro para reagir a vídeos virais conectando com sua oferta.",
    prompt:
      "Você é creator de reação. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 6 roteiros para dueto/reação com frase de choque, análise simples, conexão com [produto] e CTA para seguir.",
  },
  {
    id: "trend-viral-05",
    title: "Meme de Nicho Pronto",
    description:
      "Transforma meme popular em conteúdo de marketing aplicável ao seu público.",
    prompt:
      "Atue como copywriter de memes. Contexto: [produto], [nicho], [tema], [cidade], [público]. Adapte 10 formatos de meme viral para o nicho, com legenda pronta e CTA de engajamento.",
  },
  {
    id: "trend-viral-06",
    title: "Antes vs Depois Turbo",
    description:
      "Cria roteiro visual de transformação para aumentar prova e desejo.",
    prompt:
      "Você é especialista em vídeos de transformação. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 5 roteiros antes e depois com cena inicial, contraste forte, benefício final e CTA direto.",
  },
  {
    id: "trend-viral-07",
    title: "Storytime que Converte",
    description:
      "Gera mini histórias curtas com aprendizado e chamada para ação.",
    prompt:
      "Atue como storyteller de redes sociais. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva 7 storytimes de até 45 segundos com problema real, virada e CTA para DM.",
  },
  {
    id: "trend-viral-08",
    title: "Pergunta na Tela",
    description:
      "Cria vídeos com pergunta forte para estimular comentários rápidos.",
    prompt:
      "Você é estrategista de engajamento. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 20 perguntas virais para abrir vídeo, com roteiro curto de resposta e CTA para interação.",
  },
  {
    id: "trend-viral-09",
    title: "Confissão de Especialista",
    description:
      "Monta roteiro com bastidor real e autoridade sem parecer arrogante.",
    prompt:
      "Atue como mentor de conteúdo. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 6 roteiros de confissão profissional com erro, aprendizado, aplicação prática e CTA.",
  },
  {
    id: "trend-viral-10",
    title: "Desafio Viral 7 Dias",
    description:
      "Estrutura um desafio de conteúdo com tema diário para crescer perfil.",
    prompt:
      "Você é estrategista de comunidade. Contexto: [produto], [nicho], [tema], [cidade], [público]. Monte um desafio de 7 dias com tema diário, gancho do dia, tarefa e CTA para participação.",
  },
  {
    id: "trend-viral-11",
    title: "Erro Comum do Nicho",
    description:
      "Gera conteúdo educativo rápido focado em correção de erros frequentes.",
    prompt:
      "Atue como professor prático. Contexto: [produto], [nicho], [tema], [cidade], [público]. Liste 15 erros comuns do nicho e transforme cada um em micro roteiro de vídeo com solução simples.",
  },
  {
    id: "trend-viral-12",
    title: "Mito ou Verdade",
    description:
      "Cria sequência de conteúdos no formato mito e verdade para gerar debate.",
    prompt:
      "Você é creator educacional. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 12 vídeos curtos no formato mito ou verdade com explicação clara e CTA para salvar.",
  },
  {
    id: "trend-viral-13",
    title: "Teste ao Vivo",
    description:
      "Gera roteiro de teste prático em vídeo para aumentar credibilidade.",
    prompt:
      "Atue como apresentador de testes. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva 5 roteiros de teste ao vivo com hipótese, execução, resultado e CTA.",
  },
  {
    id: "trend-viral-14",
    title: "Opinião Impopular",
    description:
      "Monta vídeos com tese forte para gerar conversa e alcance orgânico.",
    prompt:
      "Você é estrategista de posicionamento. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 10 opiniões impopulares seguras para conteúdo, com argumento curto e CTA para debate.",
  },
  {
    id: "trend-viral-15",
    title: "Tutorial Ultra Rápido",
    description:
      "Cria scripts de tutorial de 30 segundos com execução simples.",
    prompt:
      "Atue como especialista em tutoriais curtos. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 10 tutoriais de 30 segundos com passo 1, passo 2, passo 3 e CTA.",
  },
  {
    id: "trend-viral-16",
    title: "3 Sinais de Compra",
    description:
      "Transforma sinais de comportamento em conteúdo escaneável e viral.",
    prompt:
      "Você é analista de comportamento. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 8 roteiros no formato 3 sinais de que [público] precisa de [produto], com CTA.",
  },
  {
    id: "trend-viral-17",
    title: "Checklist de Tendência",
    description:
      "Gera checklists rápidos para posts de alto compartilhamento.",
    prompt:
      "Atue como creator de utilidade. Contexto: [produto], [nicho], [tema], [cidade], [público]. Monte 10 checklists curtos em formato viral com título forte e CTA para salvar.",
  },
  {
    id: "trend-viral-18",
    title: "Comparativo A vs B",
    description:
      "Cria conteúdo de comparação simples para decisão rápida de compra.",
    prompt:
      "Você é consultor comparativo. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 7 roteiros A vs B com prós, contras, melhor escolha e CTA final.",
  },
  {
    id: "trend-viral-19",
    title: "Resposta de Comentário",
    description:
      "Transforma comentários em roteiros prontos para novos vídeos.",
    prompt:
      "Atue como estrategista de comunidade. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 15 respostas em vídeo para comentários comuns com tom didático e CTA.",
  },
  {
    id: "trend-viral-20",
    title: "Bastidores Reais",
    description:
      "Gera roteiro de bastidor com autenticidade e construção de autoridade.",
    prompt:
      "Você é diretor de bastidores. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva 6 roteiros mostrando processo real, desafio, solução e convite para acompanhar.",
  },
  {
    id: "trend-viral-21",
    title: "Oferta em 15 Segundos",
    description:
      "Cria formato curto de oferta para vídeos rápidos de conversão.",
    prompt:
      "Atue como copywriter de vídeos curtos. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 12 scripts de oferta em 15 segundos com gancho, benefício e CTA direto.",
  },
  {
    id: "trend-viral-22",
    title: "Headline de Trend",
    description:
      "Gera títulos fortes para vídeos e capas inspirados em trends atuais.",
    prompt:
      "Você é especialista em headlines virais. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 30 headlines curtas para Reels, Shorts e TikTok com alto potencial de clique.",
  },
  {
    id: "trend-viral-23",
    title: "CTA de Engajamento",
    description:
      "Cria chamadas para ação que aumentam comentários e compartilhamentos.",
    prompt:
      "Atue como estrategista de CTA. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 25 CTAs virais para final de vídeo focando em comentário, salvar, compartilhar e DM.",
  },
  {
    id: "trend-viral-24",
    title: "UGC que Vende",
    description:
      "Monta roteiro no estilo UGC com linguagem natural e foco em prova.",
    prompt:
      "Você é criador UGC. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva 6 roteiros UGC com abertura realista, uso prático, benefício percebido e CTA de compra.",
  },
  {
    id: "trend-viral-25",
    title: "Gancho com Número",
    description:
      "Gera ganchos baseados em números para chamar atenção rapidamente.",
    prompt:
      "Atue como especialista em ganchos. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 20 aberturas usando números e promessas específicas com versão curta e longa.",
  },
  {
    id: "trend-viral-26",
    title: "Transição CapCut",
    description:
      "Cria ideias de roteiro para transições visuais no estilo trend.",
    prompt:
      "Você é editor de vídeos virais. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 8 roteiros com transições estilo CapCut, pontos de corte e texto na tela.",
  },
  {
    id: "trend-viral-27",
    title: "Newsjacking Rápido",
    description:
      "Transforma assunto do momento em conteúdo útil para seu nicho.",
    prompt:
      "Atue como estrategista de newsjacking. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 6 conteúdos conectando tema em alta com aplicação prática para o público.",
  },
  {
    id: "trend-viral-28",
    title: "Áudio Trend Adaptado",
    description:
      "Adapta áudio viral para mensagem comercial sem perder naturalidade.",
    prompt:
      "Você é creator de trends com áudio. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 10 ideias de uso de áudio viral com cena, texto na tela e CTA final.",
  },
  {
    id: "trend-viral-29",
    title: "Green Screen Inteligente",
    description:
      "Monta roteiros usando tela verde para comentar e ensinar com contexto.",
    prompt:
      "Atue como apresentador com green screen. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 7 roteiros com referência visual ao fundo e explicação prática em até 40 segundos.",
  },
  {
    id: "trend-viral-30",
    title: "Quiz Interativo de Reels",
    description:
      "Cria roteiros com pergunta e resposta para aumentar retenção.",
    prompt:
      "Você é estrategista de quizzes. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 12 roteiros de quiz com pergunta inicial, pausa de resposta, explicação e CTA.",
  },
  {
    id: "trend-viral-31",
    title: "Carrossel Frase de Impacto",
    description:
      "Cria carrossel com frases fortes e conteúdo aplicável para salvar.",
    prompt:
      "Atue como copywriter de carrossel. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva 10 carrosséis com capa impactante, 5 slides de valor e CTA.",
  },
  {
    id: "trend-viral-32",
    title: "Carrossel de Erros",
    description:
      "Gera conteúdos em slides sobre erros comuns e correções práticas.",
    prompt:
      "Você é educador digital. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 8 carrosséis no formato erros que travam resultados + correção em linguagem simples.",
  },
  {
    id: "trend-viral-33",
    title: "Shorts YouTube Viral",
    description:
      "Monta roteiro rápido pensado para retenção em Shorts.",
    prompt:
      "Atue como roteirista de YouTube Shorts. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 10 roteiros com abertura em 2 segundos, entrega em 20 segundos e CTA final.",
  },
  {
    id: "trend-viral-34",
    title: "Thumbnail de Impacto",
    description:
      "Cria ideias de thumbs com texto curto para elevar taxa de clique.",
    prompt:
      "Você é designer de thumbnail. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 20 ideias de thumbnail com frase curta, emoção dominante e composição visual recomendada.",
  },
  {
    id: "trend-viral-35",
    title: "Convite para Live",
    description:
      "Gera roteiro de chamada para live com urgência e benefício claro.",
    prompt:
      "Atue como host de live. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 8 scripts de convite para live com tema, promessa, prova e CTA para ativar lembrete.",
  },
  {
    id: "trend-viral-36",
    title: "Stories de Aquecimento",
    description:
      "Monta sequência de stories para preparar audiência para oferta.",
    prompt:
      "Você é estrategista de stories. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie sequência de 9 stories de aquecimento com enquete, prova, conteúdo e CTA de abertura.",
  },
  {
    id: "trend-viral-37",
    title: "Enquete Polarizada",
    description:
      "Cria perguntas de enquete que estimulam resposta e compartilhamento.",
    prompt:
      "Atue como especialista em interação. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 25 enquetes polarizadas com linguagem simples, sem ataque, e CTA para DM.",
  },
  {
    id: "trend-viral-38",
    title: "Challenge Remix",
    description:
      "Adapta desafios virais para um formato útil ao seu nicho.",
    prompt:
      "Você é creator de desafios. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 7 ideias de challenge remix com regra simples, critério de participação e CTA.",
  },
  {
    id: "trend-viral-39",
    title: "Mini Caso de Sucesso",
    description:
      "Transforma resultados em narrativas curtas com prova e credibilidade.",
    prompt:
      "Atue como redator de cases. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 10 mini casos de sucesso para vídeo curto no formato problema, ação, resultado e CTA.",
  },
  {
    id: "trend-viral-40",
    title: "Prova Social em Série",
    description:
      "Cria sequência de conteúdos com depoimentos e evidências de resultado.",
    prompt:
      "Você é especialista em prova social. Contexto: [produto], [nicho], [tema], [cidade], [público]. Escreva 12 roteiros curtos com depoimento, dado e chamada para ação.",
  },
  {
    id: "trend-viral-41",
    title: "Funil DM Instagram",
    description:
      "Gera sequência de mensagens diretas para nutrir e fechar sem pressão.",
    prompt:
      "Atue como closer de Instagram. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie funil de 6 mensagens em DM com abertura, qualificação, proposta, objeção e fechamento.",
  },
  {
    id: "trend-viral-42",
    title: "Trend Local da Cidade",
    description:
      "Conecta conteúdo viral com geolocalização para negócios locais.",
    prompt:
      "Você é especialista em marketing local. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 8 ideias de conteúdo viral local usando referências de [cidade] e CTA para atendimento.",
  },
  {
    id: "trend-viral-43",
    title: "Tutorial IA do Momento",
    description:
      "Monta roteiro simples ensinando ferramenta de IA em linguagem acessível.",
    prompt:
      "Atue como tutor de IA. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 7 roteiros de tutorial da ferramenta de IA do momento com passo a passo simples e CTA.",
  },
  {
    id: "trend-viral-44",
    title: "Prompt que Viraliza Conteúdo",
    description:
      "Gera prompts para criar ideias virais com consistência semanal.",
    prompt:
      "Você é estrategista de conteúdo com IA. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie um meta prompt para gerar 30 ideias virais por mês com foco em alcance e conversão.",
  },
  {
    id: "trend-viral-45",
    title: "Drop de Oferta Viral",
    description:
      "Cria roteiro de lançamento rápido no estilo drop com urgência clara.",
    prompt:
      "Atue como estrategista de lançamento relâmpago. Contexto: [produto], [nicho], [tema], [cidade], [público]. Monte roteiro de drop em 24h com aquecimento, anúncio e fechamento.",
  },
  {
    id: "trend-viral-46",
    title: "FAQ em Reels",
    description:
      "Transforma dúvidas frequentes em conteúdo curto de alto valor.",
    prompt:
      "Você é especialista em suporte e conteúdo. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 20 perguntas frequentes em formato de Reels com resposta direta e CTA.",
  },
  {
    id: "trend-viral-47",
    title: "Bio que Atrai Cliques",
    description:
      "Gera versões de bio e proposta de perfil para captar leads.",
    prompt:
      "Atue como copywriter de perfil. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 10 versões de bio para Instagram/TikTok com promessa, autoridade e CTA para link.",
  },
  {
    id: "trend-viral-48",
    title: "Collab com Influencer",
    description:
      "Monta roteiro de collab para alcançar novos públicos com contexto.",
    prompt:
      "Você é estrategista de parcerias. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie 6 ideias de collab com microinfluenciadores, roteiro de gravação e CTA conjunto.",
  },
  {
    id: "trend-viral-49",
    title: "Higgsfield Loop Viral",
    description:
      "Cria prompts para loops curtos com visual impactante para redes sociais.",
    prompt:
      "Atue como diretor de motion com IA. Contexto: [produto], [nicho], [tema], [cidade], [público]. Gere 5 prompts Higgsfield para vídeos em loop de 6 a 8 segundos com estética viral.",
  },
  {
    id: "trend-viral-50",
    title: "Demo Vibe Coding Viral",
    description:
      "Transforma uma ideia de trend em mini app web para demonstrar ao público.",
    prompt:
      "Você é desenvolvedor de Vibe Coding. Contexto: [produto], [nicho], [tema], [cidade], [público]. Crie roteiro + código de mini aplicação web para demonstrar a tendência do momento e gerar leads.",
  },
];
