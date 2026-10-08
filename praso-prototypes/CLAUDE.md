# Instruções para agentes (Claude) neste repositório

Este repo guarda protótipos HTML do app mobile da Praso (marketplace B2B de abastecimento para pequenos
comércios). Objetivo: testar ideias rapidamente com telas que parecem o app real.

## Ao criar um protótipo novo
1. `cp -r prototypes/_template prototypes/<slug-em-kebab-case>`
2. Reutilize ao máximo `Praso.ui.*` e `Praso.screens.*`. Sobrescreva só as telas que mudam.
3. Use produtos do catálogo (`ds/data/catalog.js`) pelos ids — não invente imagens. Se precisar de produto novo,
   adicione ao catálogo com imagem em `ds/assets/products/`.
4. CSS exclusivo do protótipo fica no `<style>` do próprio index.html com prefixo `.x-`.
5. Adicione a entrada em `prototypes/registry.js` (topo da lista).
6. Valide em 393×852: `python3 tools/shoot.py http://localhost:8000/prototypes/<slug>/index.html /tmp/shots`.

## Regras de fidelidade visual (medidas dos prints)
- 1px CSS = 1pt iOS. Tela 393×852. Margem lateral 16px.
- Tipografia compacta: título de seção 14.5/600, preço 15.5/700, nome do produto 10.5/400, tag 10.5/500,
  link "Ver todos" 13 azul, placeholder da busca 12.5. Use as variáveis `--fs-*`.
- Azul primário `#2053ce`; preço com desconto `#166534`; badge OFF `#16a34a`; textos `#030712`/`#6b7280`/`#9ca3af`.
- Botão "+" circular azul (46px em cards sm, 54px em md/grid) no canto inferior direito da imagem.
- Ao adicionar, o "+" vira stepper azul de largura total (lixeira | "1cx" | +).
- Preço: `R$11,89/un` (sem espaço após R$, vírgula decimal).
- Não altere `ds/` para resolver um caso de um protótipo só. Mudanças no DS valem para todos.

## Não fazer
- Não usar frameworks, bundlers ou CDNs de JS — tudo precisa abrir com duplo clique.
- Não apagar nem editar protótipos de outras pessoas.
