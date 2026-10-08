/* ==========================================================================
   Registro de protótipos — o playground (index.html) lê esta lista.
   Ao criar um protótipo novo: copie prototypes/_template para
   prototypes/<slug>/ e adicione uma entrada aqui (mais recentes no topo).
   ========================================================================== */
window.PRASO_PROTOTYPES = [
  {
    slug: 'cross-sell-k',
    title: 'Cross-sell no carrinho · K Cartões um a um ⭐',
    description: 'GEN-105. Hipótese: trocar o rail passivo por um cartão por vez (Pular/Adicionar) faz o cliente decidir e aumenta a conversão do bloco (hoje 3,1% por sessão) e os SKUs por pedido.',
    author: 'Clécio Muniz',
    date: '2026-10-08',
    status: 'rascunho',
    url: 'prototypes/cross-sell-carrinho/index.html?braco=k',
    screens: ['carrinho', 'inicio'],
  },
  {
    slug: 'cross-sell-m',
    title: 'Cross-sell no carrinho · M Progresso de categorias ⭐',
    description: 'GEN-105. Hipótese: ancorar a sugestão no objetivo "4 de 6 categorias" aumenta a positivação da categoria-foco e os SKUs por pedido. Ao adicionar, o card troca para a próxima categoria que falta.',
    author: 'Clécio Muniz',
    date: '2026-10-08',
    status: 'rascunho',
    url: 'prototypes/cross-sell-carrinho/index.html?braco=m',
    screens: ['carrinho', 'inicio'],
  },
  {
    slug: 'cross-sell-n',
    title: 'Cross-sell no carrinho · N Notificação pelo sino ⭐',
    description: 'GEN-105. Hipótese: um card "Para você" que expande a partir do sino enquanto o cliente navega na Início alcança quem não vê o bloco do carrinho (efeito incremental).',
    author: 'Clécio Muniz',
    date: '2026-10-08',
    status: 'rascunho',
    url: 'prototypes/cross-sell-carrinho/index.html?braco=n',
    screens: ['inicio', 'notificacoes', 'carrinho'],
  },
  {
    slug: 'app-atual',
    title: 'App atual (baseline)',
    description: 'Réplica do app em produção: Início, Explorar, Notificações, Conta e Carrinho. Ponto de partida para qualquer experimento.',
    author: 'Clécio Muniz',
    date: '2026-10-08',
    status: 'baseline',           // baseline | rascunho | em teste | aprovado | arquivado
    screens: ['splash', 'inicio', 'explorar', 'notificacoes', 'conta', 'carrinho', 'busca'],
  },
  {
    slug: '_template',
    title: 'Template',
    description: 'Esqueleto para começar um protótipo novo. Copie esta pasta.',
    author: '—',
    date: '2026-10-08',
    status: 'template',
    screens: ['inicio', 'explorar', 'carrinho'],
  },
];
