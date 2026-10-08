/* ==========================================================================
   Praso Prototype Kit — núcleo
   - Praso.fmt     formatação (R$)
   - Praso.icon()  ícones SVG
   - Praso.cart    estado do carrinho (em memória + eventos)
   - Praso.ui.*    componentes (retornam strings HTML)
   - Praso.app()   shell do app: status bar, roteador por hash, tab bar
   Sem build, sem dependências: funciona abrindo o arquivo no navegador.
   ========================================================================== */
(function () {
  const P = (window.Praso = window.Praso || {});
  const script = document.currentScript;
  P.base = script ? script.src.replace(/praso\.js(\?.*)?$/, '') : '../../ds/';
  P.asset = (path) => P.base + 'assets/' + path;
  P.productImg = (p) => P.asset('products/' + p.img);

  /* ---------------------------------------------------------------- utils */
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  P.esc = esc;
  P.fmt = {
    brl: (v) => 'R$' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  };
  P.product = (id) => (P.catalog || []).find((p) => p.id === id);
  P.products = (ids) => ids.map(P.product).filter(Boolean);
  P.sellUnit = (p) => p.sellUnit || (p.box ? 'cx' : 'un');
  /* valor de 1 unidade de venda (o que vai pro carrinho) */
  P.lineUnitPrice = (p) => (p.box ? p.box.price : p.unitPrice || p.price);
  P.lineUnitStrike = (p) => (p.strike && (p.box || p.unitPrice) ? p.strike : p.strike ? p.strike : null);

  /* ---------------------------------------------------------------- icons */
  const sv = (body, o = {}) =>
    `<svg class="ps-ico ${o.cls || ''}" width="${o.size || 24}" height="${o.size || 24}" viewBox="0 0 24 24" fill="${o.fill || 'none'}" stroke="${o.stroke || 'currentColor'}" stroke-width="${o.sw || 1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const ICONS = {
    search: (o) => sv('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>', o),
    'search-bold': (o) => sv('<circle cx="10.5" cy="10.5" r="7"/><circle cx="10.5" cy="10.5" r="4.4" fill="currentColor" stroke="none"/><path d="m20 20-4.4-4.4"/>', { sw: 2.2, ...o }),
    home: (o) => sv('<path d="M4 10.2 12 4l8 6.2V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"/>', o),
    'home-fill': (o) => sv('<path d="M11.4 3.2a1 1 0 0 1 1.2 0l8 6.2a1 1 0 0 1 .4.8V19.5A1.5 1.5 0 0 1 19.5 21H15v-6.2H9V21H4.5A1.5 1.5 0 0 1 3 19.5v-9.3a1 1 0 0 1 .4-.8z" fill="currentColor" stroke="none"/>', o),
    bell: (o) => sv('<path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>', o),
    'bell-fill': (o) => sv('<path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15z" fill="currentColor"/><path d="M10 20.5a2 2 0 0 0 4 0"/>', o),
    user: (o) => sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3.2"/><path d="M6.2 18.4a7 7 0 0 1 11.6 0"/>', o),
    'user-fill': (o) => sv('<circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="9.6" r="3.4" fill="currentColor" stroke="none"/><path d="M5.7 18.6a7.6 7.6 0 0 1 12.6 0A9.2 9.2 0 0 1 5.7 18.6z" fill="currentColor" stroke="none"/>', { sw: 2, ...o }),
    cart: (o) => sv('<path d="M2.5 3.5h2.2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6"/><circle cx="9.5" cy="19.6" r="1.3" fill="currentColor"/><circle cx="17" cy="19.6" r="1.3" fill="currentColor"/>', o),
    'cart-fill': (o) => sv('<path d="M2.5 3.5h2.2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6z" fill="currentColor"/><circle cx="9.5" cy="19.6" r="1.3" fill="currentColor"/><circle cx="17" cy="19.6" r="1.3" fill="currentColor"/>', o),
    trash: (o) => sv('<path d="M4 6.5h16"/><path d="M9 6.5V4.5h6v2"/><rect x="6" y="6.5" width="12" height="14" rx="1.5"/><path d="M10 10.5v6M14 10.5v6"/>', o),
    plus: (o) => sv('<path d="M12 4.5v15M4.5 12h15"/>', o),
    minus: (o) => sv('<path d="M4.5 12h15"/>', o),
    heart: (o) => sv('<path d="M12 20s-7.5-4.6-9-9.4C1.9 7 4.2 4 7.4 4c2 0 3.6 1.1 4.6 2.7C13 5.1 14.6 4 16.6 4 19.8 4 22.1 7 21 10.6 19.5 15.4 12 20 12 20z"/>', o),
    'heart-fill': (o) => sv('<path d="M12 20s-7.5-4.6-9-9.4C1.9 7 4.2 4 7.4 4c2 0 3.6 1.1 4.6 2.7C13 5.1 14.6 4 16.6 4 19.8 4 22.1 7 21 10.6 19.5 15.4 12 20 12 20z" fill="currentColor"/>', o),
    'chevron-right': (o) => sv('<path d="m9 5 7 7-7 7"/>', o),
    'chevron-left': (o) => sv('<path d="m15 5-7 7 7 7"/>', o),
    'arrow-right': (o) => sv('<path d="M4 12h15M13 6l6 6-6 6"/>', o),
    chat: (o) => sv('<path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" stroke-width="2.6"/>', o),
    truck: (o) => sv('<path d="M2.5 6h11v10h-11zM13.5 9h4l3 3.5V16h-7"/><circle cx="6.5" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/>', o),
    money: (o) => sv('<rect x="2.5" y="6" width="19" height="12" rx="1.2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>', o),
    bank: (o) => sv('<path d="M3 9.5 12 4l9 5.5zM5 10.5v7M9.7 10.5v7M14.3 10.5v7M19 10.5v7M3 20h18"/>', o),
    wallet: (o) => sv('<path d="M4 6.5h14a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1z"/><path d="M4 6.5 15 4v2.5"/>', o),
    doc: (o) => sv('<path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A1.5 1.5 0 0 1 6 19V4.5a1 1 0 0 1 1-1z"/><path d="M9.5 11h5M9.5 14.5h5"/>', o),
    camera: (o) => sv('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7 10 4.5h4L15.5 7"/><circle cx="12" cy="13.5" r="3.5"/>', o),
    store: (o) => sv('<path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>', o),
    'list-search': (o) => sv('<path d="M4 6h12M4 11h7M4 16h6"/><circle cx="16" cy="15" r="3.2"/><path d="m18.4 17.4 2.4 2.4"/>', o),
    grid: (o) => sv('<rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1"/>', o),
    star: (o) => sv('<path d="m12 3.5 2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.4 9.8l6-.8z" fill="currentColor" stroke="none"/>', o),
    pin: (o) => sv('<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>', o),
    'id-card': (o) => sv('<rect x="3" y="5" width="18" height="14" rx="1.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16a3.4 3.4 0 0 1 6.4 0M14.5 10h4M14.5 13.5h3"/>', o),
    close: (o) => sv('<path d="M6 6l12 12M18 6 6 18"/>', o),
  };
  P.icon = (name, o = {}) => (ICONS[name] ? ICONS[name](o) : '');
  P.icons = ICONS;

  /* ---------------------------------------------------------------- cart */
  const listeners = new Set();
  P.cart = {
    items: {},
    favs: new Set(['redbull-summer', 'qualimax-uva', 'picanha-teys']),
    qty(id) { return this.items[id] || 0; },
    set(id, q) {
      if (q <= 0) delete this.items[id]; else this.items[id] = q;
      listeners.forEach((fn) => fn(id));
    },
    add(id) { this.set(id, this.qty(id) + 1); },
    dec(id) { this.set(id, this.qty(id) - 1); },
    clear() { this.items = {}; listeners.forEach((fn) => fn(null)); },
    count() { return Object.keys(this.items).length; },
    lines() {
      return Object.entries(this.items).map(([id, q]) => {
        const p = P.product(id);
        return { p, q, total: P.lineUnitPrice(p) * q, strike: p.strike ? p.strike * q : null };
      });
    },
    total() { return this.lines().reduce((s, l) => s + l.total, 0); },
    toggleFav(id) { this.favs.has(id) ? this.favs.delete(id) : this.favs.add(id); listeners.forEach((fn) => fn(id)); },
    on(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };

  /* ================================================================ UI */
  const ui = (P.ui = {});

  /* Barra de status do iOS (só aparece no frame / desktop) */
  ui.statusBar = ({ time = '09:17', battery = 74, dark = false } = {}) => `
    <div class="ps-statusbar ${dark ? 'is-dark' : ''}">
      <span class="ps-statusbar__time">${time}</span>
      <span class="ps-statusbar__island"></span>
      <span class="ps-statusbar__right">
        <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".7" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx=".7" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx=".7" fill="currentColor" opacity=".35"/><rect x="15" y="0" width="3" height="12" rx=".7" fill="currentColor" opacity=".35"/></svg>
        <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.3c2.4 0 4.6.9 6.3 2.5l1.2-1.2A10.5 10.5 0 0 0 8.5.6 10.5 10.5 0 0 0 1 3.6l1.2 1.2a9 9 0 0 1 6.3-2.5Zm0 3.4c1.5 0 2.9.6 4 1.6l1.2-1.2a7.3 7.3 0 0 0-10.4 0l1.2 1.2c1.1-1 2.5-1.6 4-1.6Zm0 3.4c.6 0 1.2.2 1.6.6L8.5 11.3 6.9 9.7c.4-.4 1-.6 1.6-.6Z" fill="currentColor"/></svg>
        <span class="ps-battery"><span>${battery}</span></span>
      </span>
    </div>`;

  /* Barra de busca (pill cinza) */
  ui.search = ({ placeholder = 'Pesquisar na Praso', value = '', href = '#/busca' } = {}) => `
    <a class="ps-search" href="${href}">
      ${P.icon('search', { size: 17, sw: 2.6 })}
      <span class="${value ? 'ps-search__value' : 'ps-search__ph'}">${esc(value || placeholder)}</span>
    </a>`;

  /* Cabeçalho de tela com título centralizado e ação opcional */
  ui.navHeader = ({ title, back = false, action = '' }) => `
    <header class="ps-navheader">
      <span class="ps-navheader__side">${back ? `<button class="ps-iconbtn" data-action="back">${P.icon('chevron-left', { size: 22 })}</button>` : ''}</span>
      <h1 class="ps-navheader__title">${esc(title)}</h1>
      <span class="ps-navheader__side ps-navheader__side--end">${action}</span>
    </header>`;

  /* Carrossel de banners com indicadores em barra */
  ui.heroCarousel = ({ banners = P.banners.hero, active = 1, count = 10 } = {}) => {
    const b = banners[0];
    const dots = Array.from({ length: count }, (_, i) =>
      `<span class="ps-hero__dot ${i < active ? 'is-done' : ''} ${i === active ? 'is-active' : ''}"></span>`).join('');
    return `<div class="ps-hero" style="background:${b.bg}">
      <img src="${P.asset('banners/' + b.img)}" alt="${esc(b.alt || '')}">
      <div class="ps-hero__dots">${dots}</div>
    </div>`;
  };

  /* Banner de imagem (largura total, cantos arredondados) */
  ui.banner = ({ img, alt = '', flushBottom = false }) =>
    `<div class="ps-banner ${flushBottom ? 'ps-banner--flush' : ''}"><img src="${P.asset('banners/' + img)}" alt="${esc(alt)}"></div>`;

  /* Cabeçalho de seção: "Ofertas da semana ........ Ver todas" */
  ui.sectionHeader = ({ title, link = 'Ver todos', href = '#', subtitle = '', icon = '' }) => `
    <div class="ps-sechead">
      <h2 class="ps-sechead__title">${esc(title)}</h2>
      ${link ? `<a class="ps-sechead__link" href="${href}">${icon ? P.icon(icon, { size: 16, sw: 2 }) : ''}${esc(link)}</a>` : ''}
    </div>
    ${subtitle ? `<p class="ps-sechead__sub">${esc(subtitle)}</p>` : ''}`;

  /* Tag de embalagem: "CAIXA 20un", "1L", "Aprox. 1.3kg" */
  ui.tag = (text) => `<span class="ps-tag">${esc(text)}</span>`;
  /* Badge de desconto: "6% OFF" */
  ui.offBadge = (off) => `<span class="ps-off">${off}% OFF</span>`;

  /* Área de ação do card: botão "+" circular OU stepper azul */
  ui.cardAction = (p, { size = 'md' } = {}) => {
    const q = P.cart.qty(p.id);
    if (!q) return `<button class="ps-add ps-add--${size}" data-action="add" data-id="${p.id}" aria-label="Adicionar">${P.icon('plus', { size: size === 'lg' ? 26 : 22, sw: 1.8 })}</button>`;
    return ui.stepper(p, { variant: 'solid' });
  };

  /* Stepper: solid (azul, dentro do card) | outline (branco, no carrinho) */
  ui.stepper = (p, { variant = 'solid' } = {}) => {
    const q = P.cart.qty(p.id);
    const u = P.sellUnit(p);
    const label = variant === 'solid' ? `${q}${u}` : `${q} ${u}`;
    const left = q > 1 ? 'minus' : 'trash';
    return `<div class="ps-stepper ps-stepper--${variant}">
      <button data-action="dec" data-id="${p.id}" aria-label="Diminuir">${P.icon(left, { size: variant === 'solid' ? 22 : 16, sw: 1.7 })}</button>
      <span class="ps-stepper__qty">${label}</span>
      <button data-action="add" data-id="${p.id}" aria-label="Aumentar">${P.icon('plus', { size: variant === 'solid' ? 24 : 15, sw: variant === 'solid' ? 1.7 : 2 })}</button>
    </div>`;
  };

  /* Bloco de preço do card */
  ui.priceBlock = (p) => {
    const sub = p.box
      ? `<div class="ps-price__sub">${P.fmt.brl(p.box.price)}/cx · ${p.box.qty}un</div>`
      : p.unitPrice ? `<div class="ps-price__sub">${P.fmt.brl(p.unitPrice)}/un</div>` : '';
    return `<div class="ps-price">
      <div class="ps-price__main ${p.off ? 'is-off' : ''}">${P.fmt.brl(p.price)}/${p.per}</div>
      ${p.off ? `<div class="ps-price__offrow">${ui.offBadge(p.off)}${p.strike ? `<s>${P.fmt.brl(p.strike)}</s>` : ''}</div>` : ''}
      ${sub}
    </div>`;
  };

  /* Card de produto
     size: 'sm' (124px, dentro de card de seção) | 'md' (146px, rail na página) | 'grid' (coluna de 2) */
  ui.productCard = (p, { size = 'md' } = {}) => {
    if (typeof p === 'string') p = P.product(p);
    if (!p) return '';
    const fav = P.cart.favs.has(p.id);
    return `<article class="ps-card ps-card--${size}" data-pid="${p.id}">
      <div class="ps-card__media">
        <img src="${P.productImg(p)}" alt="" loading="lazy">
        ${p.flag ? `<span class="ps-card__flag">🇦🇺</span>` : ''}
        <button class="ps-card__fav ${fav ? 'is-on' : ''}" data-action="fav" data-id="${p.id}" aria-label="Favoritar">${P.icon(fav ? 'heart-fill' : 'heart', { size: 26, sw: 1.5 })}</button>
        <div class="ps-card__action" data-slot="action" data-size="${size === 'sm' ? 'md' : 'lg'}">${ui.cardAction(p, { size: size === 'sm' ? 'md' : 'lg' })}</div>
      </div>
      <div class="ps-card__body">
        ${ui.tag(p.tag)}
        ${ui.priceBlock(p)}
        <h3 class="ps-card__name">${esc(p.name)}</h3>
        ${p.expiry ? `<span class="ps-expiry">Val. ${p.expiry}</span>` : ''}
        ${p.sponsored ? `<span class="ps-card__sponsored">Patrocinado</span>` : ''}
      </div>
    </article>`;
  };

  /* Rail horizontal de produtos */
  ui.productRail = (ids, { size = 'md' } = {}) =>
    `<div class="ps-rail ps-rail--${size}">${P.products(ids).map((p) => ui.productCard(p, { size })).join('')}</div>`;

  /* Grid 2 colunas */
  ui.productGrid = (ids) => `<div class="ps-grid">${P.products(ids).map((p) => ui.productCard(p, { size: 'grid' })).join('')}</div>`;

  /* Seção padrão: título + rail (opcionalmente dentro de card com borda) */
  ui.productSection = ({ title, ids, link = 'Ver todos', boxed = false, layout = 'rail' }) => {
    const body = layout === 'grid' ? ui.productGrid(ids) : ui.productRail(ids, { size: boxed ? 'sm' : 'md' });
    if (boxed) return `<section class="ps-section ps-section--boxed"><div class="ps-boxcard">${ui.sectionHeader({ title, link })}${body}</div></section>`;
    return `<section class="ps-section">${ui.sectionHeader({ title, link })}${body}</section>`;
  };

  /* Prateleira de marca (banner + logo + rail) — ex.: Harald, Pernod Ricard */
  ui.brandShelf = ({ banner, logo, name, tagline, ids }) => `
    <section class="ps-section ps-section--boxed">
      <div class="ps-boxcard ps-boxcard--brand">
        <img class="ps-brand__banner" src="${P.asset('banners/' + banner)}" alt="">
        <div class="ps-brand__head">
          ${logo ? `<img class="ps-brand__logo" src="${P.asset('brand/' + logo)}" alt="">` : ''}
          <div class="ps-brand__txt"><strong>${esc(name)}</strong><span>${esc(tagline)}</span></div>
          <a class="ps-sechead__link" href="#">Ver todos</a>
        </div>
        ${ui.productRail(ids, { size: 'sm' })}
      </div>
    </section>`;

  /* Departamentos (círculos) */
  ui.departments = (list = P.departments) => `
    <section class="ps-section">
      ${ui.sectionHeader({ title: 'Compre por departamento', link: '' })}
      <div class="ps-depts">${list.map((d) => `
        <a class="ps-dept" href="#">
          <span class="ps-dept__img"><img src="${P.asset('departments/' + d.img)}" alt=""></span>
          <span class="ps-dept__name">${esc(d.name)}</span>
        </a>`).join('')}</div>
    </section>`;

  /* Combo promocional */
  ui.comboCard = (c) => `
    <div class="ps-combo">
      <div class="ps-combo__head"><strong>${esc(c.name)}</strong><span class="ps-combo__disc">${P.fmt.brl(c.discount)} de desconto</span></div>
      <div class="ps-combo__items">
        ${c.items.map((it, i) => `${i ? '<span class="ps-combo__plus">+</span>' : ''}
          <div class="ps-combo__item">
            <div class="ps-combo__img"><img src="${P.asset('products/' + it.img)}" alt=""><span class="ps-combo__qty">${esc(it.qty)}</span></div>
            <div class="ps-combo__price"><b>${P.fmt.brl(it.price)}/un</b> <s>${P.fmt.brl(it.strike)}</s></div>
            <div class="ps-combo__name">${esc(it.name)}</div>
          </div>`).join('')}
      </div>
      <button class="ps-btn ps-btn--primary ps-btn--block">Adicionar ao carrinho <span class="ps-btn__meta">${P.fmt.brl(c.items.reduce((s, i) => s + i.price, 0))} (${c.items.length} produtos)</span></button>
    </div>`;

  ui.comboSection = (combos = P.combos) => `
    <section class="ps-section">
      ${ui.sectionHeader({ title: 'Combos promocionais', subtitle: 'Adicione combos ao carrinho e aproveite descontos especiais!' })}
      <div class="ps-combo-wrap">${combos.map(ui.comboCard).join('')}</div>
      <div class="ps-pager">${combos.map((_, i) => `<span class="${i ? '' : 'is-active'}"></span>`).join('')}</div>
    </section>`;

  /* Card "Tem uma lista de compras?" (Explorar) */
  ui.shoppingListCard = () => `
    <div class="ps-listcard">
      <div class="ps-listcard__txt"><strong>Tem uma lista de compras?</strong><span>Busque todos os seus produtos de uma vez!</span></div>
      <button class="ps-listcard__btn">${P.icon('list-search', { size: 22, sw: 1.6 })}<span>Buscar por lista</span></button>
    </div>`;

  /* Card de categoria (Explorar) */
  ui.categoryCard = ({ name, img, badge = '' }) => `
    <a class="ps-catcard" href="#">
      <span class="ps-catcard__name">${esc(name)}</span>
      <span class="ps-catcard__chev">${P.icon('chevron-right', { size: 14, sw: 2.2 })}</span>
      <img src="${P.asset('departments/' + img)}" alt="">
      ${badge ? `<span class="ps-catcard__badge">${P.icon('star', { size: 13 })}${esc(badge)}</span>` : ''}
    </a>`;

  /* Item de lista com ícone + chevron (Conta) */
  ui.menuItem = ({ icon, label, href = '#' }) => `
    <a class="ps-menuitem" href="${href}">${P.icon(icon, { size: 26, sw: 1.6 })}<span>${esc(label)}</span>${P.icon('chevron-right', { size: 20, sw: 1.8, cls: 'ps-menuitem__chev' })}</a>`;

  /* Linha de item do carrinho */
  ui.cartLine = ({ p, q, total, strike }) => `
    <div class="ps-cartline" data-pid="${p.id}">
      <img class="ps-cartline__img" src="${P.productImg(p)}" alt="">
      <div class="ps-cartline__info">
        <div class="ps-cartline__name">${esc(p.name)}</div>
        <div class="ps-cartline__unit">${P.fmt.brl(P.lineUnitPrice(p))}/${P.sellUnit(p)}</div>
      </div>
      <div class="ps-cartline__prices">
        <b class="${strike ? 'is-off' : ''}">${P.fmt.brl(total)}</b>
        ${strike ? `<s>${P.fmt.brl(strike)}</s>` : ''}
      </div>
      <div class="ps-cartline__stepper">${ui.stepper(p, { variant: 'outline' })}</div>
    </div>`;

  /* Rodapé fixo do carrinho */
  ui.checkoutBar = ({ total, count, label = 'Continuar para pagamento' }) => `
    <div class="ps-checkout">
      <div class="ps-checkout__label">Total</div>
      <div class="ps-checkout__total"><b>${P.fmt.brl(total)}</b> <span>/ ${count} ${count === 1 ? 'item' : 'itens'}</span></div>
      <button class="ps-btn ps-btn--primary ps-btn--block ps-btn--lg">${esc(label)}</button>
    </div>`;

  /* Skeleton de rail (estado de carregamento) */
  ui.skeletonRail = (n = 3) => `<div class="ps-rail ps-rail--sm">${Array.from({ length: n }, () => `
    <div class="ps-skel-card"><div class="ps-skel ps-skel--img"></div><div class="ps-skel ps-skel--line"></div><div class="ps-skel ps-skel--line ps-skel--short"></div></div>`).join('')}</div>`;

  /* Botões */
  ui.button = ({ label, variant = 'primary', block = false, size = '' }) =>
    `<button class="ps-btn ps-btn--${variant} ${block ? 'ps-btn--block' : ''} ${size ? 'ps-btn--' + size : ''}">${esc(label)}</button>`;

  /* Tab bar */
  P.tabs = [
    { id: 'inicio', label: 'Início', icon: 'home', iconOn: 'home-fill' },
    { id: 'explorar', label: 'Explorar', icon: 'search', iconOn: 'search-bold' },
    { id: 'notificacoes', label: 'Notificações', icon: 'bell', iconOn: 'bell-fill' },
    { id: 'conta', label: 'Conta', icon: 'user', iconOn: 'user-fill' },
    { id: 'carrinho', label: 'Carrinho', icon: 'cart', iconOn: 'cart-fill' },
  ];
  ui.tabBar = (active) => `
    <nav class="ps-tabbar">${P.tabs.map((t) => {
      const on = t.id === active;
      const badge = t.id === 'carrinho' && P.cart.count() ? `<span class="ps-tabbar__badge">${P.cart.count()}</span>` : '';
      return `<a class="ps-tabbar__item ${on ? 'is-active' : ''}" href="#/${t.id}">
        <span class="ps-tabbar__icon">${P.icon(on ? t.iconOn : t.icon, { size: 26, sw: 1.6 })}${badge}</span>
        <span class="ps-tabbar__label">${t.label}</span></a>`;
    }).join('')}</nav>`;

  /* ================================================================ APP SHELL
     Praso.app({
       screens: { nome: (ctx) => ({ header, body, footer, tab, tabbar }) },
       initial: 'inicio',
       statusBar: { time: '09:17' },
       cart: { id: qty }            // carrinho inicial
     })
  ================================================================ */
  P.app = function (cfg) {
    const screens = { ...(P.screens || {}), ...(cfg.screens || {}) };
    if (cfg.cart !== undefined) P.cart.items = { ...cfg.cart };
    else if (P.initialCart) P.cart.items = { ...P.initialCart };

    const inFrame = window.self !== window.top;
    const isTouch = matchMedia('(pointer: coarse)').matches && !inFrame;
    document.documentElement.classList.toggle('ps-is-device', isTouch);
    document.documentElement.classList.toggle('ps-in-frame', inFrame);

    const root = document.getElementById('app') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'app' }));
    root.className = 'ps-app';
    root.innerHTML = `${ui.statusBar(cfg.statusBar)}<div class="ps-viewport"><div class="ps-header" data-r="header"></div><main class="ps-scroll" data-r="scroll"></main><div class="ps-footer" data-r="footer"></div></div><div data-r="tabbar"></div><div class="ps-home-indicator"></div>`;
    const $ = (r) => root.querySelector(`[data-r="${r}"]`);
    let current = null;

    function render() {
      const name = (location.hash.replace(/^#\/?/, '').split('?')[0]) || cfg.initial || 'inicio';
      const fn = screens[name] || screens[cfg.initial || 'inicio'];
      const s = fn({ P, name }) || {};
      const keepScroll = current === name;
      const y = $('scroll').scrollTop;
      current = name;
      root.dataset.screen = name;
      root.classList.toggle('ps-app--splash', !!s.fullscreen);
      $('header').innerHTML = s.header || '';
      $('scroll').innerHTML = s.body || '';
      $('footer').innerHTML = s.footer || '';
      $('tabbar').innerHTML = s.tabbar === false || s.fullscreen ? '' : ui.tabBar(s.tab || name);
      $('scroll').scrollTop = keepScroll ? y : 0;
      root.querySelector('.ps-statusbar').classList.toggle('is-light', !!s.lightStatus);
      if (s.onMount) s.onMount(root);
    }

    /* atualizações cirúrgicas quando o carrinho muda (preserva scroll dos rails) */
    P.cart.on((id) => {
      if (current === 'carrinho' || id === null) return render();
      root.querySelectorAll(`[data-pid="${id}"]`).forEach((card) => {
        const slot = card.querySelector('[data-slot="action"]');
        if (slot) slot.innerHTML = ui.cardAction(P.product(id), { size: slot.dataset.size });
        const fav = card.querySelector('.ps-card__fav');
        if (fav) { const on = P.cart.favs.has(id); fav.classList.toggle('is-on', on); fav.innerHTML = P.icon(on ? 'heart-fill' : 'heart', { size: 26, sw: 1.5 }); }
      });
      $('tabbar').innerHTML = $('tabbar').innerHTML ? ui.tabBar(current) : '';
    });

    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-action]');
      if (!b) return;
      e.preventDefault();
      const { action, id } = b.dataset;
      if (action === 'add') P.cart.add(id);
      else if (action === 'dec') P.cart.dec(id);
      else if (action === 'fav') P.cart.toggleFav(id);
      else if (action === 'clear-cart') P.cart.clear();
      else if (action === 'back') history.back();
      else if (cfg.actions && cfg.actions[action]) cfg.actions[action](b, e);
    });

    /* paginação dos combos acompanha o scroll */
    root.addEventListener('scroll', (e) => {
      const w = e.target; if (!w.classList || !w.classList.contains('ps-combo-wrap')) return;
      const i = Math.round(w.scrollLeft / (w.firstElementChild.offsetWidth + 9));
      w.parentElement.querySelectorAll('.ps-pager span').forEach((d, j) => d.classList.toggle('is-active', i === j));
    }, true);

    window.addEventListener('hashchange', render);
    render();
    return { render };
  };
})();
