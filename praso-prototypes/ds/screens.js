/* ==========================================================================
   Telas padrão do app Praso (estado atual em produção, out/2026).
   Cada tela é uma função (ctx) => { header, body, footer, tab, tabbar, fullscreen }.
   Protótipos podem reutilizar (Praso.screens.inicio) ou sobrescrever
   passando screens: { inicio: () => ({...}) } para Praso.app().
   ========================================================================== */
(function () {
  const P = window.Praso;
  const ui = P.ui;
  const S = (P.screens = P.screens || {});

  /* ---------------------------------------------------------- Splash */
  S.splash = () => ({
    fullscreen: true,
    lightStatus: true,
    body: `<div class="ps-splash"><img src="${P.asset('brand/praso-logo-white.png')}" alt="praso"></div>`,
    onMount: () => { setTimeout(() => { if (location.hash.includes('splash')) location.hash = '#/inicio'; }, 1400); },
  });

  /* ---------------------------------------------------------- Início */
  S.inicio = () => ({
    tab: 'inicio',
    header: `<div class="ps-header__search">${ui.search()}</div>`,
    body: `
      <div class="ps-page-pad">${ui.heroCarousel()}</div>
      ${ui.productSection({ title: 'Ofertas da semana', link: 'Ver todas', boxed: true, ids: ['cafe-uniao', 'leite-natville', 'kitkat', 'farinha-finna'] })}
      ${ui.productSection({ title: 'Seus produtos', link: 'Ver todos', layout: 'grid', ids: ['redbull-summer', 'qualimax-uva', 'salsicha-seara', 'linguica-defumada-seara', 'picanha-teys'] })}
      ${ui.departments()}
      ${ui.brandShelf({ banner: 'pernod.png', logo: 'pernod-logo.png', name: 'Pernod Ricard', tagline: 'Bons Momentos a partir de um Bom Lugar', ids: ['gin-beefeater', 'whisky-chivas', 'gin-orloff'] })}
      ${ui.productSection({ title: 'Embutidos', ids: ['linguica-calabresa-seara', 'salsicha-seara', 'linguica-defumada-seara'] })}
      <section class="ps-section"><div class="ps-tiles">
        ${['tile-queijos.png', 'tile-carnes.png', 'tile-queijos.png'].map((t) => `<a class="ps-tile" href="#"><img src="${P.asset('banners/' + t)}" alt=""><span class="ps-tile__cta">Ver ofertas ${P.icon('arrow-right', { size: 12, sw: 2.4 })}</span></a>`).join('')}
      </div></section>
      ${ui.comboSection()}
      ${ui.brandShelf({ ...P.banners.harald, banner: P.banners.harald.img, ids: ['cobertura-harald', 'recheio-harald', 'melken-granule'] })}
      ${ui.productSection({ title: 'Azeites e Óleo Composto', ids: ['azeite-dende-cepera', 'oleo-st-isabel', 'oleo-soya'] })}
      ${ui.productSection({ title: 'Confeitaria', ids: ['chanty-amelia', 'nutella', 'margarina-medalha'] })}
      ${ui.productSection({ title: 'Orientais', ids: ['shoyu-cepera', 'farinha-panko', 'mostarda-cepera'] })}
      <div class="ps-bottom-space"></div>`,
  });

  /* ---------------------------------------------------------- Explorar */
  S.explorar = () => ({
    tab: 'explorar',
    header: `<div class="ps-header__search">${ui.search()}</div>`,
    body: `
      <div class="ps-page-pad ps-explorar-list">${ui.shoppingListCard()}</div>
      <section class="ps-section">
        ${ui.sectionHeader({ title: 'Combinam com seu negócio', link: '' })}
        ${ui.productRail(['papel-bigroll', 'cafe-pilao', 'leite-natville', 'mostarda-cepera'])}
      </section>
      <section class="ps-section">
        ${ui.sectionHeader({ title: 'Categorias para você', link: 'Ver todas as categorias', icon: 'grid' })}
        <div class="ps-catgrid ps-page-pad">
          ${ui.categoryCard({ name: 'Bebidas Não-Alcoólicas', img: 'bebidas-cat.png', badge: 'Você compra muito' })}
          ${ui.categoryCard({ name: 'Mercearia', img: 'mercearia-cat.png' })}
          ${ui.categoryCard({ name: 'Confeitaria', img: 'confeitaria.png' })}
          ${ui.categoryCard({ name: 'Açougue', img: 'acougue.png' })}
        </div>
      </section>
      <div class="ps-bottom-space"></div>`,
  });

  /* ---------------------------------------------------------- Notificações */
  S.notificacoes = () => ({
    tab: 'notificacoes',
    header: ui.navHeader({ title: 'Notificações' }),
    body: `
      <div class="ps-notifs">${P.notifications.map((n) => `
        <div class="ps-notif">
          <div class="ps-notif__top"><strong>${P.esc(n.title)}</strong><span>${P.esc(n.when)}</span></div>
          <p>${P.esc(n.body)}</p>
        </div>`).join('')}</div>
      <div class="ps-notifs__spacer"></div>
      <div class="ps-divider-thick"></div>
      <div class="ps-empty-note"><strong>Você visualizou todas as notificações!</strong><span>Confira abaixo algumas ofertas 👇</span></div>
      <div class="ps-page-pad">${ui.productGrid(['cafe-uniao', 'leite-natville', 'kitkat', 'nutella'])}</div>
      <div class="ps-bottom-space"></div>`,
  });

  /* ---------------------------------------------------------- Conta */
  S.conta = () => ({
    tab: 'conta',
    body: `
      <div class="ps-profile">
        <span class="ps-profile__avatar">${P.icon('store', { size: 22, sw: 1.8 })}</span>
        <strong>${P.esc(P.user.name)}</strong>
        <span>${P.esc(P.user.doc)}</span>
      </div>
      <div class="ps-page-pad">
        <a class="ps-help" href="#">${P.icon('chat', { size: 26, sw: 1.6 })}<span><strong>Precisa de ajuda?</strong>Converse com nosso suporte!</span></a>
        <div class="ps-menu">
          ${ui.menuItem({ icon: 'truck', label: 'Pedidos' })}
          ${ui.menuItem({ icon: 'money', label: 'Pagamentos' })}
          ${ui.menuItem({ icon: 'bank', label: 'Crédito' })}
          ${ui.menuItem({ icon: 'wallet', label: 'Carteira Praso' })}
          ${ui.menuItem({ icon: 'doc', label: 'Notas Fiscais' })}
          ${ui.menuItem({ icon: 'camera', label: 'Foto do estoque' })}
        </div>
        <div class="ps-overline">Benefícios</div>
        ${ui.banner({ img: 'indica-praso.png', alt: 'Indica Praso — ganhe até R$150' })}
        <div class="ps-overline">Configurações</div>
        <div class="ps-menu">
          ${ui.menuItem({ icon: 'pin', label: 'Endereços' })}
          ${ui.menuItem({ icon: 'id-card', label: 'Informações de Cadastro' })}
        </div>
      </div>
      <div class="ps-bottom-space"></div>`,
  });

  /* ---------------------------------------------------------- Carrinho */
  S.carrinho = () => {
    const lines = P.cart.lines();
    const trash = `<button class="ps-iconbtn ps-iconbtn--soft" data-action="clear-cart" aria-label="Esvaziar carrinho">${P.icon('trash', { size: 22, sw: 1.6 })}</button>`;
    if (!lines.length) {
      return {
        tab: 'carrinho',
        header: ui.navHeader({ title: 'Carrinho' }),
        body: `<div class="ps-empty"><span class="ps-empty__ico">${P.icon('cart', { size: 40, sw: 1.4 })}</span><strong>Seu carrinho está vazio</strong><span>Adicione produtos para continuar</span><a class="ps-btn ps-btn--primary" href="#/inicio">Ver ofertas</a></div>`,
      };
    }
    return {
      tab: 'carrinho',
      header: ui.navHeader({ title: 'Carrinho', action: trash }),
      body: `
        <div class="ps-cartlist">${lines.map(ui.cartLine).join('')}</div>
        <section class="ps-section ps-section--boxed">
          <div class="ps-boxcard">
            <h2 class="ps-boxcard__title-blue">Quem comprou os seus produtos também levou</h2>
            ${ui.productRail(['mostarda-cepera', 'agua-sanitaria-olimpo', 'oleo-soya', 'margarina-medalha', 'farinha-finna', 'linguica-defumada-seara'], { size: 'sm' })}
          </div>
        </section>
        <div class="ps-bottom-space--sm"></div>`,
      footer: ui.checkoutBar({ total: P.cart.total(), count: lines.length }),
    };
  };

  /* ---------------------------------------------------------- Busca (placeholder simples) */
  S.busca = () => ({
    tab: 'explorar',
    header: `<div class="ps-header__search ps-header__search--back"><a class="ps-iconbtn" href="#/inicio">${P.icon('chevron-left', { size: 24 })}</a>${ui.search({ value: 'café' })}</div>`,
    body: `<div class="ps-page-pad ps-mt-2">${ui.productGrid(P.catalog.filter((p) => /caf/i.test(p.name)).map((p) => p.id).concat(['leite-natville', 'nutella']))}</div><div class="ps-bottom-space"></div>`,
  });
})();
