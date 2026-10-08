# Praso Prototypes

Playground de protótipos HTML que simulam o app da Praso (mobile first, iPhone 393×852).
Inspirado no *prototype playground* do Brian Lovin — só que mais simples: sem build, sem framework,
só HTML + CSS + JS puro, abrindo direto no navegador.

```
praso-prototypes/
├── index.html                 ← Playground: lista de protótipos + frame de iPhone
├── ds/                        ← Design System (compartilhado por todos os protótipos)
│   ├── index.html             ← documentação viva: cores, tipografia, ícones, componentes, catálogo
│   ├── tokens.css             ← cores, tipografia, espaçamentos, raios
│   ├── components.css         ← estilos de todos os componentes (.ps-*)
│   ├── praso.js               ← ícones, estado do carrinho, componentes (Praso.ui.*), shell do app
│   ├── screens.js             ← telas padrão: splash, início, explorar, notificações, conta, carrinho, busca
│   ├── data/catalog.js        ← produtos, departamentos, banners, combos, usuário (mock)
│   └── assets/                ← fotos de produto, banners, logos
├── prototypes/
│   ├── registry.js            ← lista de protótipos que aparece no playground
│   ├── app-atual/             ← baseline: réplica do app em produção
│   ├── _template/             ← copie para começar um protótipo novo
│   └── <seu-prototipo>/       ← cada protótipo isolado na sua pasta
└── tools/
    ├── shoot.py               ← screenshots 393×852@3x + comparativo lado a lado com os prints
    └── refs/                  ← prints de referência do app
```

## Rodando

```bash
cd praso-prototypes
python3 -m http.server 8000
# abra http://localhost:8000
```

Também funciona abrindo `index.html` direto (file://), mas o servidor local evita bloqueios de iframe.
No celular, abra a URL de um protótipo (`/prototypes/app-atual/`) — a status bar falsa some e o app ocupa a tela.

## Criando um protótipo

1. Copie `prototypes/_template` para `prototypes/<slug>` (ex.: `prototypes/carrinho-com-frete`).
2. Edite o `index.html`: sobrescreva só as telas que mudam — o resto do app continua navegável.
3. Registre em `prototypes/registry.js` (título, descrição, autor, data, status, telas).
4. Se precisar de um componente novo e reutilizável, adicione em `ds/praso.js` + `ds/components.css`
   e documente em `ds/index.html`. Se for exclusivo do experimento, deixe no próprio protótipo com prefixo `.x-`.

```js
Praso.app({
  initial: 'carrinho',
  cart: { 'cafe-uniao': 2 },
  screens: {
    carrinho: () => ({
      tab: 'carrinho',
      header: Praso.ui.navHeader({ title: 'Carrinho' }),
      body: `...`,
      footer: Praso.ui.checkoutBar({ total: Praso.cart.total(), count: Praso.cart.count() }),
    }),
  },
});
```

**Regra de ouro:** um protótipo nunca altera arquivos de outro protótipo. Mudanças no `ds/` afetam todos —
faça com cuidado e confira o `app-atual` depois.

## Componentes principais (`Praso.ui`)

| Componente | Uso |
|---|---|
| `search()` | barra de busca pill |
| `heroCarousel()` | banner principal com indicadores |
| `productCard(id, {size})` | card de produto — `sm` / `md` / `grid` |
| `productSection({title, ids, boxed, layout})` | seção com título + rail/grid |
| `departments()` | círculos de departamento |
| `brandShelf({...})` | prateleira patrocinada de marca |
| `comboSection()` | combos promocionais |
| `stepper(p, {variant})` | controle de quantidade (`solid` / `outline`) |
| `cartLine()` / `checkoutBar()` | itens e rodapé do carrinho |
| `navHeader({title})` | cabeçalho com título centralizado |
| `menuItem()` / `shoppingListCard()` / `categoryCard()` | itens de lista e cards utilitários |
| `tabBar(active)` | tab bar (automática no `Praso.app`) |

Veja todos funcionando em `ds/index.html`.

## Checando fidelidade

```bash
pip install playwright pillow
python3 tools/shoot.py http://localhost:8000/prototypes/app-atual/index.html /tmp/shots tools/refs
```
Gera `cmp-*.png` com o print real à esquerda e o protótipo à direita.
