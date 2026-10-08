/* ==========================================================================
   Registro de protótipos — o playground (index.html) lê esta lista.
   Ao criar um protótipo novo: copie prototypes/_template para
   prototypes/<slug>/ e adicione uma entrada aqui (mais recentes no topo).
   ========================================================================== */
window.PRASO_PROTOTYPES = [
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
