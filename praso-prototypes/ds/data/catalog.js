/* ==========================================================================
   Catálogo mock — produtos reais vistos nos prints do app.
   Para adicionar produto: coloque a imagem em ds/assets/products/ e
   adicione um objeto aqui. Campos:
     id        identificador único (kebab-case)
     name      nome completo como aparece no app
     img       arquivo em ds/assets/products/
     tag       rótulo da embalagem (chip cinza): "CAIXA 20un", "1L", "Aprox. 2.5kg"
     price     preço por unidade de venda exibido em destaque
     per       "un" | "kg"   → "R$11,89/un"
     off       % de desconto (opcional) → badge verde "6% OFF" + preço verde
     strike    preço riscado (opcional; quando há caixa, é o preço antigo da caixa)
     box       { price, qty, unit:"cx" } — produto vendido por caixa
     unitPrice preço da peça quando o produto é vendido por kg ("R$155,99/un")
     sellUnit  unidade do stepper: "cx" | "un"   (default: box ? "cx" : "un")
     sponsored true → "Patrocinado"
     expiry    "13/10" → tag vermelha "Val. 13/10"
     flag      "au" → bandeira de origem sobre a imagem
     dept      departamento (para filtros/explorar)
   ========================================================================== */
window.Praso = window.Praso || {};
Praso.catalog = [
  { id: 'cafe-uniao', name: 'Café Tradicional Vácuo União 250g', img: 'cafe-uniao.png', tag: 'CAIXA 20un', price: 11.89, per: 'un', off: 6, strike: 253.80, box: { price: 237.80, qty: 20 }, dept: 'mercearia' },
  { id: 'leite-natville', name: 'Leite UHT Integral Natville 1L', img: 'leite-natville.png', tag: 'CAIXA 12un', price: 6.85, per: 'un', off: 2, strike: 83.88, box: { price: 82.20, qty: 12 }, dept: 'laticinios' },
  { id: 'kitkat', name: 'Chocolate KitKat Ao Leite 41,5g (Caixa c/ 24)', img: 'kitkat.png', tag: 'CAIXA 24un', price: 3.08, per: 'un', off: 16, strike: 87.96, box: { price: 73.89, qty: 24 }, dept: 'doces' },
  { id: 'redbull-summer', name: 'Energético Red Bull Morango e Pêssego 250ml', img: 'redbull-summer.png', tag: '250ml', price: 8.59, per: 'un', off: 7, strike: 9.25, dept: 'bebidas' },
  { id: 'qualimax-uva', name: 'Pó Para Bebida Qualimax Uva 1kg (Rende 10L)', img: 'qualimax-uva.png', tag: '1Kg', price: 11.29, per: 'un', off: 6, strike: 11.99, dept: 'bebidas' },
  { id: 'picanha-teys', name: 'Picanha Australiana Teys Congelada (Peça c/ Aprox. 1,3kg)', img: 'picanha-teys.png', tag: 'Aprox. 1.3kg', price: 119.99, per: 'kg', unitPrice: 155.99, sellUnit: 'un', dept: 'acougue' },
  { id: 'cobertura-harald', name: 'Cobertura Confeiteiro Meio Amargo Harald 1,01kg', img: 'cobertura-harald.png', tag: '1.01kg', price: 26.99, per: 'un', off: 10, strike: 29.99, sponsored: true, dept: 'confeitaria' },
  { id: 'recheio-harald', name: 'Recheio Forneável Confeiteiro Sabor Chocolate Ao Leite Harald 1,01kg', img: 'recheio-harald.png', tag: '1.01Kg', price: 34.99, per: 'un', sponsored: true, dept: 'confeitaria' },
  { id: 'melken-granule', name: 'Confeito de Chocolate ao Leite Granulé Melken 400g', img: 'melken-granule.png', tag: '400g', price: 35.90, per: 'un', off: 8, strike: 38.99, sponsored: true, dept: 'confeitaria' },
  { id: 'azeite-dende-cepera', name: 'Azeite de Dendê Cepêra 900ml', img: 'azeite-dende-cepera.png', tag: '900ml', price: 31.89, per: 'un', off: 7, strike: 34.29, dept: 'mercearia' },
  { id: 'oleo-st-isabel', name: 'Óleo Composto (30%) de Oliva e Soja St. Isabel Galão 5,02L', img: 'oleo-st-isabel.png', tag: '5.02L', price: 68.89, per: 'un', off: 8, strike: 74.89, dept: 'mercearia' },
  { id: 'chanty-amelia', name: 'Chanty Mix Supreme Amélia 1L', img: 'chanty-amelia.png', tag: '1L', price: 21.99, per: 'un', off: 8, strike: 23.99, dept: 'confeitaria' },
  { id: 'nutella', name: 'Creme de Avelã com Cacau Nutella 650g', img: 'nutella.png', tag: '650g', price: 43.90, per: 'un', off: 5, strike: 46.05, dept: 'confeitaria' },
  { id: 'shoyu-cepera', name: 'Molho Shoyu Cepêra 1,01L', img: 'shoyu-cepera.png', tag: '1.01L', price: 13.69, per: 'un', off: 8, strike: 14.89, dept: 'orientais' },
  { id: 'farinha-panko', name: 'Farinha Panko Alfa 1kg', img: 'farinha-panko.png', tag: '1kg', price: 16.89, per: 'un', off: 2, strike: 17.29, dept: 'orientais' },
  { id: 'linguica-calabresa-seara', name: 'Linguiça Calabresa Seara 2,5kg', img: 'linguica-calabresa-seara.png', tag: 'Aprox. 2.5kg', price: 19.49, per: 'kg', off: 15, strike: 57.47, unitPrice: 48.72, sellUnit: 'un', dept: 'frios' },
  { id: 'salsicha-seara', name: 'Salsicha Congelada Seara 5kg', img: 'salsicha-seara.png', tag: 'Aprox. 5kg', price: 11.22, per: 'kg', unitPrice: 56.09, sellUnit: 'un', dept: 'frios' },
  { id: 'mostarda-cepera', name: 'Mostarda Amarela Cepêra 3,3kg', img: 'mostarda-cepera.png', tag: '3.3kg', price: 32.89, per: 'un', off: 6, strike: 34.89, sponsored: true, dept: 'mercearia' },
  { id: 'agua-sanitaria-olimpo', name: 'Água Sanitária Olimpo 1L', img: 'agua-sanitaria-olimpo.png', tag: '1L', price: 2.55, per: 'un', off: 12, strike: 2.89, sponsored: true, dept: 'limpeza' },
  { id: 'oleo-soya', name: 'Óleo de Soja Soya 900ml', img: 'oleo-soya.png', tag: 'CAIXA 20un', price: 9.29, per: 'un', box: { price: 185.80, qty: 20 }, dept: 'mercearia' },
  { id: 'margarina-medalha', name: 'Margarina 80% Medalha de Ouro BD 15kg', img: 'margarina-medalha.png', tag: '15kg', price: 175.90, per: 'un', dept: 'confeitaria' },
  { id: 'farinha-finna', name: 'Farinha de Trigo Finna TP1 1kg', img: 'farinha-finna.png', tag: 'CAIXA 10un', price: 4.29, per: 'un', off: 9, strike: 46.90, box: { price: 42.90, qty: 10 }, dept: 'mercearia' },
  { id: 'linguica-defumada-seara', name: 'Linguiça Defumada Reta Seara 2,5kg', img: 'linguica-defumada-seara.png', tag: 'Aprox. 2.5kg', price: 19.99, per: 'kg', off: 12, strike: 56.90, unitPrice: 49.97, sellUnit: 'un', dept: 'frios' },
  { id: 'papel-bigroll', name: 'Papel Higiênico Big Roll Diamante Black Brasileiro (8 × 200m)', img: 'papel-bigroll.png', tag: 'CAIXA 8un', price: 4.25, per: 'un', off: 3, strike: 34.99, box: { price: 33.99, qty: 8 }, sponsored: true, dept: 'limpeza' },
  { id: 'cafe-pilao', name: 'Café Tradicional Almofada Pilão 250g', img: 'cafe-pilao.png', tag: 'CAIXA 20un', price: 13.49, per: 'un', off: 6, strike: 285.80, box: { price: 269.80, qty: 20 }, sponsored: true, dept: 'mercearia' },
  { id: 'gin-beefeater', name: 'Gin Beefeater London Dry 750ml', img: 'gin-beefeater.png', tag: '750ml', price: 94.99, per: 'un', off: 11, strike: 106.45, sponsored: true, dept: 'bebidas' },
  { id: 'whisky-chivas', name: 'Whisky Escocês Chivas Regal 12 Anos 1L', img: 'whisky-chivas.png', tag: '1L', price: 115.90, per: 'un', off: 3, strike: 119.99, sponsored: true, dept: 'bebidas' },
  { id: 'gin-orloff', name: 'Gin Dry Orloff 1L', img: 'gin-orloff.png', tag: '1L', price: 44.90, per: 'un', sponsored: true, dept: 'bebidas' },
  { id: 'gordura-elogiata', name: 'Gordura Vegetal de Algodão e Palma Elogiata Fry 14,5Kg', img: 'gordura-elogiata.png', tag: '14.5kg', price: 162.89, per: 'un', strike: 189.99, dept: 'mercearia' },
];

/* Departamentos (círculos de "Compre por departamento") */
Praso.departments = [
  { id: 'confeitaria', name: 'Confeitaria Praso!', img: 'confeitaria.png' },
  { id: 'acougue', name: 'Açougue Praso!', img: 'acougue.png', badge: 'ATÉ 15% OFF' },
  { id: 'mercearia', name: 'Mercearia', img: 'mercearia.png' },
  { id: 'laticinios', name: 'Laticínios', img: 'laticinios-partial.png' },
];

/* Banners do carrossel da Home e banners de marca */
Praso.banners = {
  hero: [
    { id: 'valelac', img: 'valelac.png', bg: '#000595', alt: 'Requeijão Cremoso Valelac Bisnaga 1,5kg — R$41,99/un' },
  ],
  harald: { img: 'harald.png', logo: 'harald-logo.png', name: 'Harald', tagline: 'Fazer melhor é fazer com paixão!' },
  pernod: { img: 'pernod.png', name: 'Pernod Ricard', tagline: 'Bons Momentos a partir de um Bom Lugar' },
  indica: { img: 'indica-praso.png' },
};

/* Combos promocionais */
Praso.combos = [
  { id: 'fry-panko', name: 'Gordura Fry Elogiata + Farinha Panko', discount: 28.50,
    items: [
      { img: 'panko-combo.png', qty: '1 un', price: 15.89, strike: 17.29, name: 'Farinha Panko Alfa 1kg' },
      { img: 'gordura-elogiata.png', qty: '1 un', price: 162.89, strike: 189.99, name: 'Gordura Vegetal de Algodão e Palma Elogiata Fry 14,5Kg' },
    ] },
  /* combos abaixo são ilustrativos (montados com produtos do catálogo) */
  { id: 'nutella-chanty', name: 'Nutella + Chanty Amélia', discount: 4.20,
    items: [
      { img: 'nutella.png', qty: '1 un', price: 43.90, strike: 46.05, name: 'Creme de Avelã com Cacau Nutella 650g' },
      { img: 'chanty-amelia.png', qty: '1 un', price: 21.99, strike: 23.99, name: 'Chanty Mix Supreme Amélia 1L' },
    ] },
  { id: 'shoyu-panko', name: 'Molho Shoyu + Farinha Panko', discount: 1.60,
    items: [
      { img: 'shoyu-cepera.png', qty: '1 un', price: 13.69, strike: 14.89, name: 'Molho Shoyu Cepêra 1,01L' },
      { img: 'farinha-panko.png', qty: '1 un', price: 16.89, strike: 17.29, name: 'Farinha Panko Alfa 1kg' },
    ] },
];

/* Usuário logado */
Praso.user = { name: 'CLECIO MUNIZ', doc: '091.427.154-74' };

/* Notificações */
Praso.notifications = [
  { title: 'Ofertas docinhas pra você!🍫', body: 'A Quarta dos Doces trouxe uma surpresinha! Aproveite as ofertas de coberturas antes que acabem!', when: 'Ontem' },
];

/* Carrinho inicial (id → quantidade) — igual ao vídeo: R$320,00 / 2 itens */
Praso.initialCart = { 'leite-natville': 1, 'cafe-uniao': 1 };
